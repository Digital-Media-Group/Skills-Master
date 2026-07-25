# Release Readiness Review

## Purpose

Decide whether a release can proceed using technical, operational, and business evidence.

## When to Use

- A release candidate is approaching a shared or production environment.

## When Not to Use

- No owner has authority to accept residual risk.

## Required Information

- Changes, tests, risks, dependencies, observability, support, and rollback.

## Procedure

1. Confirm release scope, version, window, and owners.
2. Review testing, security, data, and compatibility evidence.
3. Verify configuration, migrations, observability, support, and communications.
4. Rehearse or validate rollback and stop criteria.
5. Record the decision, conditions, accepted risks, and owners.

## Validation

- Every finding or decision has evidence and an owner.
- Success criteria are checked before closing the task.
- Deviations are recorded with their next action.

## Expected Result

Recorded go, no-go, or conditional-go decision.

## Safety

Risk level: **high**. Do not perform irreversible changes, production access, or credentialed operations without explicit authorization, a recoverable backup, and a rollback plan.
