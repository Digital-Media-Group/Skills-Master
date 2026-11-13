# IDEAVO Development - OpenCode

## Purpose

Act as a development agent focused on delivering safe, verifiable, and maintainable changes in OpenCode. Preserve traceability between the request, repository, changes, tests, and delivery. A successful build alone does not prove a feature is correct.

## When to Use

- Create an application or service, add a feature, fix a bug, or refactor code.
- Modify a web interface or add authentication, databases, payments, queues, or storage.
- Prepare, validate, or promote deployments.
- Review performance, accessibility, SEO, security, or quality.
- Investigate CI, GitHub Actions, Vercel, database, or runtime failures.

## When Not to Use

- A purely documentary task that changes no code, configuration, or technical delivery.
- When a higher-priority instruction conflicts with this skill; follow precedence and record the conflict.

## Required Information

- User request, repository structure, and `git` status.
- `AGENTS.md`, `CONTRIBUTING.md`, runbooks, and release documentation.
- Framework, language, package manager, architecture, scripts, and configuration.
- External integrations, environment variables, required access, and definition of done.
- CI/CD and deployment platform: OpenShip/Atlas Actions as the preferred route and hardened Dokploy as the fallback (see the `openship-actions-ci` skill); hosted GitHub Actions, Neon, and Vercel must not provide pipeline or test-environment compute unless explicitly approved.
- Configuration management: environment variables are not required during development unless a real dependency requires them before Preview.

### Required MCPs

Verify that the agent environment has these MCPs enabled before starting tasks that depend on their capabilities:

- **Playwright**: browser automation, visual verification, E2E testing, and safe smoke tests.
- **Dokploy MCP**: authorized operations on Dokploy projects, environments, deployments, variables, and logs.
- **OpenShip MCP**: authorized operations on OpenShip/Atlas projects, environments, deployments, and Actions runners.
- **Context7**: current documentation and library or framework examples.
- **Firecrawl**: web scraping and data extraction when required by the task.
- **MCP GitHub**: repository, branch, issue, PR, review, and check operations through `https://api.githubcopilot.com/mcp/`.
- **Neon MCP** (only when the project uses Neon by explicit decision): controlled administration and querying of projects, branches, databases, migrations, and observability.
- **Vercel MCP** (only when the user authorizes it for a specific purpose): authorized queries and operations for Vercel projects, deployments, logs, and analytics through `https://mcp.vercel.com`.
- **Cloudflare MCP**: authorized queries and operations for Workers, DNS, security, and other Cloudflare services through `https://mcp.cloudflare.com/mcp`.

These MCPs are environment dependencies, not implicit authorization to act. Verify availability, scope, and credentials before using them; never request secrets in chat or enable paid resources automatically. Vercel MCP may be used to query or manage authorized resources, but Vercel is not used as CI/CD or test-environment compute.

## Procedure

1. Inspect before editing: instructions, worktree, branch, remotes, lockfile, configuration, affected paths, tests, and integrations.
2. Preserve unrelated changes. Never use `git reset --hard`, `git checkout --`, `git clean -fd`, or other destructive commands unless explicitly requested.
3. Define scope, likely files, risks, tests, and approval-gated actions. Before editing, create a complete plan with tasks broad enough to cover each phase from start to finish.
4. Make the smallest necessary change. Preserve the existing architecture, APIs, conventions, imports, and folder structure; avoid unnecessary dependencies and refactors.
5. Apply secure defaults: never expose secrets, validate inputs at the edge, protect resources, and do not test payments, deletes, migrations, or destructive production mutations without explicit authorization.
6. For APIs validate method, authentication, authorization, body, query, parameters, headers, errors, limits, pagination, timeouts, and idempotency.
7. For frontend work cover loading, empty, error, and success states; check desktop, mobile, keyboard, focus, contrast, metadata, and real performance.
8. During development avoid configuring environment variables. Use fake values, mocks, stubs, or safe defaults when they allow progress. Configure a variable before Preview only when a real dependency needs it to build, test, or run.
9. For databases detect the existing ORM, preserve data, use compatible migrations, test in an isolated database, and never execute destructive SQL autonomously.
10. For authentication protect endpoints and resources, authorize per operation, and test anonymous, normal, administrator, and special roles.
11. For external integrations use sandbox or Preview, least-privilege access, idempotency, backoff, timeouts, and retry limits; do not run real operations without approval.
12. Classify validation by risk: N1 documentation/styles; N2 UI or logic; N3 APIs, auth, storage, or integrations; N4 migrations, payments, critical security, or production.
13. At minimum run `typecheck -> affected tests -> focused lint -> diff check`. For N3/N4 add build, integration, E2E, preflight, and read-only remote smoke tests.
14. Never claim unobserved results. Mark every conclusion as `Confirmed`, `Inferred`, or `Pending`.
15. Respect Git: do not commit or push unless requested or required by a runbook; do not amend without authorization; never force-push protected branches.
16. After deployment confirm SHA, `READY` status, aliases, build logs, runtime errors, critical routes, and safe smoke tests. Distinguish historical errors from new ones.
17. If interrupted, leave the branch, SHA, related PR or deployment, completed and pending checks, blocker, last operation, and exact next action.
18. Before responding review implementation, validation, diff, and Git status; cite concrete paths and separate local, CI, Preview, and production evidence.

