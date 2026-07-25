# DNS Configuration

## Purpose

Plan and apply DNS changes with validation and safe recovery.

## When to Use

- DNS records must be created or changed.

## When Not to Use

- Zone ownership or change impact has not been verified.

## Required Information

- Zone, provider, current records, target, TTL, and change window.

## Procedure

1. Export current state and confirm authority over the zone.
2. Identify web, email, validation, and external service dependencies.
3. Lower TTL in advance when required by the change.
4. Obtain approval and apply the smallest possible change set.
5. Validate with independent resolvers and restore TTL after stabilization.

## Validation

- Every finding or decision has evidence and an owner.
- Success criteria are checked before closing the task.
- Deviations are recorded with their next action.

## Expected Result

Applied records, verified propagation, and documented rollback plan.

## Safety

Risk level: **high**. Do not perform irreversible changes, production access, or credentialed operations without explicit authorization, a recoverable backup, and a rollback plan.
