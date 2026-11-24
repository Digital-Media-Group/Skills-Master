# Branch Flow in Ideavo

## Purpose

Keep a predictable branch flow: the Ideavo sandbox always loads `desarrollo`, the preview environment loads the `preview` branch and production loads the `production` branch.

## Branch rule

- Work happens on `desarrollo` (or on feature branches merged into `desarrollo`).
- Promotion: `desarrollo` - `preview` - `production`, always through a PR.
- Preview deploys from the `preview` branch, with its CI/CD and migrations on the hosting (Atlas/OpenShip). `desarrollo` is never deployed directly to Preview.
- Errors or changes found in Preview go back to `desarrollo` and are promoted again through the same path.
- `production` only receives what was validated in Preview, with the project owner's authorization for that version.
- `master` is not a mandatory step of this chain. If it exists, keep it; do not overwrite or delete it without explicit approval.
- If `desarrollo` does not exist, create it from `master`.

## Check before promoting

- Configured branch, deployed SHA and last deployment of each environment, read live in Atlas.
- Pending migration ledger and a database backup of the environment (see `openship-project-environments`).
- Auto-deploy of an environment only points at its stable branch (`preview` or `production`), never at a working branch.
- A repository document does not grant deployment authorization.

## Disjoint-history branches

Ideavo creates each branch with its own root: there is no merge base between them, so a normal merge fails or drags artificial conflicts.

1. Compare each loose branch with `git log` and `git diff` against `master` and `desarrollo`.
2. Integrate current work into `desarrollo` by applying the changes, not by merging histories.
3. Disjoint branches older than `master` are marked obsolete.
4. Propose deleting them with an exact list (name, last commit date, reason) and wait for approval.

## When to use it

- When creating, promoting, integrating or cleaning branches in an Ideavo project whose working branch is `desarrollo`.

## When not to use it

- Repos without branch-based deployment or projects that do not follow the desarrollo - preview - production flow.

## Required information

- Repo URL, existing branches (`git ls-remote`) and which branch each environment loads.

## Procedure

1. Clone or update the repo and fetch each branch explicitly (the default refspec only brings `master`).
2. Verify the state with evidence: `git ls-remote`, `git log --oneline`.
3. Apply the branch rule; resolve disjoint branches as described above.
4. Push only authorized branches.

## Validation

- `git ls-remote` shows `desarrollo` up to date with the integrated work.
- No current work is lost; obsolete branches are listed for decision.

## Expected result

A working desarrollo - preview - production flow, with no ambiguous branches.

## Safety

Risk level: **medium**. No force-push to `master` and no deletions without approval.