### Autonomous Planning and Human Attention

- At the start of a task, create a complete work list covering discovery, implementation, tests, review, documentation, commit, and delivery when applicable.
- Use long, self-contained tasks with a verifiable outcome to reduce interruptions and preserve context throughout each phase. Do not split a phase into micro-tasks that require confirmation after every command.
- Keep one task active, but perform all safe and related actions needed to reach that task's outcome within it.
- Anticipate dependencies, commands, affected files, validations, and likely failures before execution. Update the plan when new information appears.
- Decide autonomously on safe options that can be inferred from the repository, its instructions, and its conventions. Do not ask about routine preferences.
- Group inspection, editing, and validation in the same work cycle whenever this adds no risk.
- Report at meaningful checkpoints, not after every internal step. Each checkpoint should state progress, evidence, blockers, and the next phase.
- Ask for human attention only when there is material ambiguity, a missing non-inferable secret or identifier, or approval is required for production, billing, compute usage, permissions, destructive actions, remote migrations, or PR acceptance.
- Do not use autonomy to bypass a required approval. If a phase is blocked, complete all unblocked work first and ask one concrete question with a recommended option.
- When closing each long task, record its result, executed commands, modified files, residual risks, and verified acceptance criteria.

### Session Closure, Autocomment, and Release Signing

IDEAVO may run an `autocomment` when the response ends and comment, upload, or confirm the session changes. Treat the final message as an operational boundary: everything required for Preview, production, or a version signature must be resolved and verified before the conversation closes.

- Do not defer tests, migrations, preflight, signing, PR acceptance, deployment, smoke tests, or promotion-critical checks to the next message.
- Before the final message, freeze the change set: branch, exact commit SHA, complete diff, generated files, migrations, version, PR, and worktree status.
- Run every applicable gate against that SHA and record evidence from tests, build, Dokploy, Neon, permissions, security, and smoke tests.
- For Preview or production, close and verify the signature or acceptance associated with the exact SHA before sending the final response. The signature must identify the version, branch, environment, and approver.
- IDEAVO's automatic `autocomment`, autocommit, or push is not equivalent to a signature, PR acceptance, human authorization, deployment, or production promotion.
- If automatic closure creates or modifies a commit after verification, every signature and piece of evidence tied to the previous SHA is invalid. Repeat preflight and signing against the new SHA before promotion.
- If it cannot be guaranteed that automatic closure will preserve the verified SHA, do not promote. Close as a `non-promotable checkpoint`, state the SHA, and leave acceptance or signing for a new session.
- After closing the signature, do not modify code, documentation, lockfiles, generated artifacts, migrations, tags, or release configuration. Any change requires a new version or signature.
- The final response must explicitly state SHA, branch, PR, signature/acceptance, deployment, environment, and the status of each gate, separating `Confirmed`, `Inferred`, and `Pending`.
- For production, never state `production-ready` if signing, PR acceptance, or SHA verification was not closed before the final message.

### Branch and Environment Model

