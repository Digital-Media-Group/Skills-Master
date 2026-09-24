# Openship Git and Compose Deployment

## Purpose

Deploy an application from GitHub to a self-hosted Openship instance using a Dockerfile and, when present, `docker-compose.openship.yml`. The procedure covers web applications with workers and other services, environment variables, HTTPS domains, observability, and recovery.

## When to Use

- The project lives in a Git repository accessible to Openship.
- The application uses a Dockerfile, Compose, or an equivalent configuration detected by Openship.
- One or more services must be deployed, such as `web` and `worker`, in the same project.
- An authenticated Openship MCP/REST endpoint is available.

## When Not to Use

- The destination is not Openship or the control endpoint has not been confirmed.
- There is no plan for preserving data, variables, and rollback.
- Secrets would be copied into the repository, a skill, logs, or the conversation.

## Required Information

- Repository, owner, branch, and Compose path when it is not at the root.
- Build type, runtime, commands for each service, published ports, and readiness endpoint.
- Public domain and DNS pointing to Openship.
- Environment-variable inventory separating required, optional, and secret values.
- Openship MCP token stored in the agent's local environment.
- Existing project identifier when updating an existing project.

## Environment Variables

Before deployment, create a local template based on `.env.openship.example` and enter real values only in Openship. Never publish `.env`, tokens, or credentials.

### Reference application

For a Next.js/Bun application with PostgreSQL, B2 storage, Telnyx SMS, SES email, and ERP integrations, document at least:

- Required: `NEXT_PUBLIC_APP_URL`, `BETTER_AUTH_SECRET`, `DATABASE_URL`, `TRUSTED_ORIGINS`, `ALLOWED_SIGNUP_DOMAINS`, `SUPERADMIN_EMAILS`.
- Runtime: `NODE_ENV=production`, `HOSTNAME=0.0.0.0`, `PORT=4000`.
- Email: `AWS_SES_REGION`, `AWS_SES_SMTP_HOST`, `AWS_SES_SMTP_PORT`, `AWS_SES_SMTP_USER`, `AWS_SES_SMTP_PASSWORD`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`.
- Storage: `B2_ENDPOINT`, `B2_REGION`, `B2_KEY_ID`, `B2_APPLICATION_KEY`, `B2_BUCKET`.
- SMS: `TELNYX_API_KEY`, `TELNYX_PUBLIC_KEY`, `TELNYX_VERIFY_PROFILE_ID`, `TELNYX_FROM_NUMBER`, `TELNYX_MESSAGING_PROFILE_ID`.
- Webhook and retention: `SES_WEBHOOK_SECRET`, `TSA_URL`, `RETENTION_YEARS`.
- Optional ERP: `WHMCS_API_URL`, `WHMCS_IDENTIFIER`, `WHMCS_SECRET`, `DOLIBARR_API_URL`, `DOLIBARR_API_KEY`.

`B2_APPLICATION_KEY`, `TELNYX_API_KEY`, `TELNYX_PUBLIC_KEY`, `AWS_SES_SMTP_PASSWORD`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `SES_WEBHOOK_SECRET`, `WHMCS_SECRET`, and `DOLIBARR_API_KEY` must be marked as secrets. Optional integrations may initially be registered empty, but the skill must state that the corresponding functionality will remain unavailable.

## Procedure

1. **Inspect the repository before touching Openship**:
   - Read `Dockerfile`, Compose, `package.json`, lockfile, `.dockerignore`, entrypoint, and migration/bootstrap scripts.
   - Confirm that the web process listens on `0.0.0.0`, that the port matches the project, and that the worker publishes no port.
   - Make migrations and bootstrap idempotent; use a database advisory lock when web and worker can start together.
   - Add build tools to the dependency stage when a native dependency requires them, such as `python3`, `make`, and `g++` on Alpine.
   - Avoid BuildKit-only syntax or flags when the Openship builder uses the classic Docker flow.

2. **Prepare the production Compose**:
   - Use a `web` service with a shared build, explicit command, and the HTTP port exposed publicly.
   - Use a `worker` service with the same build and its worker command, without a public endpoint.
   - Preserve the complete environment for every service; do not drop variables while updating the definition.
   - Add clear healthchecks: HTTP for web and a process check for a worker without a port.
   - Set `restart: unless-stopped` or the equivalent policy and do not rely on `depends_on` to guarantee migrations.
   - Keep `DATABASE_URL` pointed at external PostgreSQL when the database is not deployed inside Openship.

3. **Configure or ensure the project**:
   - Reuse the existing project when repository, branch, and environment match; do not create duplicates.
   - For an existing Git project, use the Git deploy operation with `projectId`, branch, and `production` environment.
   - For a new project, use detection/ensure only when needed and preserve the complete service list.
   - Configure `composePath`, `runtimeMode=docker`, `buildKind=dockerfile`, port, domain, readiness, and rollback strategy.
   - If Openship returns a `groupId` but exposes no documented operation to list or move groups, do not invent a parameter or recreate the project: record the limitation and keep the current project.

4. **Load variables with a safe merge**:
   - Read the current project variables first; secrets must be returned masked.
   - Use the environment merge endpoint with `environment=production`, `upserts`, and `deletes=[]`.
   - Add missing keys with empty placeholders only for optional integrations. Never replace existing values with placeholders.
   - Set `isSecret=true` for credentials and tokens. Never include real values in logs, diffs, skills, catalogs, or responses.
   - Remember that build variables such as `NEXT_PUBLIC_APP_URL` must be available during the build, not only when the container starts.
   - After changing variables, perform the required redeploy: existing services may retain their old environment until recreated.

5. **Deploy**:
   - Run the Git deploy or appropriate build/access operation with the correct branch and environment.
   - Save the deployment ID and do not declare success merely because the request was accepted.
   - Poll `get_deployments_by_id_build` and `get_deployments_by_id` until a terminal state.
   - Inspect build and runtime logs per service, especially the worker.

6. **Resolve partial states with evidence**:
   - If `partial_failure` or `awaitingDecision` appears, first inspect pending actions and the exact failure reason.
   - Check containers, recent logs, and incidents before choosing `keep` or `reject`.
   - Use `keep` only when the services that must remain active are running and public health is correct.
   - Use `reject` only when the failure is real or the release must be reverted; treat it as destructive.
   - If the state stops being pending before the action is taken, do not repeat the action: reread the final state.

7. **Verify end to end**:
   - Project: branch, Compose path, Docker runtime, domain, readiness, and active deployment.
   - Services: all `running`, with no duplicates or abnormal restarts.
   - Worker: migration/bootstrap logs and a stable startup message.
   - Incidents: monitoring enabled, server reachable, and no open incidents.
   - HTTP: `GET https://<domain>/api/health` returns `200` and a healthy application state.
   - Variables: all required keys present; unconfigured optional keys are identified as unavailable.
   - Repeat the check after a short interval to detect crash loops.

