# Backup and Restore

## Purpose

Define and verify a backup strategy based on recovery objectives.

## When to Use

- A service needs protection or recoverability validation.

## When Not to Use

- Owners, critical data, RPO, or RTO are unknown.

## Required Information

- Data inventory, RPO, RTO, retention, encryption, locations, and owners.

## Procedure

1. Classify data and agree on RPO, RTO, retention, and ownership.
2. Design independent, encrypted backups protected from deletion.
3. Automate execution, alerts, and integrity verification.
4. Restore into an isolated environment using a documented procedure.
5. Compare results with objectives and remediate every gap.

## Validation

- Every finding or decision has evidence and an owner.
- Success criteria are checked before closing the task.
- Deviations are recorded with their next action.

## Expected Result

Backup policy and evidence of a tested restore.

## Safety

Risk level: **high**. Do not perform irreversible changes, production access, or credentialed operations without explicit authorization, a recoverable backup, and a rollback plan.
