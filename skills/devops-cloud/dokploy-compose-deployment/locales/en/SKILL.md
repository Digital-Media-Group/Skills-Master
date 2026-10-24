# Dokploy Compose Deployment

## Purpose

Create, promote, and diagnose Dokploy Docker Compose resources with explicit technical names, protected variables, HTTPS domains bound to the correct service, and a master -> production promotion flow with human approval. If Auto Deploy or the webhook is enabled, Dokploy builds the image when the configured branch receives a push; with both disabled, deployment is manual. Verify the real state of those toggles in each project. The deployment build is Dokploy's responsibility, not external CI's.

## When to Use

- The service deploys as Docker Compose in Dokploy (`composeType: docker-compose`), with a compatible Dockerfile and `docker-compose.yml`.
- Work follows `master` (validation) and `production` (live) branches with a promotion PR.
- Environment-identifiable resources and Traefik domains bound to the web service are required.

## When Not to Use

- The destination is a Swarm Stack: use the `dokploy-swarm-stack-deployment` skill.
- The destination is OpenShip/Atlas: use the `openship-project-environments` skill.
- Production approval is missing, or no verifiable backup exists for stateful services.

## Required Information

- Git repository, compatible `docker-compose.yml` and Dockerfile.
- Dokploy API/panel access and the correct project and environment (the active session organization determines which projects are visible).
- Domains, protected variables, persistence decision, and explicit Production approval.
- `master` (validation) and `production` (live) branches, with a promotion PR.

## Procedure

1. Create the Compose resource with `composeType: docker-compose` and an explicit per-environment `appName` (for example `firma-documentos` and `firma-documentos-master`). Use `randomize: false` when supported; some Dokploy versions still append a suffix, so verify and record the returned `appName`.
2. Keep project and Compose display names neutral; branches and environments already express master versus production.
3. Connect the repository and the environment branch and set the trigger explicitly: Auto Deploy/webhook enabled (build on push) or manual deployment when disabled. Do not infer one project's state from another. Never silently convert the flow to Stack/Swarm or Nixpacks.
4. Save the complete environment before deploying, with safe dotenv quoting and no secrets in Git. Verify `POSTGRES_PASSWORD` is available to Compose interpolation and matches `DATABASE_URL`.
5. Bind HTTPS domains to the correct web service: real internal port and the correct edge network in Traefik.
6. Deploy `master` first, run smoke tests and healthchecks, and promote to `production` through a PR with explicit approval. Promote the same validated candidate.
7. If the technical name is wrong, do not use `compose.update` as a rename: create a new Compose with the desired `appName`, validate it, move the domain, and only then delete the old one with `deleteVolumes: false`, unless volume deletion is explicitly approved.

## Persistence and backups

- Preserve PostgreSQL volumes by default. Never pass `deleteVolumes: true` or `freshVolumes: true` without explicit approval.
- Before mutating `production`, verify backup configuration, destination, and completion evidence; a 200 response or a queued task does not prove the backup is restorable.

## Diagnosis

- Check `composeStatus`, the latest deployment, replicas, and per-`containerId` logs; `done` in Dokploy does not guarantee healthy services.
- On timeout, compare DNS, TLS, binding, and backend before redeploying.
- If the Dokploy API/TLS is unstable, stop destructive actions and wait for a stable read-back.

## Validation

- `db`, `web`, `worker`, DNS, and TLS correct, and public `/api/health` returning HTTP 200 repeatedly before declaring success.
- Variables read back after saving; domains bound to the correct service.
- Same candidate promoted and rollback documented.

## Expected Result

Identifiable Dokploy Docker Compose resources isolated per environment, variables stored with safe quoting and no secrets in Git, HTTPS domains bound to the correct web service, green smoke tests and healthchecks, and a documented rollback.

## Safety

Risk level: **high**. Never print full Dokploy objects: `env` may contain secrets. Never accept tokens or keys pasted into chat. No destructive actions, volume deletion, or Production changes without explicit authorization, a recoverable copy, and a rollback plan.
