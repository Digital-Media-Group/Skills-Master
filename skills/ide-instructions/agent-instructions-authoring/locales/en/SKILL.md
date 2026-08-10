# Agent Instructions Authoring

## Purpose

Write a neutral, reusable instructions file shared across IDEs and coding agents, avoiding duplicated or contradictory rules.

## When to Use

- The team uses more than one agent or IDE on the same repository.
- Several instruction files exist with diverging rules.
- A single source of conventions is needed for every agent to reference.

## When Not to Use

- Only one agent is used and its native file is sufficient.
- The rule depends on a capability exclusive to one specific agent.

## Required Information

- Agents and IDEs in use, team conventions, and tasks routinely delegated to the agent.
- Canonical install, build, test, and lint commands.
- Approval, branching, and change review policy.

## Procedure

1. Locate every existing instructions file and group them by agent.
2. Extract shared rules and separate them from agent-specific ones.
3. Draft the neutral file with imperative, verifiable, unambiguous rules.
4. Keep only agent-exclusive content in each specific file and link to the neutral file.
5. Resolve contradictions with the team and record the decision taken.
6. Run the same task with each agent and compare the outcome.

## Validation

- No rule appears duplicated with different content across two files.
- Every rule can be checked with a command, a review, or an observable criterion.
- The agents in use produce equivalent results on the test task.

## Expected Result

Neutral instructions file with verifiable rules and per-agent references.

## Safety

Risk level: **low**. Keep credentials, internal endpoints, and personal data out of the file. Mark destructive or production actions as approval-gated.
