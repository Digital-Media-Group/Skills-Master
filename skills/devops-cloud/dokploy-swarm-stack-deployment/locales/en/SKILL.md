# Dokploy Swarm Stack Deployment

## Purpose

Prepare and operate an application in Dokploy using **Compose Type `Stack`** and `docker stack deploy`, including a single-node cluster. The result must scale web replicas to new nodes without changing deployment mode or rebuilding the architecture.

Reference flow:

```text
Development -> Preview -> Production
  -> CI publishes immutable SHA image
  -> Dokploy refreshes the branch and runs docker stack deploy --with-registry-auth
  -> bootstrap/migrations run in the target environment
  -> domain points to the full Swarm service
  -> authenticated smoke test and approval
```

## When to Use

- The project must deploy as a Swarm Stack from day one.
- Additional manager/worker nodes and horizontal web scaling are planned.
- The project has Dockerfiles, health checks, and a registry reachable by every node.
- Migrations and bootstrap can run idempotently.

## When Not to Use

- The project is strictly single-node with no scaling plan: use Dokploy Compose Type `docker-compose`.
- The organization cannot publish images to a registry.
- The application relies on `depends_on` conditions, profiles, or one-shot startup jobs.
- The database or uploads depend on local volumes without a cross-node persistence strategy.

## Required Information

- Git repository, `development`, `preview`, and `production` branches, and exact Compose path in all three.
- Domain, full internal service name, and container port for each environment.
- Environment variables and secrets stored in Dokploy, never Git.
- Private registry, username, read-only token, and exact image names.
- Persistence policy for PostgreSQL, uploads, backups, and object storage.
- Manager/worker nodes and placement constraints.
- Dokploy panel/API access and, for advanced diagnosis, SSH to a manager.

## Credential Safety

- Never request or paste passwords, PATs, private keys, or tokens in chat.
- A private key pasted into a conversation must be revoked and replaced.
- For SSH, use a new local key file with mode `600`, referenced by `ATLAS_SSH_KEY_PATH`; never store its contents in `.env` or Git.
- Use the least-privileged SSH account. Docker diagnosis may use passwordless `sudo -n docker` without revealing the password.
- Dokploy may hide secret values in its UI/API. Missing visibility does not mean missing configuration: verify presence, length, and behavior, or rotate through a protected channel.

## Procedure

### 1. Design the Stack for Swarm

- `docker stack deploy` does not build images from `build:`. Compose must use registry `image:` values.
- Do not rely on `depends_on` to order migrations.
- Do not make a one-shot `migrate` service a prerequisite for Web.
- Do not use profiles for essential operations.
- Declare variables in Dokploy; do not rely on implicit `env_file` behavior.
- Use `deploy.restart_policy`, `update_config`, and `rollback_config`.
- Use overlay networks and connect Web to Dokploy/Traefik's external network.
- Use `APP_REPLICAS=1` on a one-node cluster; scale only after another eligible node is validated.

### 2. Migrations and Bootstrap

Bootstrap or the entrypoint must migrate before serving traffic:

```sh
set -eu
# Retry PostgreSQL with a bounded backoff.
# Acquire an advisory lock before migrating.
bun run db:migrate
bun run provision-runtime
# Seed Development/Preview only; Production is migrations-only.
exec bun run start
```

Requirements:

- Migrations, role provisioning, and seeds are idempotent.
- Use an advisory lock or ORM equivalent.
- Release the lock on failure.
- Retry PostgreSQL startup with a limit.
- Production must never receive fixture data.
- A one-shot bootstrap service may correctly show `0/1` after exit code 0; inspect its last task and logs.

### 3. Publish Images with Lightweight CI

GitHub Actions should validate and publish the SHA image, not run migrations or E2E against remote databases. Verify that every command exists:

