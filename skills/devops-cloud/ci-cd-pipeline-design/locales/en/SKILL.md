# CI/CD Pipeline Design

## Purpose

Design automated delivery with controls, traceability, and recovery.

## When to Use

- The project needs automated validation or deployment.

## When Not to Use

- Branching, environments, and ownership are not agreed.

## Required Information

- Repositories, environments, risks, approvals, tests, and release strategy.

## Procedure

1. Model the flow from commit to production and assign owners.
2. Order linting, tests, security, build, and packaging by dependency.
3. Generate immutable artifacts and promote them across environments.
4. Protect secrets, permissions, approvals, and production deployments.
5. Define observation, rollback, and release stop criteria.

## Validation

- Every finding or decision has evidence and an owner.
- Success criteria are checked before closing the task.
- Deviations are recorded with their next action.

## Expected Result

Documented pipeline with stages, controls, artifacts, and rollback.

## Safety

Risk level: **high**. Do not perform irreversible changes, production access, or credentialed operations without explicit authorization, a recoverable backup, and a rollback plan.
