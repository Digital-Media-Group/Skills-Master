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

<!-- BEGIN GENERATED SKILLS INDEX -->

## Skills Index

Copy the technical ID or the full URL to tell an agent which skill to install: `install skill <id> from <url>`.

| Skill | Technical ID | Category | URL |
| --- | --- | --- | --- |
| CI/CD Pipeline Design | `ci-cd-pipeline-design` | DevOps and Cloud | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/ci-cd-pipeline-design |
| Cloud Architecture Review | `cloud-architecture-review` | DevOps and Cloud | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/cloud-architecture-review |
| Containerize a Web Application | `containerize-web-application` | DevOps and Cloud | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/containerize-web-application |
| Dokploy Swarm Stack Deployment | `dokploy-swarm-stack-deployment` | DevOps and Cloud | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/dokploy-swarm-stack-deployment |
| Analytics Measurement Plan | `analytics-measurement-plan` | Digital Marketing | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/analytics-measurement-plan |
| Conversion Rate Audit | `conversion-rate-audit` | Digital Marketing | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/conversion-rate-audit |
| Technical SEO Audit | `technical-seo-audit` | Digital Marketing | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/technical-seo-audit |
| Backup and Restore | `backup-and-restore` | Hosting and Support | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/backup-and-restore |
| DNS Configuration | `dns-configuration` | Hosting and Support | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/dns-configuration |
| Website Migration | `website-migration` | Hosting and Support | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/website-migration |
| Agent Instructions Authoring | `agent-instructions-authoring` | IDE Instructions | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/agent-instructions-authoring |
| IDE Instructions Audit | `ide-instructions-audit` | IDE Instructions | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ide-instructions-audit |
| Ideavo Instructions Setup | `ideavo-instructions-setup` | IDE Instructions | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ideavo-instructions-setup |
| Project Discovery | `project-discovery` | Management and Quality | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/project-discovery |
| Release Readiness Review | `release-readiness-review` | Management and Quality | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/release-readiness-review |
| Software Estimation | `software-estimation` | Management and Quality | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/software-estimation |
| API Design Review | `api-design-review` | Web Development | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/api-design-review |
| IDEAVO Development - OpenCode | `desarrollo-ideavo-opencode` | Web Development | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/desarrollo-ideavo-opencode |
| Web Performance Audit | `web-performance-audit` | Web Development | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/web-performance-audit |
| Web Project Bootstrap | `web-project-bootstrap` | Web Development | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/web-project-bootstrap |

<!-- END GENERATED SKILLS INDEX -->

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
