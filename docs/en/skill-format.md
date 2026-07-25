# Skill Format

A skill combines agent-neutral metadata in `skill.yaml` with localized documents under `locales/es/` and `locales/en/`.

## Identity and Language Separation

- `id`, `category`, `tags`, and dependencies are stable technical identifiers.
- `name` and `summary` contain `es` and `en` values.
- Each localized document uses natural headings for its language.
- Catalogs and adapters are generated per locale.

## Required English Sections

`Purpose`, `When to Use`, `When Not to Use`, `Required Information`, `Procedure`, `Validation`, `Expected Result`, and `Safety`.
