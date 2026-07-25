# API Design Review

## Purpose

Assess an API for consistency, security, evolution, and consumer experience.

## When to Use

- An API contract or proposal is available for review.

## When Not to Use

- Functional requirements and consumers are unknown.

## Required Information

- Contract, use cases, consumers, authentication, and operational constraints.

## Procedure

1. Map every operation to a use case and owner.
2. Review resources, naming, methods, statuses, errors, and pagination.
3. Assess authentication, authorization, validation, limits, and sensitive data.
4. Check versioning, idempotency, compatibility, and observability.
5. Rank findings by impact and validate changes with consumers.

## Validation

- Every finding or decision has evidence and an owner.
- Success criteria are checked before closing the task.
- Deviations are recorded with their next action.

## Expected Result

Prioritized report with findings, risks, and recommended changes.

## Safety

Risk level: **medium**. Do not perform irreversible changes, production access, or credentialed operations without explicit authorization, a recoverable backup, and a rollback plan.
