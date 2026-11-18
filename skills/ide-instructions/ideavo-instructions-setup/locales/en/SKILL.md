# Ideavo Instructions Setup

## Phases, sprints and release batches (2026-11-18 revision)

This section replaces any guidance in this document that permits closure with a partial smoke test, shipping every phase separately, or promotion without the owner's current authorization. It does not change the project's CI platform, actual branches or permissions.

- Keep a living phase and sprint plan with dependencies, scope, PRs and acceptance criteria. Finish and validate each milestone before closing it; PR and commit counts are not delivered features.
- Develop in Ideavo using the project's approved branch flow. Keep the selected session and model. Documentation changes do not authorize environment, data or CI changes.
- Every milestone must pass Preview. 100% means ALL defined acceptance cases for its scope were executed and passed on the candidate identified by its exact SHA. It does not mean universal coverage or a guarantee that no bugs exist.
- The matrix covers complete flows, roles and permissions, error states, regressions and, where relevant, multiple users, persistence and real test integrations. Green CI, test doubles and partial smokes are separate evidence, not substitutes for acceptance. The agent runs the tests rather than asking the owner to do them.
- Record each case's result, environment, SHA, date and evidence. Pending, failed or blocked cases prevent claiming milestone acceptance. Fix in development and repeat affected cases and regressions in Preview.
- Group a considerable number of completed PRs into a coherent release batch based on dependencies, value and risk, without inventing a minimum count. Validate the integrated batch in Preview too; isolated PR results do not certify their combination.
- Before production, freeze the batch PRs, SHA and scope, verify candidate CI, complete Preview acceptance, a restorable backup and rehearsed rollback. Obtain the promotion authorization required for that version and environment. Never bypass Preview or treat this guide as permission to merge or deploy.
- Report written code, local tests, CI, Preview acceptance and production separately. Update the plan with delivered and pending work, without unmeasured percentages. After an authorized promotion, perform only minimal operational verification in production, never functional QA there.

### Loading in every project

The project startup file (AGENTS.md or Ideavo's native equivalent) must link proceso-estandar-desarrollo-ideavo, desarrollo-ideavo-opencode and ideavo-instructions-setup from a reviewed Skills-Master SHA. Record version, paths and evidence of reading at startup. A catalog link, old copy or open PR does not prove effective loading. Maintain a project inventory with actual branch, pin, startup path and status: proposed, merged or loading verified. Check drift and conflicts before updating the pin; preserve the owner's project-specific limits.


## Purpose

Create the Ideavo instructions file with project context, conventions, and boundaries so the agent works under the same rules as the team.

## When to Use

- The repository will be used with Ideavo and has no instructions of its own.
- Existing instructions are outdated compared to the actual project.
- The team repeats the same corrections to the agent in every session.

## When Not to Use

- The project has no stable structure, commands, or conventions yet.
- Only a one-off instruction for a specific task is required.
- The configuration belongs to another agent that already has a dedicated skill.

## Required Information

- Repository structure, build and test commands, code conventions, and operational constraints.
- Paths the agent must not modify and actions that require human approval.
- Working language and expected format for commits and messages.

## Procedure

1. Inventory structure, stack, and install, build, test, and lint commands.
2. Collect current conventions for code, naming, branches, and commits.
3. Draft the instructions file with short sections: context, commands, conventions, boundaries, and acceptance criteria.
4. State protected paths, secrets, and operations that require approval explicitly.
5. Remove duplicated information that already lives in the README or linkable documentation.
6. Validate the file against a real task and adjust instructions the agent ignores or misreads.

## Validation

- Every command listed in the file runs successfully in a clean environment.
- A test task completes without manual corrections about already documented conventions.
- No credentials or sensitive data appear in the instructions file.

## Expected Result

Versioned and verified Ideavo instructions file committed to the repository.

## Safety

Risk level: **low**. Do not include secrets, tokens, or sensitive internal paths. Explicitly state which operations require human approval before execution.
