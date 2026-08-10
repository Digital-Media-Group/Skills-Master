# Ideavo Instructions Setup

## Purpose

Create the Ideavo instructions file with project context, conventions, and boundaries so the agent works under the same rules as the team.

## When to Use

- The repository will be used with Ideavo and has no instructions of its own.
- Existing instructions are outdated compared to the actual project.
- The team repeats the same corrections to the agent in every session.

## When Not to Use

- The project has no stable structure, commands, or conventions yet.
- Only a one-off instruction for a specific task is required.
- The configuration belongs to another agent that already has a dedicated skill.

## Required Information

- Repository structure, build and test commands, code conventions, and operational constraints.
- Paths the agent must not modify and actions that require human approval.
- Working language and expected format for commits and messages.

## Procedure

1. Inventory structure, stack, and install, build, test, and lint commands.
2. Collect current conventions for code, naming, branches, and commits.
3. Draft the instructions file with short sections: context, commands, conventions, boundaries, and acceptance criteria.
4. State protected paths, secrets, and operations that require approval explicitly.
5. Remove duplicated information that already lives in the README or linkable documentation.
6. Validate the file against a real task and adjust instructions the agent ignores or misreads.

## Validation

- Every command listed in the file runs successfully in a clean environment.
- A test task completes without manual corrections about already documented conventions.
- No credentials or sensitive data appear in the instructions file.

## Expected Result

Versioned and verified Ideavo instructions file committed to the repository.

## Safety

Risk level: **low**. Do not include secrets, tokens, or sensitive internal paths. Explicitly state which operations require human approval before execution.
