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

- Repository, actual integration branch (`main` or `master`), work branch/PR, `preview`/`production` branches, and candidate commit.
- OpenShip workspace, Atlas server, and MCP permissions.
- One OpenShip project and the internal IDs of its environments.
- Per-environment variables and securely loaded secrets.
- Source PostgreSQL, table inventory, migrations, and critical relations.
- RPO/RTO, backup destination/retention, domains, Cloudflare, and Production approval.

## Required model

```text
EjemploApp
├── Production -> production branch
└── Preview    -> preview branch
```

Development happens on a work branch in Ideavo. Never write directly on integration (`main` or `master`), `preview`, or `production`. Promote through an accepted PR to the actual integration branch and separate Preview/Production authorization. Do not rename branches or change the default to match a recipe. The server hosts Preview and Production; the model itself creates no environments. Stable environment branches (`preview`, `production`) are promotion targets only: never repoint them to work or configuration branches. Every change, including deployment configuration, lands through a feature branch and PR into `master` (or the configured integration branch), with no CI bypass. The branch path is `feature -> master -> preview -> production`; the TAG/SHA freeze plus image digest sits outside the branch path, never as a `release/*` branch. QA the exact SHA in preview and promote that same SHA to production; if promotion produces a new merge SHA, revalidate the final SHA before production and do not claim it is the same commit.

An OpenShip project may have multiple environments. Each has its own internal ID, variables, deployments, domains, and state. Always deploy using the internal identifier returned by OpenShip; never send `environment: preview` with a Production project ID.

Create separate projects only when OpenShip explicitly requires a non-production project. Document the exception and do not duplicate data or domains casually.

## Procedure

1. Verify workspace, Atlas server, permissions, host health, and repository.
2. Identify the single project and internal Production/Preview IDs.
3. Verify branches, candidate commit, build configuration, and health check.
4. Configure web, cron/worker, and PostgreSQL services with separate volumes.
5. Create a complete independent backup and prove restoration.
6. For an authorized initial transfer, restore into an isolated Preview destination; for an incremental release, apply only pending rehearsed migrations. Verify schema, ledger, integrity, and smoke tests.
7. Obtain candidate and Production environment approval. Never restore over the active database for an incremental release; an initial transfer follows the authorized cutover, final backup, and independent-volume restore.
8. Promote the same validated candidate, verify services, then change DNS.

## Access and Safety

- Use the real OpenShip MCP transport and documented authentication.
- A connected `gh-cli` identity is not the same as a global GitHub App.
- Never accept secrets in chat or print full env, tokens, dumps, connections, or backup objects.
- Use stable request IDs and OpenShip preconditions such as `resourceVersion`, `expectedSequence`, and `expectedUpdatedAt`.

## Branches and Promotion

- Deploy preview from the `preview` branch.
- Deploy production from the `production` branch.
- Promote the same validated code candidate. Reuse the immutable artifact when configuration permits. With environment-baked public variables, build per-environment images from the same SHA, lockfile, and recipe; record both digests and validate equivalence. Never reuse an image containing another environment's URLs or public keys.
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

Use an encrypted external destination with retention, S3 (Backblaze B2) by default. Run backups before Preview and Production, record IDs/source/environment/size/checksum/status/retention/time, and perform an isolated restore rehearsal. If restoration cannot be evidenced, block stateful deployment.

## Variables and Secrets

Keep variables separate per environment. Do not copy the old provider's `DATABASE_URL`; point it to internal OpenShip PostgreSQL. Adapt auth URLs, trusted origins, webhook/cron URLs, and domains. Rotate or securely load secrets that cannot be exported from Vercel.

## Domains and Cloudflare

Do not change DNS before a verifiable Preview/health URL exists. Protect Preview with Basic Auth/noindex and Production with maintenance during cutover. Change only approved web records; preserve mail and API records unless explicitly migrating them. Verify DNS, TLS, redirects, health, auth, admin, forms, catalog, prices, WHMCS, and cron.

## Continuous Integration

Use independent native OpenShip workflows or a validated independent Dokploy executor as described in `openship-actions-ci`. Never use GitHub Actions, including GitHub-coordinated self-hosted runners. CI never replaces this skill's gates: restorable backup, validated Preview, and human approval before Production.

## Application in Atlas with Linked Services in Dokploy

This is a configurable pattern, not a migration instruction. Document actual state and approved target separately. If the application currently lives in Dokploy, moving it to Atlas requires its own migration plan and authorization; never delete or stop the source as a documentation side effect.

Keep the per-environment inventory in private project documents: repository/branch/SHA, application, workers, agent runtime, PostgreSQL/Redis, volumes, logical endpoint, version/contract and digest, owners, backup/restore, CI and triggers, evidence, and gaps. Public guides contain only generic examples, never project-specific internal hosts, IDs, accounts, or secrets.

Coordinate application/service compatibility before promotion: verify the real endpoint without printing secrets, test observable capabilities, pin image digests, and record stop/migrate/start order. Matching version labels do not prove identity or compatibility; mutable tags do not replace digests.

## Incremental Migrations and Phase Closeout

- Reuse the migration protocol in `desarrollo-ideavo-opencode`: fresh install and upgrade rehearsal, ledger and actual schema, no-change second pass, concurrency lock, and partial-failure recovery.
- Before authorized promotion: external backup with checksum and verifiable isolated restore; unambiguous candidate, database, and environment. Apply only the approved candidate's pending migrations before traffic. Never improvise SQL or load development seeds in production.
- Irreversible migrations may prevent older binaries from restarting. Document expand/contract compatibility or coordinated data/application recovery, protection of later writes, RPO/RTO, and approval. Reverting an image does not revert a database.
- Close each phase with Git state, PR/approval, SHA/digests, observed and pending checks, ledger/migrations, backup/restore, actual deployment or not executed, blockers, and exact next action. A report is not evidence or authorization for the next phase.
- Reviewing or writing this guide does not execute CI, create services, migrate data, change triggers/DNS, or deploy.

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
