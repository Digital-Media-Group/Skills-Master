# CI with OpenShip Actions and Self-Hosted Runners

## Purpose

Prepare and verify independent CI on owned infrastructure. Prefer native OpenShip/Atlas workflows; use an isolated independent executor in Dokploy only when available and validated. GitHub hosts code, PRs, events, and Checks; it does not orchestrate or execute jobs. Hosted and self-hosted GitHub Actions are outside this procedure.

## When to Use

- Typecheck, lint, tests, builds, or migration rehearsals need owned infrastructure.
- A native OpenShip workflow and its promotion gates need documentation or validation.
- An independent Dokploy fallback is being assessed without registering GitHub runners.

## When Not to Use

- The intended action registers a GitHub Actions runner or runs GitHub-coordinated workflows.
- No isolated destination exists or remote compute has not been authorized.
- Code comes from unreviewed forks or tests require production secrets.

## Required Information

- Current verified instance capabilities, version, OS, architecture, and tools. A version or Ready runner does not prove the product pipeline works.
- Repository, work branch, exact SHA, native workflow, destination, and evidence from that product's last run.
- Least-privilege identity for publishing Checks; test jobs must not hold deployment credentials.
- Per-attempt approvals, concurrency, time/resource limits, artifacts, and retention.
- Explicit PR/CI/deployment relationship; actual Auto Deploy, webhook, and promotion settings.

## Procedure

1. Read the product's linked workflows, runners, capabilities, runs, and deployment controls. Distinguish available, configured, and validated. Without a linked workflow or verifiable run, record pending rather than operational CI.
2. Prepare an independent native workflow in `.openship/workflows/` or native instance configuration according to verified capabilities. GitHub-like YAML syntax does not change the orchestrator. Do not reuse `.github/workflows/` as GitHub execution or enable GitHub self-hosted runners.
3. Document stages and dependencies: branch/SHA preflight -> candidate validation -> isolated tests and integration -> build -> evidence. Promotion is separate and requires PR acceptance and environment authorization.
4. Use disposable databases without production data for fresh installation, upgrade, and a second migration pass. Keep sanitized logs and ledger. Never rehearse against the database serving traffic.
5. Bind access and approvals to actor, SHA, attempt, and destination; use queueing and locks to prevent concurrent promotions. A Check for an older SHA, skipped run, or queued job is not a green gate.
6. Run diagnostics or pipelines only after authorization. Record orchestrator, execution destination, SHA, run, artifact/digest, results, and limits. Stop promotion on failure; do not change code to hide infrastructure failures.
7. Publish Checks as evidence only through an authorized integration. Publishing a Check does not require GitHub Actions. Do not enable Auto Deploy or webhooks as a side effect of CI configuration.

## Hardened Dokploy Alternative

A project named CI is not evidence of an executor. Verify an independent executor without GitHub Actions coordination, its queue, job contract, isolation, permissions, limits, and diagnostic evidence. If absent, record the gap and request implementation approval; do not invent endpoints or register a GitHub runner.

- Disposable containers without privileged mode, host networking, host Docker socket, application networks, or volumes outside the job. If builds need more capabilities, stop and present an approved isolation design; never silently widen access.
- Ephemeral CI credentials and databases, no Preview/Production secrets or deployment access.
- One active job per constrained resource, timeout, verified cleanup, and sanitized logs.
- Documentation does not create an executor, activate triggers, or authorize remote compute.

## Validation

- Orchestration is native OpenShip or independent Dokploy, never GitHub Actions.
- The workflow is linked to the product and an authorized run for the exact SHA completed every applicable gate; Ready is not tested.
- Migration tests use isolated data and databases; approvals, artifacts, and results are recorded.
- Auto Deploy, webhooks, and promotion gates are checked per environment and not changed without authorization.
- Missing access or a validated executor means pending, not promotion.

## Expected Result

A CI plan or verified CI, clearly distinguished, with traceable SHA, run, results, artifacts, and approvals. Documentation is not an installed or executed pipeline.

## Safety

Risk level: **high**. Documentation approval does not authorize remote jobs, deployments, or migrations. Keep unreviewed forks blocked. Do not widen permissions, expose secrets, or use production data for tests. A failed test blocks promotion and never justifies evading a control.
