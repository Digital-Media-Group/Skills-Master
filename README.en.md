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

## AI reading

Use the JSON catalog for selection and the full canonical procedure for execution. Follow the [reading sequence, path resolution and validation limits](docs/en/ai-reading.md). Structural validation alone does not prove semantic understanding or operational compatibility.

<!-- BEGIN GENERATED SKILLS INDEX -->

## Directory by work type

Open the [catalog with skill cards, requirements, results and platform views](catalog/en/README.md). Declared status and review dates do not replace test evidence or grant permission to execute changes.

### Web Development (4)

Frontend, backend, APIs, data, testing, accessibility, and performance.

| Skill | Purpose | ID |
| --- | --- | --- |
| [API Design Review](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/api-design-review) | Assess an API for consistency, security, evolution, and consumer experience. | `api-design-review` |
| [IDEAVO Development - OpenCode](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/desarrollo-ideavo-opencode) | General workflow for safe, verifiable, and governed development with IDEAVO in OpenCode. | `desarrollo-ideavo-opencode` |
| [Web Performance Audit](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/web-performance-audit) | Identify bottlenecks and propose measurable web performance improvements. | `web-performance-audit` |
| [Web Project Bootstrap](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/web-project-bootstrap) | Prepare a maintainable web foundation with initial decisions, structure, and controls. | `web-project-bootstrap` |

### DevOps and Cloud (7)

Continuous delivery, infrastructure, containers, observability, and cloud security.

| Skill | Purpose | ID |
| --- | --- | --- |
| [CI/CD Pipeline Design](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/ci-cd-pipeline-design) | Design automated delivery with controls, traceability, and recovery. | `ci-cd-pipeline-design` |
| [Cloud Architecture Review](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/cloud-architecture-review) | Assess cloud architecture for reliability, security, performance, and cost. | `cloud-architecture-review` |
| [Containerize a Web Application](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/containerize-web-application) | Create a reproducible, secure, and operable image for a web application. | `containerize-web-application` |
| [Dokploy Compose Deployment](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/dokploy-compose-deployment) | Create, promote, and diagnose Dokploy Docker Compose resources with explicit technical names, protected variables, domains, and a master -> preview -> production flow. | `dokploy-compose-deployment` |
| [Dokploy Swarm Stack Deployment](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/dokploy-swarm-stack-deployment) | Prepare, promote, and diagnose Dokploy/Swarm stacks with verifiable backup gates, API-only builds, independent maintenance, and site/app bindings. | `dokploy-swarm-stack-deployment` |
| [CI with OpenShip Actions and Self-Hosted Runners](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/openship-actions-ci) | Run CI validation on own infrastructure with OpenShip Actions, in independent mode or with self-hosted runners for GitHub workflows, with a hardened Dokploy alternative. | `openship-actions-ci` |
| [OpenShip Project and Environment Deployment](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/openship-project-environments) | Operate OpenShip projects with Production and Preview, persistent services, PostgreSQL migrations, verifiable backups, promotion, and rollback. | `openship-project-environments` |

### Hosting and Support (3)

DNS, servers, migrations, backups, email, and technical support.

| Skill | Purpose | ID |
| --- | --- | --- |
| [Backup and Restore](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/backup-and-restore) | Define and verify a backup strategy based on recovery objectives. | `backup-and-restore` |
| [DNS Configuration](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/dns-configuration) | Plan and apply DNS changes with validation and safe recovery. | `dns-configuration` |
| [Website Migration](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/website-migration) | Move a site between environments while minimizing data loss and downtime. | `website-migration` |

### Digital Marketing (3)

SEO, analytics, content, advertising, conversión, and automation.

| Skill | Purpose | ID |
| --- | --- | --- |
| [Analytics Measurement Plan](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/analytics-measurement-plan) | Turn business goals into events, dimensions, KPIs, and quality controls. | `analytics-measurement-plan` |
| [Conversion Rate Audit](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/conversion-rate-audit) | Identify conversion friction and formulate measurable experiments. | `conversion-rate-audit` |
| [Technical SEO Audit](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/technical-seo-audit) | Find technical barriers affecting crawling, indexing, and organic performance. | `technical-seo-audit` |

### Management and Quality (4)

Discovery, requirements, estimation, QA, delivery, and continuous improvement.

| Skill | Purpose | ID |
| --- | --- | --- |
| [Standard development process with Ideavo](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/proceso-estandar-desarrollo-ideavo) | Current standard for running projects with Ideavo in phases and blocks, with own CI, real preview QA, and governed production windows. | `proceso-estandar-desarrollo-ideavo` |
| [Project Discovery](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/project-discovery) | Align the problem, outcomes, scope, risks, and validation plan before execution. | `project-discovery` |
| [Release Readiness Review](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/release-readiness-review) | Decide whether a release can proceed using technical, operational, and business evidence. | `release-readiness-review` |
| [Software Estimation](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/software-estimation) | Produce an explainable estimate with a range, assumptions, risks, and confidence level. | `software-estimation` |

### IDE Instructions (4)

Instruction and rule files for IDEs and coding agents such as Ideavo, Claude Code, and Codex.

| Skill | Purpose | ID |
| --- | --- | --- |
| [Agent Instructions Authoring](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/agent-instructions-authoring) | Write a neutral, reusable instructions file shared across IDEs and coding agents. | `agent-instructions-authoring` |
| [IDE Instructions Audit](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ide-instructions-audit) | Review existing instruction files to detect outdated, contradictory, or unsafe rules. | `ide-instructions-audit` |
| [Branch Flow in Ideavo](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ideavo-flujo-ramas) | Branch flow desarrollo, preview and production in Ideavo projects, including disjoint-history branches. | `ideavo-flujo-ramas` |
| [Ideavo Instructions Setup](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ideavo-instructions-setup) | Create the Ideavo instructions file with project context, conventions, and boundaries. | `ideavo-instructions-setup` |

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
