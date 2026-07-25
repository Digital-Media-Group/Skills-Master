# Containerize a Web Application

## Purpose

Create a reproducible, secure, and operable image for a web application.

## When to Use

- The application has known build and run processes.

## When Not to Use

- Dependencies, ports, and persistence requirements are unknown.

## Required Information

- Runtime, commands, ports, dependencies, secrets, and deployment targets.

## Procedure

1. Identify artifacts, runtime, ports, and persistent data.
2. Select a maintained base image and pin relevant versions.
3. Separate build and runtime, minimize layers, and exclude unnecessary files.
4. Run as a non-root user and provide secrets only at runtime.
5. Build, scan for vulnerabilities, and test health, signals, and shutdown.

## Validation

- Every finding or decision has evidence and an owner.
- Success criteria are checked before closing the task.
- Deviations are recorded with their next action.

## Expected Result

Validated Dockerfile, exclusions, documentation, and runtime tests.

## Safety

Risk level: **medium**. Do not perform irreversible changes, production access, or credentialed operations without explicit authorization, a recoverable backup, and a rollback plan.
