# Standard development process with Ideavo

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

Deliver phases and sprints with traceability from request through complete Preview acceptance to authorized release batches. Compilation does not prove functionality.

## When to Use

Any new or existing Ideavo development project, including fixes, tracking and release preparation.

## When Not to Use

Research without implementation or a release path. If current owner instructions conflict, document the conflict and stop the affected action.

## Required Information

Living plan, repository, actual development and integration branches, protections, authorized CI, isolated Preview and autonomy limits. Do not assume every application uses the same branches or platform.

## Procedure

1. Inventory scope, dependencies and acceptance by phase and sprint in docs/project or its equivalent.
2. Develop in the authorized Ideavo session and model. Before each prompt verify branch, SHA, working tree and autosave effects. Preserve work with commits and pushes on the authorized branch; preserve unrelated changes.
3. Review diff, secrets, tests and migrations. Run risk-appropriate gates on the candidate SHA using the project's authorized compute, without activating new pipelines.
4. Prepare the PR and obtain the required acceptance before merge or promotion. This document does not replace the owner.
5. Execute the complete milestone and integrated batch matrix in Preview as defined above. External blockers remain pending, never passed.
6. Freeze batch, version, SHA and PRs; verify backup checksum and rehearsed isolated restore, application and data recovery, and destination authorization. Version and rehearse migrations from scratch and from the prior schema; do not improvise SQL or confuse image rollback with data rollback.
7. Promote only the authorized version and environment through the approved pipeline. If autosave or autocommit changes the SHA, repeat affected gates before promotion. Announce the window opening and closing.
8. Verify deployment operation, record evidence and clean up authorized temporary resources. Update plan, state, risks and next milestone without deleting history.

## Validation

- Reviewed diff without secrets or unrelated changes; exact-SHA CI and appropriate tests pass.
- All milestone and batch acceptance cases pass in Preview with evidence.
- Promotion and destination authorized; restorable backup and rehearsed rollback.
- Written code, local tests, CI, Preview and production reported separately; no invented percentages.
- Per-project source loading verified, not assumed from links or PRs.

## Expected Result

Completed milestones tested in Preview and grouped into coherent releases. Production only after authorization; remaining work stays visible and is not called done.

## Safety

This skill is a procedure, not authorization. It grants no permission to merge PRs, deploy, change servers, secrets, data or production variables, spend money or communicate with third parties. Apply owner limits for each project, PR, version and environment; never infer them from another project or earlier PR. Secrets belong only in the authorized secret manager, never chat, logs or versioned files. No production data for QA or real external effects during tests.

## Compatibility with other proposals

The desarrollo-ideavo-opencode guide adds technical detail and ideavo-instructions-setup covers startup instructions. Open CI, branch or new desarrollo-ideavo entry proposals are not integrated by this change. Reconcile them separately without changing CI, infrastructure or permissions as an effect of this review. Each project pin needs its own review; merging this guide does not automatically install it in applications.
