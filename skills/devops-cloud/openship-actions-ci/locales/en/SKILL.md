# CI with OpenShip Actions and Self-Hosted Runners

## Purpose

Prepare and verify CI on owned infrastructure. GitHub Actions orchestrates workflows; self-hosted runners managed by Dokploy execute jobs on a VPS separate from production. GitHub hosts code, PRs, events, logs, and Checks. This procedure replaces the former preference for CI independent of GitHub. The skill identifier remains for compatibility; it does not select the orchestrator.

## When to Use

- Typecheck, lint, tests, builds, or migration rehearsals need owned infrastructure.
- GitHub Actions workflows with self-hosted runners need inventory, design, or verification.
- Preview promotion is being prepared without running CI on every development push.

## When Not to Use

- No isolated destination exists or authorization is missing for resources, Actions activation, or remote compute.
- Code comes from unreviewed forks or tests need production secrets.
- Documentation approval is being treated as approval for deployment, spending, or migrations.

## Required Information

- Repository, visibility, branch, exact SHA, workflows, triggers, and last product run.
- Identified, separate CI and production hosts; verified version, OS, architecture, resources, networks, mounts, and tools.
- Runner inventory, labels, groups, and allowed repositories. Ready does not prove a pipeline works.
- Least-privilege GITHUB_TOKEN and credentials per job; Environment approvals and branch controls.
- Concurrency, time/resource limits, server and service costs, artifacts, retention, and cleanup.
- Explicit PR/CI/deployment relationship; Auto Deploy, webhooks, actual deployment provider, and environment gates.

## Procedure

1. Read workflows, triggers, runners, destinations, permissions, secret references without exposing values, runs, and deployment controls. Distinguish available, configured, and validated. Never assume another project matches this model.
2. Prepare `.github/workflows/` changes on a work branch. Automatic validation triggers are `pull_request` targeting `preview` and `push` to `preview`, using evidence to resolve the actual branch name. Do not add general development pushes or main/master PRs as automatic CI triggers. An open Preview PR is validated again on `synchronize`; explain this instead of promising a single run. Manual production gates are separate.
3. Document stages: branch/SHA preflight -> candidate validation -> isolated tests and integration -> build -> evidence. Use PR/ref concurrency, cancel stale runs only where safe, justified path filters, and timeouts. Never weaken gates to save runs.
4. Design a candidate trust domain without Preview/Production secrets or access. Prefer one-job ephemeral runners with fresh workspaces and volumes; verify deletion and deregistration. A persistent listener or restarted container is not ephemeral. The registration controller must not expose its credentials to the job.
5. Separate the production domain: a host or VM and credentials distinct from the candidate, restricted labels/groups and repositories, protected Environment, and explicit approval. Different labels on one persistent runner do not isolate trust. Run reviewed tooling and an artifact/digest from the authorized SHA, not arbitrary candidate scripts with production secrets. Documentation updates do not change this execution path.
6. Use disposable databases without production data for fresh installation, upgrade, and a second pass. Keep sanitized logs and ledger. Never rehearse against the database serving traffic.
7. Before enabling Actions, registering runners, creating a VPS, or running remote jobs, present host, cost, isolation, workflows, and rollback and recover the required approval. Read-only or documentation approval is not enough. Do not enable Auto Deploy or webhooks as a side effect.
8. Once authorized, run a diagnostic for the exact SHA and record orchestrator, destination, runner, run, artifact/digest, results, resources, and cleanup. A Check for another SHA, skipped run, or queued job is not green. Failure blocks promotion; do not conceal it by changing code or tests.

## Dokploy Isolation

- A CI VPS separate from production; no application networks, privileged mode, host networking, real host Docker socket, or mounts outside the job. If builds need more capabilities, present an approved design before widening permissions.
- No production secrets or deployment credentials in candidate jobs. Minimal token permissions and pinned, reviewed workflow dependencies.
- Egress restricted to necessary destinations; a bridge network is not full isolation or proof of a firewall. Verify actual rules, not just compose source.
- Queueing and initially one job per constrained resource, timeout, CPU/RAM/disk limits, bounded retention, and sanitized logs.
- PR code can compromise a self-hosted runner. Block unreviewed forks and verify policy against visibility and allowed actors before activation.
- GitHub does not charge for self-hosted execution under its applicable policy, but VPS, storage, artifacts, cache, and external services may cost money. Verify current prices and terms; do not describe the whole system as free.

## Validation

- GitHub Actions orchestrates; the Dokploy-managed self-hosted runner and separate host are verified.
- Actual triggers match approved policy; differences in existing projects are recorded, not changed by inference.
- An authorized run for the exact SHA completes all gates; Ready does not mean tested.
- Data, databases, permissions, and candidate/production domains are separate and cleanup is verified.
- Artifacts, results, approval, backup, and rollback are checked before each promotion that requires them.
- Missing access, a validated executor, or authorization means pending, not promotion.

## Expected Result

A CI plan or verified CI, clearly distinguished, with SHA, host, runner, run, results, artifacts, cost, approvals, and limits. Documentation is not an installed or executed pipeline.

## Safety

Risk level: **high**. Keep unreviewed forks blocked. Do not widen permissions, expose secrets, or use production data for tests. Server changes, spending, merge, and production require their authorization. A failed test blocks promotion and never justifies evading a control.
