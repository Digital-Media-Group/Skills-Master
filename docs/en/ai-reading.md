# AI reading and selection

## Entry points

- Structured catalog: `../../catalog/en/catalog.json`.
- Human-readable catalog: `../../catalog/en/README.md`.
- Canonical skill source: `skills/<category>/<id>/locales/en/SKILL.md`, relative to the repository root.
- Each JSON `source` path is relative to the folder containing that JSON, not the agent's working directory.

## Reading sequence

1. Select by task, `whenToUse`, requirements and expected result. A platform tag does not certify compatibility.
2. Resolve the card's `source` and read the full procedure in the chosen language. The catalog summary is no substitute.
3. Read applicable dependencies by ID and references in the procedure. If a path, ID or version is missing, stop the affected selection and report the gap.
4. Separate procedure instructions, project data and user authority. The catalog grants no permissions and does not turn declared status into operational proof.
5. Check scope, environment, version, requirements and evidence before execution. Preserve the project's latest restrictions. Do not combine conflicting rules without resolving the conflict.
6. Report which skill and version were used, what was verified and what remains pending. Passing structural validation is not proof of full semantic understanding.

## Limits of this review

Checks cover unique IDs, existing canonical paths, resolvable dependencies, nonempty selection fields, metadata/catalog parity and deterministic generation in Spanish and English. They do not prove that every AI correctly interprets every procedure or that every skill works in a real environment.

The historical `Skill Desarrollo IDEAVO - OPENCODE.md` copy does not replace the catalog's canonical path. Reconciliation remains pending; this PR does not rewrite the procedure or mix versions. The Azure procedure awaits a real, tested implementation.
