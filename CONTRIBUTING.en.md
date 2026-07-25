# Contributing

## Principles

- Maintain one agent-neutral source of truth.
- Publish every visible title and content block in Spanish and English.
- Do not translate IDs, paths, tags, or tool names.
- Document risks, preconditions, validation, and stop conditions.
- Never include secrets, customer data, or unguarded destructive instructions.

## Create a Skill

1. Copy `templates/skill/` to `skills/<category>/<skill-id>/`.
2. Use a stable kebab-case `skill-id`.
3. Complete `skill.yaml` with Spanish and English names and summaries.
4. Write `locales/es/SKILL.md` with Spanish headings.
5. Write `locales/en/SKILL.md` with English headings.
6. Run `npm run check`.
7. Generate catalogs and adapters with `npm run build`.

## Minimum Quality

The skill must be actionable, verifiable, safe, portable, and functionally equivalent in both languages. See `docs/en/review-checklist.md`.
