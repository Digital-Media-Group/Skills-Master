# Dokploy Swarm Stack Deployment

## Purpose

Prepare and operate an application in Dokploy using **Compose Type `Stack`** and
`docker stack deploy`, even when the cluster has only one node at first. The
result must scale web replicas to new nodes without changing deployment mode or
rebuilding the architecture.

The reference flow is:

```text
merge to production
  -> CI builds and publishes a private registry image
  -> Dokploy runs docker stack deploy
  -> Swarm pulls the image on every node
  -> entrypoint acquires a lock and applies migrations
  -> web passes its healthcheck and receives traffic
```

## When to Use

- The project must deploy as a Swarm Stack from day one.
- Additional manager/worker nodes and horizontal web scaling are planned.
- The project has a Dockerfile, healthcheck, and a registry reachable by every node.
- Migrations and bootstrap work can run idempotently from the image entrypoint.

## When Not to Use

- The project is strictly single-node with no scaling plan: use Dokploy Compose Type `docker-compose`.
- The organization cannot publish images to an external registry.
- The application relies on `depends_on` conditions, profiles, or one-shot jobs for startup.
- The database or uploads depend on a local volume without a persistence strategy that works across nodes.

## Required Information

- Git repository and protected deployment branch, usually `production`.
- Domain and internal service routed by Traefik.
- Environment variables and secrets stored in Dokploy, never in Git.
- Private registry, moving deployment image tag, and immutable SHA tag for rollback.
- Persistence policy for PostgreSQL, uploads, backups, and object storage.
- Manager/worker nodes and placement constraints.
- Dokploy panel access and, for advanced diagnosis, SSH to a manager.

## Procedure

### 1. Design for Swarm from the start

Do not mechanically convert a regular Compose file. Review these incompatibilities:

- `docker stack deploy` **does not build** images from `build:`. The compose must use `image:` from a registry.
- Do not rely on `depends_on` to order migrations: Swarm does not implement Compose conditions.
- Do not make a one-shot `migrate` service a prerequisite for `web`: Swarm does not guarantee that flow.
- Do not use profiles for essential stack operations.
- Do not rely on `env_file` as an implicit source; declare variables in Dokploy and ensure the stack receives them.
- Use `deploy.restart_policy`, `deploy.update_config`, and `deploy.rollback_config`.
- Use an `overlay` network for node-to-node traffic and Dokploy's external network for Traefik.

### 2. Move migrations into the entrypoint

The web service must apply migrations before starting the main process:

```sh
run_migrations_with_lock() {
  # The exact SQL client depends on the runtime image.
  # Acquire a PostgreSQL advisory lock before migrate deploy.
  prisma migrate deploy
  node prisma/seed/ensure-schema.js
}

run_migrations_with_lock
exec node server.js
```

Requirements:

- The operation must be idempotent.
- Use a PostgreSQL advisory lock or the ORM equivalent.
- Release the lock even when migration fails.
- Retry while PostgreSQL is starting.
- Do not accept traffic before migration completes.
- Every replica may run the entrypoint; the lock serializes the ledger.

> Prisma protects its migration ledger, but that does not automatically protect
> custom convergence scripts, seeds, or bootstrap code. Those must be idempotent too.

### 3. Separate roles without required one-shot jobs

The same image can support `ROLE=app`, `ROLE=scheduler`, and other persistent
roles. Point-in-time operations such as importing a dump should be disabled by
default (`replicas: 0`) and run explicitly on a manager.

- `web`: multiple replicas allowed.
- `scheduler`: normally one replica to avoid duplicate work.
- `db`: one replica, pinned to a manager with persistent storage.
- `import`: zero replicas; enable only during an approved migration.

### 4. Publish the image to a registry

Reference example:

```yaml
x-app-image: &app-image
  image: ghcr.io/organization/project:production
```

The workflow should publish two tags:

- `production`: moving tag consumed by Dokploy.
- `${{ github.sha }}`: immutable rollback tag.

Essential workflow steps:

```yaml
permissions:
  contents: read
  packages: write

- uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}

- uses: docker/build-push-action@v6
  with:
    push: true
    tags: |
      ghcr.io/organization/project:production
      ghcr.io/organization/project:${{ github.sha }}
```

For a private package, configure a GitHub token scoped to `read:packages` in
Dokploy. Never make the package public just to avoid registry configuration.

