# IDE Instructions Audit

## Purpose

Review existing instruction files to detect outdated, contradictory, or unsafe rules before they degrade the agent's work.

## When to Use

- The agent breaks conventions that are already documented.
- The repository changed stack, commands, or structure.
- Secrets or excessive permissions are suspected in the instructions.

## When Not to Use

- No instruction file exists to audit.
- The goal is to create new instructions rather than review existing ones.

## Required Information

- Current instruction files, actual repository state, and issues reported by the team.
- Current build, test, and lint commands.
- Current approval and access policy.

## Procedure

1. Inventory every instruction file and its associated agent.
2. Compare each rule against the actual repository state and flag outdated ones.
3. Detect contradictions between files and rules that cannot be verified.
4. Search for credentials, sensitive paths, and permissions broader than needed.
5. Rank findings by impact on correctness, security, and maintenance.
6. Apply the agreed corrections and record those requiring a team decision.

## Validation

- Every documented command runs successfully after the correction.
- No contradiction remains unresolved or without a recorded decision.
- The secret scan returns no matches in the audited files.

## Expected Result

Prioritized findings report with applied or proposed corrections.

## Safety

Risk level: **medium**. If exposed secrets are found, treat them as compromised and request rotation. Do not broaden permissions or relax approvals without explicit team authorization.
