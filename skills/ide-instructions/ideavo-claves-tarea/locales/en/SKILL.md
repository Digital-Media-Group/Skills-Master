# Task Keys in Ideavo

## Purpose

Resolve task credentials autonomously, without leaking values and leaving everything revocable.

## Rules

1. Task-key autonomy: create, use, revoke, and report without asking for each one.
2. Values NEVER appear in chat, logs, reports, or repos. Pass them through temporary files that are deleted, or through the credential vault.
3. Every new key is stored in the vault and the copy link is reported to the owner.
4. Stripe: TEST mode only (pk_test/sk_test keys and a test webhook). Nothing live, no real payments.
5. LLM: use the in-house OmniRoute router, cheapest model first.
6. Service password resets: through the assistant mailbox (triana@agente.mypanelhost.com), saving the new password into the existing vault entry.
7. When the task ends, revoke the created task keys and report it.

## When to Use

- When a task needs a new credential or key for an external service.

## When Not to Use

- Live or production credentials, and real payments: outside task autonomy.

## Required Information

- Target service, minimum key scope, and the vault entry to store it in.

## Validation

- The key works in the target service (verified call).
- No value landed in insecure channels.
- Revocation confirmed on completion.

## Expected Result

Task credentials managed smoothly and without exposure.

## Safety

Risk level: **medium**. Any live or production key is outside this autonomy.

## Procedure

1. Follow the skill rules step by step.
2. Verify each milestone before continuing.
