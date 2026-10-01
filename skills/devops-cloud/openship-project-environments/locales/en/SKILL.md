# OpenShip Project and Environment Deployment

## Purpose

Operate applications on OpenShip on a self-hosted server (for example, Atlas) using one project
with isolated internal `Production` and `Preview` environments. This skill covers Docker services,
persistent PostgreSQL, full migration from another provider, backups, promotion, rollback, and DNS.

OpenShip is not Dokploy. Do not use Dokploy endpoints, resource names, or assumptions to operate
OpenShip. The Dokploy/Swarm skill remains valid for Dokploy but does not replace this integration.

## Required model

Use one project:

```text
EmprenRed
├── Production -> Production branch
└── Preview    -> Preview branch
```

An OpenShip project may have multiple environments. Each environment has its own internal ID,
variables, deployments, domains, and state. Always deploy using the environment/project ID
returned by OpenShip; do not send `environment: preview` with a Production project ID.

Create separate projects only when the OpenShip contract explicitly requires a non-production
project. Document that exception and never duplicate data or domains casually.

## Access and security

- Use the real OpenShip MCP transport and authentication documented by the instance.
- Verify workspace, Atlas server, permissions, and host health before mutations.
- A connected `gh-cli` identity is not the same as a globally connected GitHub App; verify what
  source can read the repository and which operations it can execute.
- Never accept secrets pasted in chat.
- Do not print full objects: env, tokens, dumps, connection strings, and backup responses may
  contain credentials.
- Use stable request IDs and preconditions (`resourceVersion`, `expectedSequence`,
  `expectedUpdatedAt`) whenever OpenShip requires them.

## Branches and promotion

- Deploy `Preview` from the `Preview` branch.
- Deploy `Production` from the `Production` branch.
- Promote the same validated candidate between environments; do not rebuild a different version
  for Production.
- Pipeline order: validation -> build/artifact -> Preview -> smoke tests -> human approval ->
  Production.
- Do not change DNS or retire the previous provider before validating the new Production.
- Keep a real rollback: previous deployment, previous data, and previous configuration.

## Services and persistence

A multi-service deployment may contain, as needed:

- `web`: HTTP application.
- `worker` or `cron`: asynchronous/scheduled tasks.
- `postgres`: local PostgreSQL when the provider/server supports single-node mode.
- Redis, object storage, or other services only when documented.

Each environment must have separate volumes. Do not share `DATABASE_URL`, volumes, passwords,
restored backups, or data between Preview and Production. Do not claim high availability on one
server; document the single point of failure and compensate with external backups and restore
rehearsals.

If managed PostgreSQL requires a private cluster with two servers, do not force it over a public
IP. Explicitly choose between adding a node, running persistent PostgreSQL on the single server,
or using an external provider temporarily.

## Build configuration

- Use OpenShip's native flow.
- With `buildKind: dockerfile`, OpenShip must build and run the Dockerfile.
- Do not put `docker build` or `docker run` inside `buildCommand`/`startCommand` unless OpenShip
  explicitly documents Docker-in-Docker and approval exists.
- Do not depend on GHCR if OpenShip can build on the server; otherwise pin registry artifacts by
  verified digest.
- Do not assume OpenShip resolves Compose `build.target`; use explicit services or a compatible
  Dockerfile/service definition.
- Configure a health check for the application endpoint, such as `/api/health`.

## PostgreSQL and full migration

Before touching data, identify the exact source, classify business/auth/session data, create an
independent verifiable copy, prove restoration, and define RPO/RTO/retention/rollback.

For Preview: create an independent database and volume, restore the full backup, intentionally
exclude ephemeral sessions/cookies/tokens, verify table counts/foreign keys/migrations, apply only
missing idempotent migrations, point `DATABASE_URL` internally, and run smoke tests.

For Production: wait for Preview, create a final/delta backup, freeze writes during cutover,
restore to the independent Production volume, apply migrations before traffic, deploy the same
validated candidate, and preserve the previous deployment/database for rollback.

Never use `--force`, delete volumes, or destroy the source database to solve a migration error.

## Backups

Use an encrypted external destination with retention. Run backups before Preview and Production,
record IDs/source/size/checksum/status/time, and perform a restore rehearsal. If restoration
cannot be evidenced, block stateful deployment.

## Variables and secrets

Keep variables separate by environment. Do not copy the old provider's `DATABASE_URL`; point it to
OpenShip's internal PostgreSQL. Adapt auth URLs, trusted origins, webhook/cron URLs, and domains.
Protected secrets may not be exportable from Vercel or another provider; rotate or load them
through OpenShip's secure MCP/panel path.

## Domains and Cloudflare

Do not change DNS before a verifiable Preview/health URL exists. Protect Preview with Basic Auth and
noindex. Keep Production in maintenance/protection during cutover. Change only web records unless
`api`/mail migration is explicitly approved. Verify DNS, TLS, redirects, health, auth, admin,
forms, catalog, prices, WHMCS, and cron. Keep the previous provider as rollback until observation
closes.

## Stop criteria

Stop when the project ID does not match the requested environment, data/volumes are shared,
backup restoration is unproven, commit/artifact is untraceable, host/health fails, PostgreSQL is
not ready, counts/relations differ, deployment is partial, or DNS/TLS points elsewhere.

## Final checklist

- [ ] One project and Production/Preview environments identified.
- [ ] Correct branches and candidate/promotion traceable.
- [ ] Variables and secrets separated.
- [ ] PostgreSQL and volumes separated.
- [ ] Full backup and restore rehearsal verified.
- [ ] Migrations applied before traffic.
- [ ] Preview smoke tests green.
- [ ] Production uses the same validated candidate.
- [ ] DNS/TLS verified.
- [ ] Rollback practicable.
- [ ] Previous provider retained until observation closes.
