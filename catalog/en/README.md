# Skills Catalog

Directory generated from each skill's metadata. Paths and IDs are preserved.

Status is author-declared. A review date or stable status is not evidence of an operational test: check the skill's evidence and conditions before use. This catalog does not grant permission to execute changes.

Platform views use explicit tags; they do not certify compatibility. Skills without these tags remain available by type. Keep project-specific limits in project instructions, without copying secrets into the catalog.

## By work type

- [Web Development](#type-web-development) (4)
- [DevOps and Cloud](#type-devops-cloud) (7)
- [Hosting and Support](#type-hosting-support) (3)
- [Digital Marketing](#type-digital-marketing) (3)
- [Management and Quality](#type-management-quality) (4)
- [IDE Instructions](#type-ide-instructions) (4)

## By platform

### Ideavo

- [IDEAVO Development - OpenCode](#desarrollo-ideavo-opencode)
- [Standard development process with Ideavo](#proceso-estandar-desarrollo-ideavo)
- [Branch Flow in Ideavo](#ideavo-flujo-ramas)
- [Ideavo Instructions Setup](#ideavo-instructions-setup)

### Atlas / OpenShip

- [CI with OpenShip Actions and Self-Hosted Runners](#openship-actions-ci)
- [OpenShip Project and Environment Deployment](#openship-project-environments)

### Dokploy

- [Dokploy Compose Deployment](#dokploy-compose-deployment)
- [Dokploy Swarm Stack Deployment](#dokploy-swarm-stack-deployment)
- [CI with OpenShip Actions and Self-Hosted Runners](#openship-actions-ci)

### Azure

No cataloged skill. The Azure Container Apps autoscaling procedure is pending deployment and testing; it is not presented as an Atlas/OpenShip integration.

<a id="type-web-development"></a>

## Web Development

Frontend, backend, APIs, data, testing, accessibility, and performance.

| Skill | Description | Declared status | Risk |
| --- | --- | --- | --- |
| [API Design Review](#api-design-review) | Assess an API for consistency, security, evolution, and consumer experience. | experimental | medium |
| [IDEAVO Development - OpenCode](#desarrollo-ideavo-opencode) | General workflow for safe, verifiable, and governed development with IDEAVO in OpenCode. | experimental | high |
| [Web Performance Audit](#web-performance-audit) | Identify bottlenecks and propose measurable web performance improvements. | experimental | low |
| [Web Project Bootstrap](#web-project-bootstrap) | Prepare a maintainable web foundation with initial decisions, structure, and controls. | experimental | low |

<a id="api-design-review"></a>

### API Design Review

Assess an API for consistency, security, evolution, and consumer experience.

- ID: `api-design-review` · Version: 0.1.0
- Declared status: experimental · Risk: medium
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- An API contract or proposal is available for review.

**Requirements**

- Contract, use cases, consumers, authentication, and operational constraints.

**Expected result**

- Prioritized report with findings, risks, and recommended changes.

[Open procedure: when to use, steps, validation and safety](../../skills/web-development/api-design-review/locales/en/SKILL.md)

<a id="desarrollo-ideavo-opencode"></a>

### IDEAVO Development - OpenCode

General workflow for safe, verifiable, and governed development with IDEAVO in OpenCode.

- ID: `desarrollo-ideavo-opencode` · Version: 0.4.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-11-11
- Tagged platforms: Ideavo
- Dependencies: None declared

**When to use**

- Create an application or service, add a feature, fix a bug, or refactor code.
- Modify a web interface or add authentication, databases, payments, queues, or storage.
- Prepare, validate, or promote deployments.
- Review performance, accessibility, SEO, security, or quality.
- Investigate CI, GitHub Actions, Vercel, database, or runtime failures.

**Requirements**

- User request, repository state, local instructions, stack, validation commands, available MCPs, and operational constraints.

**Expected result**

- Implemented change with validation evidence, documented remaining risks, and a clearly stated delivery status.

[Open procedure: when to use, steps, validation and safety](../../skills/web-development/desarrollo-ideavo-opencode/locales/en/SKILL.md)

<a id="web-performance-audit"></a>

### Web Performance Audit

Identify bottlenecks and propose measurable web performance improvements.

- ID: `web-performance-audit` · Version: 0.1.0
- Declared status: experimental · Risk: low
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- A site is slow or needs a performance baseline.

**Requirements**

- URLs, devices, markets, available analytics, and performance goals.

**Expected result**

- Baseline, verified causes, and a prioritized plan with target metrics.

[Open procedure: when to use, steps, validation and safety](../../skills/web-development/web-performance-audit/locales/en/SKILL.md)

<a id="web-project-bootstrap"></a>

### Web Project Bootstrap

Prepare a maintainable web foundation with initial decisions, structure, and controls.

- ID: `web-project-bootstrap` · Version: 0.1.0
- Declared status: experimental · Risk: low
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- A new project needs a repeatable technical foundation.

**Requirements**

- Goals, users, constraints, approved stack, and delivery criteria.

**Expected result**

- Initial repository, conventions, verifiable commands, and decision record.

[Open procedure: when to use, steps, validation and safety](../../skills/web-development/web-project-bootstrap/locales/en/SKILL.md)

<a id="type-devops-cloud"></a>

## DevOps and Cloud

Continuous delivery, infrastructure, containers, observability, and cloud security.

| Skill | Description | Declared status | Risk |
| --- | --- | --- | --- |
| [CI/CD Pipeline Design](#ci-cd-pipeline-design) | Design automated delivery with controls, traceability, and recovery. | experimental | high |
| [Cloud Architecture Review](#cloud-architecture-review) | Assess cloud architecture for reliability, security, performance, and cost. | experimental | high |
| [Containerize a Web Application](#containerize-web-application) | Create a reproducible, secure, and operable image for a web application. | experimental | medium |
| [Dokploy Compose Deployment](#dokploy-compose-deployment) | Create, promote, and diagnose Dokploy Docker Compose resources with explicit technical names, protected variables, domains, and a master -> preview -> production flow. | experimental | high |
| [Dokploy Swarm Stack Deployment](#dokploy-swarm-stack-deployment) | Prepare, promote, and diagnose Dokploy/Swarm stacks with verifiable backup gates, API-only builds, independent maintenance, and site/app bindings. | experimental | high |
| [CI with OpenShip Actions and Self-Hosted Runners](#openship-actions-ci) | Run CI validation on own infrastructure with OpenShip Actions, in independent mode or with self-hosted runners for GitHub workflows, with a hardened Dokploy alternative. | experimental | high |
| [OpenShip Project and Environment Deployment](#openship-project-environments) | Operate OpenShip projects with Production and Preview, persistent services, PostgreSQL migrations, verifiable backups, promotion, and rollback. | experimental | high |

<a id="ci-cd-pipeline-design"></a>

### CI/CD Pipeline Design

Design automated delivery with controls, traceability, and recovery.

- ID: `ci-cd-pipeline-design` · Version: 0.1.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- The project needs automated validation or deployment.

**Requirements**

- Repositories, environments, risks, approvals, tests, and release strategy.

**Expected result**

- Documented pipeline with stages, controls, artifacts, and rollback.

[Open procedure: when to use, steps, validation and safety](../../skills/devops-cloud/ci-cd-pipeline-design/locales/en/SKILL.md)

<a id="cloud-architecture-review"></a>

### Cloud Architecture Review

Assess cloud architecture for reliability, security, performance, and cost.

- ID: `cloud-architecture-review` · Version: 0.1.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- A solution diagram or inventory exists.

**Requirements**

- Architecture, workloads, SLOs, data, threats, costs, and regulatory constraints.

**Expected result**

- Risk assessment and prioritized improvement roadmap.

[Open procedure: when to use, steps, validation and safety](../../skills/devops-cloud/cloud-architecture-review/locales/en/SKILL.md)

<a id="containerize-web-application"></a>

### Containerize a Web Application

Create a reproducible, secure, and operable image for a web application.

- ID: `containerize-web-application` · Version: 0.1.0
- Declared status: experimental · Risk: medium
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- The application has known build and run processes.

**Requirements**

- Runtime, commands, ports, dependencies, secrets, and deployment targets.

**Expected result**

- Validated Dockerfile, exclusions, documentation, and runtime tests.

[Open procedure: when to use, steps, validation and safety](../../skills/devops-cloud/containerize-web-application/locales/en/SKILL.md)

<a id="dokploy-compose-deployment"></a>

### Dokploy Compose Deployment

Create, promote, and diagnose Dokploy Docker Compose resources with explicit technical names, protected variables, domains, and a master -> preview -> production flow.

- ID: `dokploy-compose-deployment` · Version: 0.8.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-11-11
- Tagged platforms: Dokploy
- Dependencies: `containerize-web-application`

**When to use**

- The service deploys as Docker Compose in Dokploy (`composeType: docker-compose`), with a compatible Dockerfile and `docker-compose.yml`.
- Work follows `master` (development), `preview` (validation), and `production` (live) branches with a promotion PR.
- Environment-identifiable resources and Traefik domains bound to the web service are required.

**Requirements**

- Git repository, docker-compose.yml, and compatible Dockerfile.
- Dokploy API/panel access and the correct project/environment.
- Domains, protected variables, persistence decision, and explicit Production approval.
- master (validation) and production (live) branches, with a promotion PR.

**Expected result**

- Identifiable Dokploy Docker Compose resources isolated by environment.
- Variables stored with safe dotenv quoting and no secrets committed to Git.
- HTTPS domains bound to the correct web service.
- Documented smoke tests, healthchecks, logs, and rollback.

[Open procedure: when to use, steps, validation and safety](../../skills/devops-cloud/dokploy-compose-deployment/locales/en/SKILL.md)

<a id="dokploy-swarm-stack-deployment"></a>

### Dokploy Swarm Stack Deployment

Prepare, promote, and diagnose Dokploy/Swarm stacks with verifiable backup gates, API-only builds, independent maintenance, and site/app bindings.

- ID: `dokploy-swarm-stack-deployment` · Version: 0.6.2
- Declared status: experimental · Risk: high
- Declared last review: 2026-10-24
- Tagged platforms: Dokploy
- Dependencies: `containerize-web-application`

**When to use**

- The service deploys as a Dokploy/Swarm Stack (`composeType: stack`), not plain Compose or Nixpacks.
- Development, Preview, and Production environments promote fail-closed.
- Per-environment site/app bindings, verifiable native backups, and Swarm task diagnosis are required.

**Requirements**

- Git repository or sanitized ZIP snapshot, compatible Stack Compose, and workflow.
- Dokploy API/panel access, isolated stacks, site/app domains, and protected variables.
- Optional private registry; push and pull permissions must be verified separately.
- Persistence, backup/restore, seed, smoke-test, promotion, and Production approval decisions.

**Expected result**

- Isolated Dokploy/Swarm stacks promotable from Development -> Preview -> Production.
- Reproducible registry-digest builds or explicitly scoped API-only snapshot builds.
- Native volume or remote backups with completion evidence or restore rehearsal.
- Separate site/app surfaces per environment, bound to the full Swarm service.
- Smoke tests, task/log diagnosis, and documented rollback.

[Open procedure: when to use, steps, validation and safety](../../skills/devops-cloud/dokploy-swarm-stack-deployment/locales/en/SKILL.md)

<a id="openship-actions-ci"></a>

### CI with OpenShip Actions and Self-Hosted Runners

Run CI validation on own infrastructure with OpenShip Actions, in independent mode or with self-hosted runners for GitHub workflows, with a hardened Dokploy alternative.

- ID: `openship-actions-ci` · Version: 0.1.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-10-24
- Tagged platforms: Atlas / OpenShip, Dokploy
- Dependencies: `ci-cd-pipeline-design`

**When to use**

- Typecheck, lint, tests, builds, or migration rehearsals need owned infrastructure.
- A native OpenShip workflow and its promotion gates need documentation or validation.
- An independent Dokploy fallback is being assessed without registering GitHub runners.

**Requirements**

- An OpenShip instance with Actions (v0.9.0 or later) verified in its dashboard.
- An execution destination with known OS, architecture, and tooling.
- The instance's GitHub connection for importing workflows and publishing Checks.
- An access policy with per-attempt approvals.

**Expected result**

- Validation running on own infrastructure with Checks published to GitHub.
- Registered, labeled runners in Ready/Idle state.
- Per-workflow limited access and recorded approvals.

[Open procedure: when to use, steps, validation and safety](../../skills/devops-cloud/openship-actions-ci/locales/en/SKILL.md)

<a id="openship-project-environments"></a>

### OpenShip Project and Environment Deployment

Operate OpenShip projects with Production and Preview, persistent services, PostgreSQL migrations, verifiable backups, promotion, and rollback.

- ID: `openship-project-environments` · Version: 0.2.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-11-11
- Tagged platforms: Atlas / OpenShip
- Dependencies: `containerize-web-application`, `ci-cd-pipeline-design`, `openship-actions-ci`

**When to use**

- Deploying an application to OpenShip/Atlas.
- Needing Preview and Production environments within one OpenShip project.
- Migrating PostgreSQL and persistent services from Neon, Vercel, or another provider.
- Operating backups, promotion, rollback, or Cloudflare changes.

**Requirements**

- Git repository, master/preview/production branches, and an OpenShip-compatible Dockerfile or service definition.
- OpenShip MCP access and target workspace/server.
- One OpenShip project with internal environments; do not create duplicate Preview projects unless OpenShip requires it.
- Data inventory, source PostgreSQL, RPO/RTO, backups, domains, Cloudflare, and explicit Production approval.

**Expected result**

- One OpenShip project with isolated Production and Preview environments.
- Web, worker/cron, and persistent PostgreSQL services with environment-specific volumes.
- Full backup and verified restore rehearsal.
- Promotion of the same validated candidate and documented rollback.
- DNS/TLS changed only after the new Production is validated.

[Open procedure: when to use, steps, validation and safety](../../skills/devops-cloud/openship-project-environments/locales/en/SKILL.md)

<a id="type-hosting-support"></a>

## Hosting and Support

DNS, servers, migrations, backups, email, and technical support.

| Skill | Description | Declared status | Risk |
| --- | --- | --- | --- |
| [Backup and Restore](#backup-and-restore) | Define and verify a backup strategy based on recovery objectives. | experimental | high |
| [DNS Configuration](#dns-configuration) | Plan and apply DNS changes with validation and safe recovery. | experimental | high |
| [Website Migration](#website-migration) | Move a site between environments while minimizing data loss and downtime. | experimental | high |

<a id="backup-and-restore"></a>

### Backup and Restore

Define and verify a backup strategy based on recovery objectives.

- ID: `backup-and-restore` · Version: 0.1.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- A service needs protection or recoverability validation.

**Requirements**

- Data inventory, RPO, RTO, retention, encryption, locations, and owners.

**Expected result**

- Backup policy and evidence of a tested restore.

[Open procedure: when to use, steps, validation and safety](../../skills/hosting-support/backup-and-restore/locales/en/SKILL.md)

<a id="dns-configuration"></a>

### DNS Configuration

Plan and apply DNS changes with validation and safe recovery.

- ID: `dns-configuration` · Version: 0.1.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- DNS records must be created or changed.

**Requirements**

- Zone, provider, current records, target, TTL, and change window.

**Expected result**

- Applied records, verified propagation, and documented rollback plan.

[Open procedure: when to use, steps, validation and safety](../../skills/hosting-support/dns-configuration/locales/en/SKILL.md)

<a id="website-migration"></a>

### Website Migration

Move a site between environments while minimizing data loss and downtime.

- ID: `website-migration` · Version: 0.1.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- Source, destination, and migration window are identified.

**Requirements**

- Inventory, access, data, DNS, email, traffic, and downtime tolerance.

**Expected result**

- Migrated, validated, monitored site with rollback available.

[Open procedure: when to use, steps, validation and safety](../../skills/hosting-support/website-migration/locales/en/SKILL.md)

<a id="type-digital-marketing"></a>

## Digital Marketing

SEO, analytics, content, advertising, conversión, and automation.

| Skill | Description | Declared status | Risk |
| --- | --- | --- | --- |
| [Analytics Measurement Plan](#analytics-measurement-plan) | Turn business goals into events, dimensions, KPIs, and quality controls. | experimental | medium |
| [Conversion Rate Audit](#conversion-rate-audit) | Identify conversion friction and formulate measurable experiments. | experimental | low |
| [Technical SEO Audit](#technical-seo-audit) | Find technical barriers affecting crawling, indexing, and organic performance. | experimental | low |

<a id="analytics-measurement-plan"></a>

### Analytics Measurement Plan

Turn business goals into events, dimensions, KPIs, and quality controls.

- ID: `analytics-measurement-plan` · Version: 0.1.0
- Declared status: experimental · Risk: medium
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- A product needs analytics implementation or remediation.

**Requirements**

- Goals, journey, conversions, platforms, consent, and reporting needs.

**Expected result**

- Versioned measurement plan with specifications and validation.

[Open procedure: when to use, steps, validation and safety](../../skills/digital-marketing/analytics-measurement-plan/locales/en/SKILL.md)

<a id="conversion-rate-audit"></a>

### Conversion Rate Audit

Identify conversion friction and formulate measurable experiments.

- ID: `conversion-rate-audit` · Version: 0.1.0
- Declared status: experimental · Risk: low
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- A journey has traffic and a defined conversion.

**Requirements**

- Goal, funnel, segments, analytics, user research, and constraints.

**Expected result**

- Backlog of prioritized hypotheses with metrics and test design.

[Open procedure: when to use, steps, validation and safety](../../skills/digital-marketing/conversion-rate-audit/locales/en/SKILL.md)

<a id="technical-seo-audit"></a>

### Technical SEO Audit

Find technical barriers affecting crawling, indexing, and organic performance.

- ID: `technical-seo-audit` · Version: 0.1.0
- Declared status: experimental · Risk: low
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- A site needs SEO diagnosis or is preparing a migration.

**Requirements**

- Domain, markets, CMS, analytics, Search Console, recent changes, and competitors.

**Expected result**

- Prioritized report with evidence, impact, and validation criteria.

[Open procedure: when to use, steps, validation and safety](../../skills/digital-marketing/technical-seo-audit/locales/en/SKILL.md)

<a id="type-management-quality"></a>

## Management and Quality

Discovery, requirements, estimation, QA, delivery, and continuous improvement.

| Skill | Description | Declared status | Risk |
| --- | --- | --- | --- |
| [Standard development process with Ideavo](#proceso-estandar-desarrollo-ideavo) | Current standard for running projects with Ideavo in phases and blocks, with own CI, real preview QA, and governed production windows. | experimental | high |
| [Project Discovery](#project-discovery) | Align the problem, outcomes, scope, risks, and validation plan before execution. | experimental | low |
| [Release Readiness Review](#release-readiness-review) | Decide whether a release can proceed using technical, operational, and business evidence. | experimental | high |
| [Software Estimation](#software-estimation) | Produce an explainable estimate with a range, assumptions, risks, and confidence level. | experimental | low |

<a id="proceso-estandar-desarrollo-ideavo"></a>

### Standard development process with Ideavo

Current standard for running projects with Ideavo in phases and blocks, with own CI, real preview QA, and governed production windows.

- ID: `proceso-estandar-desarrollo-ideavo` · Version: 0.1.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-11-15
- Tagged platforms: Ideavo
- Dependencies: None declared

**When to use**

Any new or existing Ideavo development project, including fixes, tracking and release preparation.

**Requirements**

- Phased project plan, repository with master/preview/production branches, own CI on Atlas/Dokploy, and owner-approved autonomy limits.

**Expected result**

- Phases delivered to production with operator-merged PRs, green CI, preview QA, documented windows, and evidenced closeout.

[Open procedure: when to use, steps, validation and safety](../../skills/management-quality/proceso-estandar-desarrollo-ideavo/locales/en/SKILL.md)

<a id="project-discovery"></a>

### Project Discovery

Align the problem, outcomes, scope, risks, and validation plan before execution.

- ID: `project-discovery` · Version: 0.1.0
- Declared status: experimental · Risk: low
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- An initiative must turn an idea into verifiable decisions.

**Requirements**

- Business context, users, evidence, constraints, owners, and timeline.

**Expected result**

- Validated brief, risk map, initial scope, and next decisions.

[Open procedure: when to use, steps, validation and safety](../../skills/management-quality/project-discovery/locales/en/SKILL.md)

<a id="release-readiness-review"></a>

### Release Readiness Review

Decide whether a release can proceed using technical, operational, and business evidence.

- ID: `release-readiness-review` · Version: 0.1.0
- Declared status: experimental · Risk: high
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- A release candidate is approaching a shared or production environment.

**Requirements**

- Changes, tests, risks, dependencies, observability, support, and rollback.

**Expected result**

- Recorded go, no-go, or conditional-go decision.

[Open procedure: when to use, steps, validation and safety](../../skills/management-quality/release-readiness-review/locales/en/SKILL.md)

<a id="software-estimation"></a>

### Software Estimation

Produce an explainable estimate with a range, assumptions, risks, and confidence level.

- ID: `software-estimation` · Version: 0.1.0
- Declared status: experimental · Risk: low
- Declared last review: 2026-07-25
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- There is enough scope to plan or compare alternatives.

**Requirements**

- Scope, acceptance criteria, architecture, team, dependencies, and constraints.

**Expected result**

- Effort or schedule range with explicit assumptions and risks.

[Open procedure: when to use, steps, validation and safety](../../skills/management-quality/software-estimation/locales/en/SKILL.md)

<a id="type-ide-instructions"></a>

## IDE Instructions

Instruction and rule files for IDEs and coding agents such as Ideavo, Claude Code, and Codex.

| Skill | Description | Declared status | Risk |
| --- | --- | --- | --- |
| [Agent Instructions Authoring](#agent-instructions-authoring) | Write a neutral, reusable instructions file shared across IDEs and coding agents. | experimental | low |
| [IDE Instructions Audit](#ide-instructions-audit) | Review existing instruction files to detect outdated, contradictory, or unsafe rules. | experimental | medium |
| [Branch Flow in Ideavo](#ideavo-flujo-ramas) | Branch flow desarrollo, preview and production in Ideavo projects, including disjoint-history branches. | experimental | medium |
| [Ideavo Instructions Setup](#ideavo-instructions-setup) | Create the Ideavo instructions file with project context, conventions, and boundaries. | experimental | low |

<a id="agent-instructions-authoring"></a>

### Agent Instructions Authoring

Write a neutral, reusable instructions file shared across IDEs and coding agents.

- ID: `agent-instructions-authoring` · Version: 0.1.0
- Declared status: experimental · Risk: low
- Declared last review: 2026-08-10
- Tagged platforms: No specific tag
- Dependencies: None declared

**When to use**

- The team uses more than one agent or IDE on the same repository.
- Several instruction files exist with diverging rules.
- A single source of conventions is needed for every agent to reference.

**Requirements**

- Agents and IDEs in use, team conventions, and tasks routinely delegated to the agent.

**Expected result**

- Neutral instructions file with verifiable rules and per-agent references.

[Open procedure: when to use, steps, validation and safety](../../skills/ide-instructions/agent-instructions-authoring/locales/en/SKILL.md)

<a id="ide-instructions-audit"></a>

### IDE Instructions Audit

Review existing instruction files to detect outdated, contradictory, or unsafe rules.

- ID: `ide-instructions-audit` · Version: 0.1.0
- Declared status: experimental · Risk: medium
- Declared last review: 2026-08-10
- Tagged platforms: No specific tag
- Dependencies: `agent-instructions-authoring`

**When to use**

- The agent breaks conventions that are already documented.
- The repository changed stack, commands, or structure.
- Secrets or excessive permissions are suspected in the instructions.

**Requirements**

- Current instruction files, actual repository state, and issues reported by the team.

**Expected result**

- Prioritized findings report with applied or proposed corrections.

[Open procedure: when to use, steps, validation and safety](../../skills/ide-instructions/ide-instructions-audit/locales/en/SKILL.md)

<a id="ideavo-flujo-ramas"></a>

### Branch Flow in Ideavo

Branch flow desarrollo, preview and production in Ideavo projects, including disjoint-history branches.

- ID: `ideavo-flujo-ramas` · Version: 0.1.0
- Declared status: experimental · Risk: medium
- Declared last review: 2026-11-24
- Tagged platforms: Ideavo
- Dependencies: None declared

**When to use**

- When creating, promoting, integrating or cleaning branches in an Ideavo project whose working branch is `desarrollo`.

**Requirements**

- Repository, current branches and SHAs, live environment configuration, and owner authority.

**Expected result**

- Documented promotion flow verified per version, with branch status and gate evidence.

[Open procedure: when to use, steps, validation and safety](../../skills/ide-instructions/ideavo-flujo-ramas/locales/en/SKILL.md)

<a id="ideavo-instructions-setup"></a>

### Ideavo Instructions Setup

Create the Ideavo instructions file with project context, conventions, and boundaries.

- ID: `ideavo-instructions-setup` · Version: 0.1.0
- Declared status: experimental · Risk: low
- Declared last review: 2026-08-10
- Tagged platforms: Ideavo
- Dependencies: None declared

**When to use**

- The repository will be used with Ideavo and has no instructions of its own.
- Existing instructions are outdated compared to the actual project.
- The team repeats the same corrections to the agent in every session.

**Requirements**

- Repository structure, build and test commands, code conventions, and operational constraints.

**Expected result**

- Versioned and verified Ideavo instructions file committed to the repository.

[Open procedure: when to use, steps, validation and safety](../../skills/ide-instructions/ideavo-instructions-setup/locales/en/SKILL.md)
