# Professional Skills Directory

A bilingual, reusable repository of operational procedures for web development, DevOps and cloud, hosting and support, digital marketing, and management and quality.

The canonical source is agent-neutral. `Claude Code` and `OpenAI Codex` adapters are generated from the same content to prevent duplication.

## Languages

- Espanol: titulos, instrucciones, catalogos y nombres visibles se publican en espanol.
- English: titles, instructions, catalogs, and display names are published in English.
- Technical identifiers (`id`, paths, and tags) remain stable and are not translated.

Each skill contains `locales/es/SKILL.md` and `locales/en/SKILL.md`. Catalogs are generated separately under `catalog/es/` and `catalog/en/`.

## Categories

| Technical ID | Espanol | English |
| --- | --- | --- |
| `web-development` | Desarrollo web | Web Development |
| `devops-cloud` | DevOps y cloud | DevOps and Cloud |
| `hosting-support` | Alojamiento y soporte | Hosting and Support |
| `digital-marketing` | Marketing digital | Digital Marketing |
| `management-quality` | Gestion y calidad | Management and Quality |
| `ide-instructions` | Instrucciones para IDEs | IDE Instructions |

## Quick Start

```bash
npm install
npm run check
npm run build
```

Agent artifacts are generated under `dist/<adapter>/<locale>/`.

## IDEAVO Development Skill

The `desarrollo-ideavo-opencode` skill defines the general workflow for development with IDEAVO in OpenCode: inspect before editing, preserve unrelated changes, apply security controls, validate according to risk, and document Git, deployment, observability, and delivery status.

Source: `skills/web-development/desarrollo-ideavo-opencode/`.

## Skill Structure

```text
skills/<category>/<skill-id>/
|- skill.yaml
|- locales/
|  |- es/SKILL.md
|  `- en/SKILL.md
|- examples/      # optional
|- references/    # optional
|- scripts/       # optional
`- assets/        # optional
```

See `docs/en/getting-started.md` and `CONTRIBUTING.en.md` to create or update a skill.

## License

Apache-2.0. See `LICENSE`.

[Leer en espanol](README.md)
