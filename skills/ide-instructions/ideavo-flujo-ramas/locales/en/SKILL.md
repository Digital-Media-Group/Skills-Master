# Ideavo Branch Flow

## Purpose

Keep a predictable branch flow: the Ideavo sandbox always loads `desarrollo`, the preview environment loads the preview branch, and production loads the production branch.

## Branch rule

- Work happens in feature branches and merges into `desarrollo`.
- Promotion: work - `desarrollo` - preview branch - production branch.
- If `desarrollo` does not exist, create it from `master`.
- Never overwrite `master` or delete branches without explicit approval.

## Disjoint-history branches

Ideavo gives each branch its own root: there is no merge-base and a normal merge fails or drags artificial conflicts.

1. Compare each loose branch against `master` and `desarrollo` with `git log` and `git diff`.
2. Integrate current work into `desarrollo` by applying changes, not merging histories.
3. Disjoint branches older than `master` are marked stale.
4. Propose deletion with an exact list (name, last commit date, reason) and wait for approval.

## When to Use

- When creating, promoting, integrating, or cleaning branches in an Ideavo project.

## When Not to Use

- Repos without branch-based deployments or projects not following the desarrollo - preview - producción flow.

## Required Information

- Repo URL, existing branches (`git ls-remote`), and which branch each environment loads.

## Validation

- `git ls-remote` shows `desarrollo` up to date with the integrated work.
- No current work is lost; stale branches are listed for decision.

## Expected Result

A working desarrollo - preview - producción flow with no ambiguous branches.

## Safety

Risk level: **medium**. No force-push to master and no deletions without approval.

## Procedure

1. Follow the skill rules step by step.
2. Verify each milestone before continuing.