Generic convention. First adopter: GESCODI. Do not apply it to other projects without an inventory and an explicit owner decision.

- **`desarrollo`** is the long-lived product integration branch. Every feature branch starts from `desarrollo` and returns via PR to `desarrollo`.
- **The real `master`/`main`** is stable integration. Promotion from `desarrollo` goes through a PR to the real integration branch, never a direct commit or automatic merge.
- **`preview` and `production` only promote.** They receive only the approved SHA/digest from integration; never feature branches. Integration is not production.
- **Gates and permissions:** every promotion requires preflight, gates, a numbered OK, backup, rehearsed restore, and verified rollback. `preview` and `production` are not for development.
- **Traceability:** promote an approved SHA/digest. Any merge, rebase, or autosave that changes the SHA requires repeating preflight, gates, and signature on the final SHA. Never confuse a new SHA with the approved one.
- **Migrations and isolation:** they are designed and tested in `desarrollo` with isolated databases; `preview` validates the approved candidate; `production` is not a test environment.

Do not activate automations, previews, or deployments by updating this text. Do not change the default branch, protections, CI destinations, or servers. Existing projects require an inventory and the owner's decision before adopting this flow; GESCODI is first and the rest remain unchanged for now.

### CI/CD and Deployments

- Run CI/CD and test environments through OpenShip/Atlas Actions when the instance supports it (see the `openship-actions-ci` skill) or, as a hardened fallback, through Docker on Dokploy, reusing its compute for builds, tests, integration, and validation.
- Do not use GitHub Actions, hosted or self-hosted, for pipelines, builds, or test environments. GitHub may host repositories, PRs, and Checks, but must not orchestrate or execute jobs. Do not register GitHub runners as a fallback for independent CI.
- Do not use Neon or Vercel compute for CI, builds, or test environments. Use Neon only when explicitly selected for persistence, and Vercel only for an explicitly authorized purpose.
- Do not create automatic previews or automatic deployments from a branch, PR, or commit. A deployment to Preview or any non-production branch requires the user to accept the PR before it runs.
- Do not promote a work branch directly to production. After PR acceptance and environment authorization, use the approved actual destination: OpenShip/Atlas for the application or Dokploy for linked services. Updating this guide does not migrate an application between platforms.
- Before consuming remote compute, verify that the job, environment, or deployment matches the approved action and avoid duplicating pending executions.

### Mandatory Isolation of Test Compute

Critical note: any migration test, test run, gate, or validation executed through CI/CD must always run in an isolated external environment (an OpenShip Actions runner or Docker on Dokploy), usually connected through MCP.

- During development, no migration test or CI/CD run happens directly on Vercel, Neon, or any other external compute. Always route it to the isolated OpenShip Actions or Dokploy environment.
- In Preview, even when the database lives on an external provider, tests, migrations, and gates run in an isolated environment (OpenShip Actions or Dokploy) against a disposable data copy or branch; never against the service serving traffic.
- Cross-environment migrations, gate tests, and deployment verifications are also isolated in OpenShip Actions or Dokploy before touching the target environment.
- The goal is to save external providers' compute (Neon, Vercel, or any other deployment operator): their compute is reserved for serving real authorized traffic, not for running tests.
- Manage this routing automatically according to the active workflow: detect the current phase (development, Preview, production) and direct every test to the isolated OpenShip Actions or Dokploy environment without asking for routine confirmation. Only ask when neither is available or the workflow does not allow isolation.

### Migrations: development first and automatic application

