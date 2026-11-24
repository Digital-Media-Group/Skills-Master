# Branch Flow in Ideavo

## Purpose

Keep a predictable branch flow: the Ideavo sandbox loads the working branch `desarrollo` in projects adopting this flow, the preview environment loads the `preview` branch and production loads the `production` branch.

## Branch rule

- Work happens on `desarrollo` (or on feature branches merged into `desarrollo`).
- Promotion: `desarrollo` - `preview` - `production`, always through a PR.
- Preview deploys from the `preview` branch, with its CI/CD and migrations on the hosting (Atlas/OpenShip). `desarrollo` is never deployed directly to Preview.
- Errors or changes found in Preview go back to `desarrollo` and are promoted again through the same path.
- `production` only receives what was validated in Preview, with the project owner's authorization for that version.
- `master` is not a mandatory step of this chain. If it exists, keep it; do not overwrite or delete it without explicit approval.
- If `desarrollo` does not exist, identify the current base (`main`, `master` or another branch) and prepare its creation from the agreed SHA, only with authority to change branches. Do not assume `master` contains all current work.

## Check before promoting

- Configured branch, deployed SHA and last deployment of each environment, read live in Atlas.
- Pending migration ledger and a database backup of the environment (see `openship-project-environments`).
- Auto-deploy of an environment only points at its stable branch (`preview` or `production`), never at a working branch.
- A repository document does not grant deployment authorization.

## Disjoint-history branches

Do not assume histories are disjoint because a project uses Ideavo. First check `git merge-base` between the exact branches and retain their SHAs. An old date does not prove that content is integrated or that a branch is obsolete.

1. Compare commits and content with `git log` and `git diff`; also check unpublished changes before moving work.
2. With a common ancestor, use the normal PR and integration flow with its checks.
3. Without a common ancestor, inventory unique changes and prepare a reviewed application of those changes to `desarrollo`. Do not force unrelated histories or lose work to make a merge pass.
4. Propose a branch as obsolete only after verifying its work is integrated, replaced or explicitly discarded. Propose any deletion with name, SHA, date, reason and coverage evidence, then wait for approval.

## When to Use

- When creating, promoting, integrating or cleaning branches in an Ideavo project whose working branch is `desarrollo`.

## When Not to Use

- Repos without branch-based deployment or projects that do not follow the desarrollo - preview - production flow.

## Required Information

- Repo URL, existing branches (`git ls-remote`) and which branch each environment loads.

## Procedure

1. Clone or update the repo, check the actual refspec and fetch the required references. Do not assume only `master` is fetched.
2. Verify the state with evidence: `git ls-remote`, `git log --oneline`.
3. Apply the branch rule; handle disjoint histories only when the check confirms they are disjoint.
4. Push only authorized branches.

## Validation

- `git ls-remote` shows `desarrollo` up to date with the integrated work.
- No current work is lost; obsolete branches are listed for decision.

## Expected Result

A working desarrollo - preview - production flow, with no ambiguous branches.

## Safety

Risk level: **medium**. No force-push to `master` and no deletions without approval.
