# OpenShip Project and Environment Deployment

## Purpose

Operate applications on OpenShip on a self-hosted server such as Atlas using one project with isolated internal `Production` and `Preview` environments. This skill covers Docker services, persistent PostgreSQL, full migration from another provider, backups, promotion, rollback, and DNS.

OpenShip is not Dokploy. Do not use Dokploy endpoints, resource names, or assumptions to operate OpenShip. The Dokploy/Swarm skill remains valid for Dokploy but does not replace this integration.

## When to Use

- Deploying an application to OpenShip/Atlas.
- Needing Preview and Production environments within one OpenShip project.
- Migrating PostgreSQL and persistent services from Neon, Vercel, or another provider.
- Operating backups, promotion, rollback, or Cloudflare changes.

## When Not to Use

- The destination is Dokploy; use the Dokploy/Swarm skill.
- OpenShip MCP/panel access is unavailable.
- Data ownership, RPO/RTO, or Production authorization is unknown.
- No restorable backup exists for a stateful migration.

## Required Information

- Repository, `Preview`/`Production` branches, and candidate commit.
- OpenShip workspace, Atlas server, and MCP permissions.
- One OpenShip project and the internal IDs of its environments.
- Per-environment variables and securely loaded secrets.
- Source PostgreSQL, table inventory, migrations, and critical relations.
- RPO/RTO, backup destination/retention, domains, Cloudflare, and Production approval.

## Required model

```text
EmprenRed
├── Production -> Production branch
└── Preview    -> Preview branch
```

An OpenShip project may have multiple environments. Each has its own internal ID, variables, deployments, domains, and state. Always deploy using the internal identifier returned by OpenShip; never send `environment: preview` with a Production project ID.

Create separate projects only when OpenShip explicitly requires a non-production project. Document the exception and do not duplicate data or domains casually.

## Procedure

1. Verify workspace, Atlas server, permissions, host health, and repository.
2. Identify the single project and internal Production/Preview IDs.
3. Verify branches, candidate commit, build configuration, and health check.
4. Configure web, cron/worker, and PostgreSQL services with separate volumes.
5. Create a complete independent backup and prove restoration.
6. Restore and migrate Preview; verify counts, relations, services, and smoke tests.
7. Obtain human approval and repeat restoration in Production.
8. Promote the same validated candidate, verify services, then change DNS.

## Access and Safety

- Use the real OpenShip MCP transport and documented authentication.
- A connected `gh-cli` identity is not the same as a global GitHub App.
- Never accept secrets in chat or print full env, tokens, dumps, connections, or backup objects.
- Use stable request IDs and OpenShip preconditions such as `resourceVersion`, `expectedSequence`, and `expectedUpdatedAt`.

## Branches and Promotion

- Deploy Preview from `Preview`.
- Deploy Production from `Production`.
- Promote the same validated candidate; do not rebuild a different Production version.
- Order: validation -> build/artifact -> Preview -> smoke tests -> human approval -> Production.
- Keep the previous deployment, data, and configuration for rollback.

## Services and Persistence

A deployment may contain `web`, `worker`/`cron`, `postgres`, Redis, and object storage when documented. Each environment must have separate volumes and must not share `DATABASE_URL`, passwords, restored backups, or data. Do not claim HA on one server; compensate with external backups and restore rehearsals.

If managed PostgreSQL requires a private two-server cluster, do not force it over a public IP. Choose explicitly between adding a node, local persistent PostgreSQL, or an external provider temporarily.

## Build Configuration

- Use OpenShip's native flow.
- With `buildKind: dockerfile`, OpenShip builds and runs the Dockerfile.
- Do not put `docker build` or `docker run` inside commands unless Docker-in-Docker is explicitly documented and approved.
- Do not depend on GHCR when OpenShip can build on Atlas; otherwise pin a verified digest.
- Do not assume OpenShip resolves Compose `build.target`; use explicit services or a compatible Dockerfile.
- Configure an application health check such as `/api/health`.

## PostgreSQL and Full Migration

Before data changes, identify the source, classify business/auth/session data, create an independent verifiable copy, prove restoration, and define RPO/RTO/retention/rollback.

For Preview, create an independent database and volume, restore data, intentionally exclude ephemeral sessions/cookies/tokens, verify tables/foreign keys/migrations, apply missing idempotent migrations, point `DATABASE_URL` internally, and run smoke tests.

For Production, wait for Preview, freeze writes, create a final/delta backup, restore to an independent volume, apply migrations before traffic, deploy the same validated candidate, and preserve rollback.

Never use `--force`, delete volumes, or destroy the source database to solve a migration error.

## Backups

Use an encrypted external destination with retention. Run backups before Preview and Production, record IDs/source/environment/size/checksum/status/retention/time, and perform an isolated restore rehearsal. If restoration cannot be evidenced, block stateful deployment.

## Variables and Secrets

Keep variables separate per environment. Do not copy the old provider's `DATABASE_URL`; point it to internal OpenShip PostgreSQL. Adapt auth URLs, trusted origins, webhook/cron URLs, and domains. Rotate or securely load secrets that cannot be exported from Vercel.

## Domains and Cloudflare

Do not change DNS before a verifiable Preview/health URL exists. Protect Preview with Basic Auth/noindex and Production with maintenance during cutover. Change only approved web records; preserve mail and API records unless explicitly migrating them. Verify DNS, TLS, redirects, health, auth, admin, forms, catalog, prices, WHMCS, and cron.

## Validation

- One project and correct internal Production/Preview IDs.
- Traceable branches, commit, and deployment.
- Separate PostgreSQL and volumes.
- Verified backup and restore rehearsal.
- Verified migrations and counts.
- All services healthy, not only `web`.
- Preview validated before Production.
- DNS/TLS and rollback verified.

## Expected Result

One OpenShip project with isolated Production and Preview, restored and verified data, backed persistent services, the same candidate promoted, green smoke tests, verified DNS/TLS, and a practicable rollback.

## Safety

Risk level: **high**. Never store secrets in Git, Compose, dumps, images, logs, or chat. Do not declare success if PostgreSQL/worker fails. Do not change DNS, destroy data, or promote Production without a restorable backup, explicit approval, and a reversal plan.