```yaml
permissions:
  contents: read
  packages: write

jobs:
  validate:
    steps:
      - run: bun install --frozen-lockfile --linker=hoisted
      - run: bun run typecheck
      - run: bun run --filter '*' test
      - run: bun run lint

  images:
    needs: validate
    if: github.event_name == 'push'
    steps:
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          file: Dockerfile.web
          tags: ghcr.io/organization/project-web:${{ github.sha }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          file: Dockerfile.worker
          tags: ghcr.io/organization/project-worker:${{ github.sha }}
```

To reduce GitHub compute, run on Dokploy/Swarm:

- validation build or CI image through `docker-stack.ci-cd.yml`, with `ci-runner` at `replicas: 0` by default;
- integration, E2E, authenticated smoke, and domain tests;
- Development/Preview migrations, role provisioning, and seeds;
- Production migrations-only;
- runtime logs and sanitized evidence.

GitHub Actions must not run migrations against any remote environment. The Dokploy runner should use a least-privileged service token, private networking, and sanitized evidence artifacts. Temporarily enable its replicas only with an approved CI image, then return them to `0`.

For private GHCR:

- Use a classic PAT with at least `read:packages` in Dokploy for pulls.
- Use `GITHUB_TOKEN` with `packages: write` in Actions for publishing.
- Link package permissions to the organization/repository when required.
- Test the registry in Dokploy before the first deployment.
- Anonymous `401` is normal for private GHCR packages; `denied` during deployment means a missing tag or unapplied credentials.

### 4. Promote Development -> Preview -> Production

All three branches must contain the Compose and compatible Stack workflow. Use this fail-closed flow:

1. **Development:** publish SHA, update Development variables only, deploy with `autoDeploy=false`, allow seed, and run protected internal/external smoke tests.
2. **Preview:** promote exactly the SHA that passed Development; deploy with `freshVolumes=false`, Basic Auth, and maintenance; run migrations plus fixtures and authenticated smoke tests.
3. **Production:** promote exactly the SHA that passed Preview; deploy migrations-only, no seed, with maintenance enabled and `autoDeploy=false`; run backup/preflight and authenticated smoke tests; require human approval before removing maintenance.
4. Never promote `latest`, the wrong branch, or a SHA without evidence.
5. Never copy databases, volumes, or fixtures between environments.

### 5. Configure Dokploy

- Select Compose Type `Stack`.
- Set repository, owner, branch, and exact `composePath` per environment.
- Keep `autoDeploy=false` for Preview/Production; use manual fail-closed promotion.
- Register the private registry before the first deployment.
- Verify deployment runs `docker stack deploy ... --with-registry-auth`.
- Store per-environment variables in Dokploy and generate distinct secrets.
- Use `freshVolumes=false` for normal redeploys and recovery.
- Never delete stacks, volumes, or data to fix an image pull.
- After creating a domain, verify `serviceName` is the full `<stack>_web`, not only `web`; use internal port 4000 for this pattern.

### 6. Image and Source-Cache Diagnosis

When `No such image`, `pull access denied`, or Web startup failures occur:

1. Inspect `docker service ps --no-trunc <stack>_<service>` on the manager.
2. Inspect the effective image with `docker service inspect`.
3. Confirm the tag exists and CI completed before deployment.
4. Test the registry from Dokploy (`registry.testRegistryById`).
5. Compare Dokploy's checkout SHA with the GitHub branch.
6. Refresh the source before deployment (`compose.fetchSourceType`/service loading with `type=fetch`).
7. If Dokploy keeps an old definition, set `autoDeploy=false`, update variables, refresh the source, and run one manual deployment.
8. If GHCR remains blocked and this is Development, temporarily build on the manager from the verified checkout, tag with the SHA, and deploy without deleting volumes. Document the exception and publish to GHCR before Preview/Production.

A Dokploy `done` status does not prove tasks are ready; inspect replicas and service errors.

### 7. Domain Access and Traefik