- Design, fix, and test migrations in development, using an isolated database and structural data. Do not use Preview or production to discover or repair a migration for the first time.
- Version SQL, journal/manifest, dependencies, and tests with the functional change. Rehearse both a clean installation and an upgrade from the previous schema; compare the ledger and effective schema, not just file counts. Verify a no-change second pass, permissions, integrity, cross-version compatibility, and recovery from partial failure.
- Prepare the pipeline migration step in development. During an authorized promotion to Preview or production, the pipeline automatically applies only pending migrations from the same validated candidate, without manual SQL or new questions for each routine step.
- Automatic application does not authorize a merge, promotion, or out-of-scope change. Preserve the numbered PR OK and authorization for the version and environment; a destructive migration or new risk needs its specific decision. This procedure does not run or enable deployments by itself.
- Before applying: identify the target database and environment, lock concurrent runs, verify the ledger, pin the approved SHA/digest, and create an S3/B2 backup with checksum, timestamp, and verifiable isolated restore evidence. If any precondition is missing, stop the pipeline before changing data or traffic.
- Separate initial installation or data relocation from incremental schema migration. Do not restore a copy over an active database as a routine release step, and never run development seeds in production.
- Preserve a rehearsed rollback path for application and data. Prefer expand/contract migrations compatible with the previous version. Do not assume reverting an image reverses the schema or that every DDL operation is transactional; when data restoration is necessary, protect later writes and respect the approved RPO/RTO. Do not run an untested destructive down migration automatically.
- On failure: stop promotion and new traffic, preserve logs and ledger, run only the rehearsed and authorized recovery, and verify health and integrity. If automatic recovery is unsafe, leave the environment in a controlled stopped state and escalate; do not improvise SQL in Preview or production.
- Close the pipeline with evidence: environment and database, SHA/digest, expected/applied migrations, verified backup and restore, smoke-test results, rollback status, and blockers. Successful migration application alone is not functional acceptance of Preview or production.

### Per-Environment Persistence

- By default, each environment uses its own PostgreSQL on the project's server (Atlas or Dokploy), with separate databases and credentials for development, preview, and production.
- Neon is used as persistence only by explicit user decision; in that case, create and maintain `dev`, `preview`, and `production` branches in the available region closest to Europe, recording the chosen region.
- Isolate credentials, test data, and migrations per environment; never use production data for development, Preview, or tests.
- The development environment serves development and integrated local tests; `preview` is used only after PR acceptance; `production` is reserved for production and its approved migrations.
- Before creating databases or applying remote migrations, verify the project, region, owner, database name, and source. Never delete or reset databases without explicit authorization.

### Environment Variables

- During development, do not request or configure environment variables by default. Prefer mocks, stubs, fixtures, and safe defaults that allow work without secrets.
- If a dependency requires a variable before Preview, identify it, explain why it is needed, and use only a local, test, or sandbox value with least-privilege access.
- Prepare real variables needed during the Preview phase, separated by environment and managed in Dokploy or the authorized secret system; never paste them into chat, commits, or versioned files.
- Never reuse production variables in development or Preview. Development, preview, and production credentials must remain isolated.

### Ideavo Sandbox Provisioning and Public URL

- On every provisioning or recreation, use the HTTPS origin and port published by the current Ideavo sandbox as the public development URL. Never use localhost, a private IP, or another environment's host as the browser destination. The process may bind locally: that is not its public URL.
- Obtain the origin from platform configuration rather than hardcoding temporary IDs or hosts in this skill. Check the canonical origin, auth, callbacks, trusted origins, cookies, HMR, and sandbox iframe policy separately. This development configuration does not require production secrets.
- Do not blindly trust X-Forwarded-Host or relax CORS, CSP, or iframe protection for every origin. If the embedded preview needs an exception, scope it to development and the authorized Ideavo origin; retain Preview and Production protections.
- Development gate: record the outer URL and redirect chain; both must stay within the expected sandbox without redirecting to localhost. Visually inspect the embedded preview and verify login/callback when applicable. Repeat after sandbox recreation or origin configuration changes.
- If the gate fails, mark BLOCKED, separate verified causes from hypotheses, and do not call the environment ready. In a documentation-only task, record the finding and pending fix only: changing code, variables, headers, ports, or restarting requires separate approval.

### Development-Only Role Autologin

When the project has role-based login, implement role autologin ONLY for the development environment (for example inside Ideavo), to exercise each role's login and dashboard without typing credentials:

- Fail-closed double condition: require `APP_ENV=development` (or the framework equivalent) AND an explicit `DEV_AUTOLOGIN=true` flag. With any other value, or if either is missing, autologin does not exist.
- Impossible in preview/production: the code checks the environment at runtime and aborts startup if the flag appears outside development; the flag is never defined in Preview/Production variables; add a build or CI guard that fails if autologin code is included in a preview or production build.
- Only the structural role accounts from the development seed (one per relevant role, created through the CRUD); never real user credentials or data.
- Offer a role switcher visible only in development to change roles while testing.
- Add a regression test verifying that autologin is absent in preview/production and that protected routes require real authentication.
- Never expose autologin on public routes or use it to bypass per-operation authorization outside development.

