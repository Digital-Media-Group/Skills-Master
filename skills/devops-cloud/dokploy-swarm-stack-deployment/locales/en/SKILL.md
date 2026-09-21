# Dokploy Swarm Stack Deployment

## Purpose

Deploy an application to Dokploy with **Stack Compose Type** (`docker stack deploy`, Swarm), ready to scale to multiple nodes, with the image published to an external registry (GHCR) and no build tricks on the server.

## When to Use

- The project is already containerized (Dockerfile with a runtime target) and deploys to Dokploy.
- You plan to add nodes to the cluster (horizontal scaling) or use `docker service scale`.
- You want a reproducible pipeline: CI builds the image, Swarm pulls it.

## When Not to Use

- Single-node deployment with no scaling plans: Dokploy's "Docker Compose" Compose Type is simpler (it builds with its default command).
- The image cannot be pushed to an external registry due to security policy.
- The application relies on one-shot services or `depends_on` conditions: refactor those first (see Procedure, step 2).

## Required Information

- Git repository, protected deployment branch (e.g. `production`), and CI/CD workflow.
- Public domain and application environment variables (never secrets in the repo).
- Dokploy panel access and, if something fails, SSH access to the server for cleanup.
- The Dokploy Compose service name (visible in the project URL).

## Procedure

1. **Choose "Stack" Compose Type when creating the service** (Dokploy → Create Service → Compose). It cannot be changed later: the service must be recreated.

2. **Adapt `docker-compose.yml` to Swarm constraints**:
   - No one-shot services and no `depends_on` conditions (Swarm ignores them).
   - Migrations and data bootstrap: move them to an image **entrypoint** that runs before the main process. It must be idempotent and use a database advisory lock to serialize simultaneous starts.
   - Short `env_file` syntax (`- .env`): the Stack validator rejects the long syntax (`path:`/`required:`).
   - `web` uses `expose` (internal port), not `ports`: Traefik publishes the domain.
   - A `deploy:` section with `restart_policy` for each service.

3. **Publish the image to a registry (mandatory for multi-node)**:
   - Swarm **does not build images** with `docker stack deploy`: it only pulls `image:`.
   - A local image on the manager **does not work** for worker nodes: each node must pull.
   - Add a `build-push` job to the release workflow that builds the runtime target and publishes it with two tags: a moving one (`production`) used by the compose, and an immutable per-SHA one for rollback. On GHCR, `GITHUB_TOKEN` with `packages: write` is enough.
   - Declare `image: ghcr.io/<org>/<repo>:production` in the compose. The package is born **private by default** (private repository): keep it that way and register the registry in Dokploy with a **GitHub Personal Access Token** scoped to `read:packages` so the manager and every node can `pull`. Never make the package public.

4. **Configure the Dokploy service**:
   - Git provider, deployment branch, Compose Path.
   - **Leave the custom command EMPTY**: the Default Command (`docker stack deploy ... --with-registry-auth`) is enough once the image lives in the registry. Dokploy prepends `docker` automatically and its validator rejects chained commands that do not start with `docker compose`.
   - Environment tab: paste variables in Raw mode (Dokploy generates the `.env` next to the compose).
   - Copy the Deploy Webhook and store it as an environment secret in GitHub.

5. **Add the domain**: Dokploy → Domains → public domain, `web` service, internal port, HTTPS with Let's Encrypt.

6. **Verify the deployment**:
   - Containers: tasks named `<stack>_<service>.1.<id>` (Swarm format).
   - `web` logs: entrypoint (migrations + bootstrap) and then the main process.
   - `GET /api/health` (or equivalent healthcheck) returns `200`.

7. **Prepare multi-node scaling** (documented, not executed yet):
   - Register the node server in Dokploy → Settings → Remote Servers.
   - Join it with `docker swarm join` using the manager token.
   - Scale with `docker service scale <stack>_web=2`; use constraints if `db`/`worker` must stay on the manager.
   - New nodes pull from the registry with no manual steps.

## Validation

- The deploy finishes without `pull access denied` or `No such image`: the registry image exists and the compose references it.
- All three service kinds (database, web, worker) have `running` tasks and the `web` healthcheck passes.
- A second deploy (redeploy) is idempotent: migrations do not duplicate data or fail.
- The domain serves the application over HTTPS and `docker stack ls` lists the stack.
- Simulating simultaneous web and worker starts (or resizing) does not corrupt the database: the entrypoint advisory lock serializes migrations.

## Expected Result

A Dokploy Compose service running in Stack mode, a `merge → build → push to registry → webhook → stack deploy` pipeline, operations documentation (domain, variables, webhooks, SHA-based rollback), and a verified path to add nodes.

## Safety

Risk level: **high**. Do not perform irreversible changes, production access, or credentialed operations without explicit authorization, a recoverable backup, and a rollback plan. Specific rules:

- Never store secrets in the compose or the repository: they live in Dokploy (Environment) or a secret manager.
- The registry image package exposes compiled code and is **private**: do not change its visibility. The `read:packages` PAT is a read-only credential; configure it only in Dokploy (Settings → Registries) and rotate it if it changes hands. Verify in GitHub → Packages that the visibility is "Private" after the workflow's first push.
- `docker stack rm` and volume deletion are destructive: confirm first and verify there is no production data in them.
- Protect the deployment branch (PR required) and use CODEOWNERS to enforce owner approval.