8. **Document rollback and maintenance**:
   - Preserve deployment ID, commit SHA, relevant logs, and health URL.
   - Before a risky release, inspect the restore/rollback plan.
   - Use a Git redeploy for code changes; for environment-only changes recreate affected services.
   - Do not delete projects, volumes, databases, or branches without explicit approval and a recoverable backup.

## Validation

- The correct project is updated and no duplicate is created.
- The build finishes without Dockerfile, native dependency, or BuildKit errors.
- Web and worker are `running` with no open incidents.
- The domain serves HTTPS and `/api/health` returns `200`.
- Migrations are idempotent and the worker starts after bootstrap.
- Required variables are configured and secrets remain masked.
- A partial state is resolved using evidence, not intuition.
- The documented rollback points to a verifiable deployment or commit.

## Expected Result

A reproducible and operable Openship project: Git code deployed with Docker/Compose, production variables managed centrally, HTTPS domain, healthy web and workers, a verifiable healthcheck, queryable logs, and a documented rollback path.

## Safety

Risk level: **high**. The skill can operate production and handle credentials. Mandatory rules:

- Never store tokens or secrets in the repository, versioned `.env`, skill, catalog, logs, or messages.
- Read and compare before merging variables; do not delete unknown keys.
- Do not use undocumented endpoints to move groups, change projects, or retrieve secrets.
- Do not accept a partial release without checking services, logs, incidents, and health.
- `reject`, rollback, project deletion, volume deletion, and destructive changes require explicit approval.
- Protect the production branch and preserve the deployment commit SHA.
