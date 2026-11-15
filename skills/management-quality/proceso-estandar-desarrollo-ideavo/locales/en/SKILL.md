# Standard development process with Ideavo

## Purpose

Run any engineering work with Ideavo in an orderly, verifiable, and governed way: phased plan, block-by-block development with PR and green CI, real preview QA, and production windows with verified backup and a rehearsed rollback. This is the current standard for all present and future projects, set from how GESCODI was run.

## When to Use

- Any development executed with Ideavo: new products, phases of existing products, and fixes with a path to production.
- Planning, tracking, or auditing a project's progress by phases.
- Preparing, running, or closing an own production window.

## When Not to Use

- Purely documentary or research tasks with no code changes or deployment.
- Isolated lab experiments with no path to production.
- When an express owner instruction conflicts: the instruction prevails and the conflict is documented.

## Required Information

- Phase plan with clear per-phase scope, kept as a living document in the repository's `docs/project/`.
- Repository with master, preview, and production branches, and own CI with a runner on Atlas/Dokploy.
- A single Ideavo chat per project and the fixed model chosen for that project.
- Autonomy limits approved by the owner (see Safety).

## Procedure

1. **Phased plan**: split the work into numbered phases with clear scope (e.g. Phase 1 Scheduling, Phase 2 Notifications). The plan lives in a repo document (`docs/project/`).
2. **Living document**: every closed phase, merged block, or scope change is reflected in the document the same day.
3. **Block development**: Ideavo works block by block, each block on its own `feat/` branch off current master, with frequent pushes as insurance against sandbox interruptions.
4. **PR + green CI**: each block ends in a PR opened against master. CI (own runner on Atlas/Dokploy, never GitHub-hosted Actions) must be green on the branch.
5. **Operator review and merge**: the operator reviews the diff (additive, no secrets, new tests) and merges. Ideavo NEVER merges or pushes to master, preview, or production.
6. **Real preview QA**: promote to preview, deploy, and run real smokes with test data (login, touched pages and APIs). What fails in preview does not reach production.
7. **Production window**: with a fresh verified backup, additive migrations applied by hand, deploy, smokes, and a rehearsed rollback. Announce when opening and when closing.
8. **Closeout and cleanup**: closeout report with times and evidence, and cleanup of temporary resources (rehearsal containers, dumps with real data).

## Standing rules

- **Single channel with Ideavo**: one chat per project; instructions are given in writing, in correct Spanish, and every reply is read in full.
- **Fixed model**: no model changes without an express order.
- **Continuous push**: watch every 15 minutes; if the session stalls, resume it without waiting; work does not stop until everything is in production.
- **Frequent pushes**: commit and push after each completed step; GitHub is the source of truth for progress.
- **Migrations**: additive only, with regenerated pins and marked in the PR; enum `ADD VALUE` statements are irreversible and declared as such.
- **Tests**: output to file with a summary, never a full dump into the chat; each block adds its own tests.
- **CI/CD**: only on Atlas/Dokploy with own runner. Never GitHub-hosted Actions.
- **Status with real %**: every status reports per-phase percentage, current block, master CI, and whether anything is stalled, without inflation.
- **Cookies, tokens, and secrets**: always to file, never shown in chat or logs.

## Operational templates

### Status

```
[Time] — Project
1. Phases: P1 X% (state), P2 X%, P3 X%...
2. Current block: what is being built and on which branch/PR.
3. Master CI: green/red (run), and whether anything is stalled.
4. Next step and estimate if any.
```

### Production window

```
WINDOW [phase] — [date time]
1. Fresh backup: run id, sha256 verified against the manifest.
2. Restore rehearsal: clean (tables, policies, migrations).
3. Forward rehearsal: the window's migrations applied onto the restore, no errors. Irreversibles declared.
4. Master CI green on the candidate SHA.
5. Promotion: PR to production merged by the operator; deploy launched.
6. Migrations applied by hand (bootstrap does not run them on deploy).
7. Post-deploy smokes: login, touched pages and APIs, all 200.
8. Closeout: end time, final state, rollback available (backup + redeploy of previous release).
9. Temporary resource cleanup.
```

## Validation

- CI green on each block's branch before the PR and on master after every merge.
- Real preview smokes (login, touched pages and APIs) before opening any production window.
- Fresh backup with verified sha256 and a clean restore rehearsal before production; post-deploy smokes all 200.

## Expected Result

Phases delivered to production with full traceability: living document up to date, PRs reviewed and merged by the operator, green CI, documented windows with times and evidence, and temporary resources cleaned up at closeout.

## Safety

Each phase is decided and shipped without asking for a numbered OK, provided the standing conditions hold (green CI, real QA, verified backup, rehearsed rollback) and what ships is announced. OUTSIDE that autonomy, always ask for express approval first:

1. **Payments and top-ups** (Telnyx, VoIP.ms, and any spend).
2. **EmprenRed catalog in production**.
3. **Messages to third parties** (messages, emails, or invitations outside test environments).
4. **Indeed brand, Mooola, and web marketing**.
5. **Secrets over chat**: never; always through the vault.
6. **Servers read-only**, except as expressly authorized.
7. **Production environment variables** (e.g. MARKETING_MAINTENANCE) are not touched: changing them is a product decision.

## When something goes wrong

- CI failure: read the job log, give Ideavo the exact failure, do not merge.
- Ideavo sandbox reclaimed with local work: recover from the worktree (git status/stash) or redo; GitHub wins.
- Preview smoke red: fix on a `feat/` or `fix/` branch with its additive migration if needed, and the window waits.
- CI stuck: cancel the hung run and let the queue advance; never merge without green.