### 5. Configure Dokploy

- Select Compose Type `Stack`.
- Connect the `production` branch.
- Set the correct Compose Path.
- Leave custom command empty unless the Dokploy version explicitly requires a different value. The default command should be equivalent to `docker stack deploy ... --with-registry-auth`.
- Configure variables in the panel, not in the repository.
- Configure the private registry before the first deploy.
- Add the domain to the web service, internal port 3000, and HTTPS.
- Redeploy after adding or changing the domain so Traefik updates its route.

### 6. Persistence and placement

PostgreSQL with a local volume must not float freely between nodes:

```yaml
deploy:
  placement:
    constraints:
      - node.role == manager
volumes:
  app-db-data:
```

For web scaling:

- Do not store important uploads on a replica's local filesystem.
- Use S3/B2 or another external object store for shared files.
- Use `WEB_REPLICAS` or `docker service scale` to change capacity.
- Pin schedulers, stateful workers, and databases according to their state requirements.

### 7. Scale after the first node

Do not execute scaling automatically as part of this skill. First validate the
stack on one node:

1. Register the new server in Dokploy.
2. Join it to Swarm using the correct worker or manager token.
3. Verify `docker node ls` from a manager.
4. Confirm the node can pull the private registry image.
5. Scale only the stateless service:

```bash
docker service scale <stack>_formularios-dev-web=2
```

6. Check tasks, healthchecks, domain routing, and logs.
7. Do not move PostgreSQL without a replicated storage and tested backup strategy.

## Validation

### Repository validation

- Both compose files parse as YAML.
- No duplicate YAML mapping keys, especially two `<<` anchors in one mapping.
- Every persistent service has `deploy.restart_policy`.
- Web has configurable `deploy.replicas` and sensible update/rollback settings.
- Database has a healthcheck and manager placement.
- Internal network is `overlay`; Traefik network is external.
- The compose does not depend on `build:` for a worker to start.
- The workflow publishes the image before deployment.

### Deployment validation

- `docker stack ls` shows the stack.
- `docker service ls` shows the expected replicas.
- Tasks use the `<stack>_<service>.<replica>.<id>` format.
- Web logs show database wait, lock, migrations, and Next.js startup.
- `GET /api/health` returns 200.
- A second deployment is idempotent.
- Rollback to the previous SHA tag is possible without rebuilding on the server.
- A new node can pull the image from the registry.

## Troubleshooting

### `Map keys must be unique` or duplicate YAML anchors

Common cause:

```yaml
environment:
  <<: *db-vars
  <<: *app-env
```

If `app-env` already contains `db-vars`, the second reference is invalid. Use
one anchor per mapping or merge values into a single anchor.

### `service declares mutually exclusive network_mode and networks`

Do not mix `network_mode` with `networks`. In Swarm, use `networks` and an
`overlay` network; connect the web service to Dokploy's external Traefik network.

### `all predefined address pools have been fully subnetted`

Do not force Docker to create per-project bridge networks. In Swarm, use the
cluster-managed overlay network and remove duplicate/orphan networks only after
verifying that no service still uses them.

### `pull access denied` or `No such image`

Verify that:

- The tag exists in the registry.
- Every node can resolve and reach the registry.
- Dokploy has `read:packages` credentials for the private package.
- Deployment uses `--with-registry-auth`.
- The compose tag matches the tag published by CI.

### The `migrate` job restarts or web starts before migrations

That design is incompatible with Swarm. Move `prisma migrate deploy` and
idempotent scripts into the `web` entrypoint, protect them with an advisory lock,
and remove the one-shot prerequisite.

### The domain does not respond after creation

Check that:

- The service is connected to Dokploy's external network.
- The domain points to the exact service name.
- The internal port matches the container port.
- A redeploy was performed after creating the domain.

## Expected Result

A Dokploy Stack that works with one node from day one but already has the same
image, network, persistence, migration, healthcheck, registry, and rollback
requirements needed to add nodes without changing operating mode.

## Safety

Risk level: **high**.

- Never store secrets in Git, Compose, dumps, or images.
- Use Dokploy or a secret manager for sensitive variables.
- Keep the registry package private and use read-only node credentials.
- Create and verify a backup before migrating PostgreSQL or importing data.
- Do not delete volumes, stacks, or nodes without approval and a rollback plan.
- Protect the `production` branch with mandatory PR review and owner approval.