- DNS must point to the intended VPS.
- Create the Dokploy domain with `composeId`, `serviceName=<stack>_web`, `port=4000`, Let’s Encrypt, and `/`.
- Redeploy after creating it when Dokploy requires it.
- The full Swarm service name `<stack>_web` is required, not `web`.
- Confirm Web is attached to Traefik's external network.
- If the domain exists in the API but Traefik returns `404` and no dynamic rule exists, add a controlled file-provider rule targeting the full service and internal port.
- For Let’s Encrypt, temporarily use Cloudflare DNS-only if proxying causes `526`; restore proxying after TLS is verified.
- Never use `verify=false` or leave Cloudflare in insecure mode as a permanent fix.

### 8. Persistence and Placement

Pin PostgreSQL and Redis local volumes to durable data nodes:

```yaml
deploy:
  placement:
    constraints:
      - node.labels.gescodi.data == true
```

Do not store important uploads on a replica's local filesystem. Use external object storage. Do not move PostgreSQL without replicated storage and tested backups.

### 9. Scale After the First Node

1. Register the new node in Dokploy.
2. Join it to Swarm.
3. Verify `docker node ls`.
4. Confirm private registry authentication and pulls.
5. Scale stateless services only.
6. Check tasks, health, domain routing, and logs.

## Validation

### Repository

- Compose parses and has no duplicate YAML keys.
- Runtime does not depend on `build:`.
- Web/Worker use SHA images.
- All three branches contain compatible Compose and workflow files.
- CI uses existing scripts and publishes before deployment.
- Production has no seed variables.

### Runtime

- `docker stack services <stack>` shows expected replicas.
- `docker service ps --no-trunc` has no `No such image` errors.
- PostgreSQL/Redis are healthy.
- Bootstrap completes migrations and roles with exit code 0.
- Web logs show `Ready`.
- Worker logs show `ready`.
- A second deployment is idempotent.
- SHA rollback is available.

### Domain

- DNS resolves to the intended destination.
- HTTP redirects to HTTPS.
- TLS is valid.
- Unauthenticated requests return `401/403` as designed.
- Authenticated requests reach maintenance, home, or the health endpoint.
- Each domain is bound to `<stack>_web`, not the short `web` alias.
- Development, Preview, and Production are not confused.

## Troubleshooting

### `No such image` / `pull access denied`

Verify the tag, workflow, GHCR package, PAT `read:packages`, `--with-registry-auth`, and each service's effective image. Do not delete volumes.

### CI completes but does not publish

Inspect `validate` first: missing root scripts, required environment variables, failing tests, or lint prevent the image job.

### Dokploy deploys an old SHA

Disable `autoDeploy`, refresh the GitHub source, inspect converted Compose, and perform one manual deployment. Inspect `docker service inspect` afterward.

### `Compose file not found`

Verify the file exists on the configured branch, `composePath` matches exactly, and the branch is not stale. Sync only Stack/workflow files; never copy `.env`, secrets, or data.

### Domain returns 404 while the service is healthy

Check the Traefik network, full `<stack>_web` name, internal port, and dynamic rule. Some Dokploy versions register the domain without generating a route for Swarm Compose; use a documented file-provider rule.

### Domain returns 526

The origin certificate is invalid or the ACME challenge is incomplete. Temporarily use DNS-only, validate origin HTTP/TLS, then restore the proxy.

### Credentials are not visible in Dokploy

This is expected for protected secrets. Verify presence/length and authentication behavior without printing the value. Rotate through the protected panel/API if needed.

## Expected Result

A reproducible Dokploy Stack that works on one node and scales to multiple nodes, with immutable images, authenticated registry, Development -> Preview -> Production promotion, safe migrations executed in Dokploy, persistence, verified Traefik routes, external smoke tests, and rollback documentation.

## Security

Risk level: **high**.

- Never store secrets in Git, Compose, dumps, images, logs, or chat.
- Keep GHCR private and use read-only runtime tokens.
- Revoke exposed credentials.
- Verify backups before PostgreSQL migrations or imports.
- Do not delete volumes, stacks, or nodes without approval and rollback.
- Protect Production with mandatory PR review, maintenance, and human approval.
