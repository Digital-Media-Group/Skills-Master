# CI with OpenShip Actions and Self-Hosted Runners

## Purpose

Run CI validation on your own infrastructure when hosted GitHub Actions is unavailable (for example, an organization billing block) or when self-hosted runners are preferred. OpenShip Actions, available since OpenShip v0.9.0, offers two modes: independent workflows in `.openship/workflows/` executed by OpenShip, and existing GitHub workflows executed on official self-hosted runners registered on OpenShip destinations.

## When to Use

- Hosted GitHub Actions is blocked or limited for the organization and an OpenShip instance (for example Atlas) exposes the Actions section.
- Validation (typecheck, lint, tests, build) should run on own servers with Checks published to GitHub.
- A GitHub workflow already exists and only needs to target a self-hosted runner.

## When Not to Use

- The repository needs Windows runners or GitHub Enterprise Server: not supported.
- GitHub protected environments or attestations are required: independent execution does not implement them.
- Code comes from unreviewed forks: forks are blocked by default and only allowed with explicit approval and disposable runners without privileged secrets.
- A fresh independent run does not resume or replace a failed GitHub run; if exact continuity is required, re-run the same SHA and document it.

## Required Information

- Instance version (Actions requires v0.9.0 or later) verified in the dashboard: a compatible version does not prove the feature is configured and operational.
- An execution destination with OS, architecture, and tooling reported by verified capabilities; Linux runners support container images and macOS runners use native tools.
- The instance's GitHub connection (token or App) for importing workflows and publishing commit Checks.
- Runner labels, per-workflow access policy, and the approval rule (actor, commit, attempt, and destinations).
- An inventory of affected workflows and which `runs-on` labels must switch to self-hosted.

## Procedure

1. Verify capability on the instance: the Actions section in the dashboard, at least one Ready runner, and an active GitHub connection in Settings.
2. Choose the mode per repository:
   - GitHub-coordinated: register an official self-hosted runner on an OpenShip destination and point `runs-on` to its self-hosted labels. GitHub keeps orchestration, secrets, environments, and Checks; jobs targeting GitHub-hosted labels still run on GitHub. Importing a workflow does not silently change its execution platform.
   - Independent: create or import workflows in `.openship/workflows/` with GitHub-style YAML; trigger them manually, on push/PR, on schedules, through authenticated dispatch, or from Jobs. GitHub provides source, events, and commit Checks without running anything.
3. Edit the workflow with the single editor (Topology, List, and YAML views over the same draft), connect jobs and dependencies, and define per-file and per-branch trigger rules.
4. Limit workflow access to the account or selected repository users, requiring approval per attempt; approvals bind actor, commit, attempt, and destinations.
5. Run and follow executions: masked logs beside jobs and steps, a topology view, and a separate approvals tab. Independent runs use artifacts/caches with scoped storage; jobs with `id-token: write` receive OIDC tokens from the instance itself, not from GitHub.
6. On failure, distinguish application cause (job exit code) from infrastructure cause (runner not Ready, unavailable image) before changing code or runners.

## Hardened Dokploy alternative

When OpenShip Actions does not apply, a GitHub Actions self-hosted runner can be deployed as a Docker Compose service in Dokploy:

- A fine-grained token limited to the repository, stored as a Dokploy secret; the process running jobs does not keep the registration token.
- No `/var/run/docker.sock` mount (mask it with `/dev/null`), no `privileged` or `network_mode: host`, no joining other applications' networks, and no volumes outside the project.
- Disposable CI credentials and databases; never Preview or Production secrets on the runner.
- Verification: the runner shows as Idle under Settings -> Actions -> Runners of the repository and a diagnostic workflow executes its steps on it.

## Validation

- Runner registered and Ready/Idle in the OpenShip dashboard or under GitHub Settings -> Actions -> Runners.
- A diagnostic run executes all its steps on the own destination and publishes the Check on the commit.
- Logs contain no secrets and approvals are recorded.
- Application deployment does not depend on CI: the deployment build follows its own path.

## Expected Result

Validation running on own infrastructure with Checks visible in GitHub, labeled and ready runners, per-workflow restricted access with approvals, and a documented hardened Dokploy alternative for repositories where OpenShip Actions does not apply.

## Safety

Risk level: **high**. Native runners or runners with the host Docker socket execute code with that server user's access: reserve them for trusted code and use disposable runners for stronger isolation. Keep forks blocked by default. Do not disable approvals or widen token scope without explicit authorization. Never store secrets in Git, workflows, logs, or chat.
