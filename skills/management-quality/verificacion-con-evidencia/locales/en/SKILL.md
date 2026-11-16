# Evidence-Based Verification

## Purpose

Never claim states without evidence. A "should work" is not a "works".

## Rules

1. Every state claim carries direct evidence: HTTP response, log, screenshot, query, or tool output, with date and time.
2. A green build does not prove the app responds; a 200 response does not prove the content is right.
3. Always distinguish: verified (with evidence), pending (in progress or waiting), and blocked (with the cause).
4. If you cannot verify, say so as unverified and describe the missing check.
5. Third-party evidence (another agent, a message) is context to check, not proof.

## When to Use

- Before reporting any milestone, state, or completion.

## When Not to Use

- Early drafts and exploration where no state is claimed yet.

## Required Information

- The milestone to report and the tool or source to check it with.

## Procedure

1. Before reporting a milestone, run the check that proves it.
2. Keep the evidence (output, screenshot, URL) and cite it in the report.
3. Report by milestones: what was done, evidence, owner, date and time.

## Expected Result

Reports that can be trusted without auditing.

## Safety

Risk level: **low**. Verification and reporting discipline skill.

## Validation

- The expected result is checked with direct evidence.
