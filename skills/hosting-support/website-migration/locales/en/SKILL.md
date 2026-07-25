# Website Migration

## Purpose

Move a site between environments while minimizing data loss and downtime.

## When to Use

- Source, destination, and migration window are identified.

## When Not to Use

- No verified backup or sufficient source and target access exists.

## Required Information

- Inventory, access, data, DNS, email, traffic, and downtime tolerance.

## Procedure

1. Inventory application, data, files, DNS, email, and scheduled jobs.
2. Create and test backups before modifying the source.
3. Prepare the target and perform a rehearsal migration.
4. Freeze changes, synchronize deltas, and switch during the approved window.
5. Validate critical functions, monitor errors, and retain rollback capability.

## Validation

- Every finding or decision has evidence and an owner.
- Success criteria are checked before closing the task.
- Deviations are recorded with their next action.

## Expected Result

Migrated, validated, monitored site with rollback available.

## Safety

Risk level: **high**. Do not perform irreversible changes, production access, or credentialed operations without explicit authorization, a recoverable backup, and a rollback plan.