### Development Seed Data

- General rule: NEVER example, mock, placeholder, or "test" fixture data in any environment (no lorem ipsum, no "test/demo" records that must later be found and cleaned up): removing them afterwards costs more than creating them properly. Everything is created through the application's real CRUD, as functional data from the start.
- The development database is always seeded with real, structural data: roles and their permission matrix, catalogs, base configuration, and the structural per-role accounts. An idempotent script (on environment start or through a documented command) leaves it ready to test new work on the work branch (for example in Ideavo) without manual setup.
- Every new feature or API or database schema change must include on the work branch the seed additions or updates needed to test its cases, relationships, and permissions. The change is not complete until the seeds cover the new feature.
- Updating seed code does not authorize running it against a real database: writes still require their own approval. Development and preview seeds remain separate and are never loaded into production.
- The seed is deterministic and resettable; it regenerates from scratch with no manual steps and leaves no annotations to clean up afterwards.
- Seeding goes through the application's CRUD or services, never through SQL that bypasses its validations: every seeded record is valid and functional.
- Additional functional records are created through the CRUD with realistic, valid content, never marked as disposable.
- Never personal data or data copied from production; generated structural and functional data only.
- The development seed never runs in preview or production: the same fail-closed guard as autologin. Production is migrations-only and never receives seed or fixtures.
- Preview keeps its own full seed for pre-production testing; Stripe (or the payment provider) always stays in test mode in Preview.

## Validation

- Repository commands run with its package manager and their results are recorded.
- Tests cover happy paths, invalid inputs, permissions, and risk-relevant failures.
- Migrations apply from scratch in an isolated environment and never use production data.
- Remote surfaces are checked with read-only smoke tests; metrics, logs, tests, and deployments are never invented.
- The diff contains no secrets, tokens, PII, or unrelated changes; `git diff --check` passes when applicable.
- The definition of done and every external blocker are documented.
- CI/CD validation runs on OpenShip Actions or Dokploy and does not consume paid compute from GitHub Actions, Neon, or Vercel.
- Every migration test, gate, or validation ran in the isolated environment (OpenShip Actions or Dokploy), even in Preview and with an external database.
- Preview and non-production branch deployments do not run automatically; recorded PR acceptance exists before execution.
- Every environment has separate databases and credentials (development, preview, production); Neon is used only by explicit decision.
- Role autologin works only with `APP_ENV=development` and `DEV_AUTOLOGIN=true`, is absent from preview/production, and its regression guard passes.
- The development seed is idempotent, structural, and resettable, with no mock or example data; production never receives seed data.
- No change introduces example, mock, or placeholder data; records are created through the real CRUD.
- An S3/B2 backup with a restore rehearsal exists before mutating Preview or Production, and the owner's numbered OK is on record for each integration PR and environment promotion.
- Required MCPs are available with permissions that are sufficient, minimal, and verifiable for the task.
- A complete plan exists, tasks are self-contained, and human attention was requested only for a blocker or required approval.
- Development progresses without environment variables unless a demonstrated technical need exists; real variables are configured in Preview and remain isolated per environment.
- Session closure has an explicit checkpoint and no signature or promotion depends on the next message.
- Preview or production signatures and evidence correspond to the exact SHA being promoted.

## Expected Result

Functional software with minimal changes, risk-proportional validation, reviewed security, complete traceability, and a concise final response distinguishing confirmed facts from pending work.

## Safety

Risk level: **high**. Never paste secrets into responses, logs, commits, issues, or documentation. Do not request passwords, cookies, API keys, or tokens in chat. Require explicit approval for production, billing, credentials, destructive migrations, payments, deletes, role changes, external compute usage, and force pushes. Do not use production data for testing or remove user changes. Role autologin and the development seed are never enabled outside the development environment; if a preview or production deployment exposes them, treat it as an incident and remove it immediately.
