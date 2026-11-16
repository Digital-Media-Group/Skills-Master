# Ideavo Development

## Purpose

Entry point for any development work on Ideavo-managed projects. Summarizes the golden rules and links to the specific skill for each phase.

## Golden rules

1. Never claim a state without direct evidence (see `verificacion-con-evidencia`).
2. Secret values never in chat, logs, reports, or repos; they go to the credential vault.
3. No destructive writes (branch, repo, or DNS deletions, PR merges) without explicit owner approval.
4. CI/CD on the hosting itself (Atlas/OpenShip or Dokploy); never GitHub Actions.
5. No invented mock data in code.

## Skill map

| Phase | Skill |
| --- | --- |
| Branch flow desarrollo - preview - producción | `ideavo-flujo-ramas` |
| Restricted previews (domains and access protection) | `ideavo-previews-restringidas` |
| Database rules (Neon, Atlas, Dokploy) | `ideavo-reglas-bd` |
| Task keys and credentials | `ideavo-claves-tarea` |
| Atlas/OpenShip builds (npm, not bun) | `openship-build-npm` (devops-cloud) |
| OpenShip project environments | `openship-project-environments` (devops-cloud) |
| Tool deployment on Dokploy | `dokploy-compose-deployment` (devops-cloud) |
| Project instructions file | `ideavo-instructions-setup` |
| Evidence-based verification | `verificacion-con-evidencia` (management-quality) |

## When to Use

- Whenever working an Ideavo project: features, fixes, deployments, hosting migrations, or credential management.

## When Not to Use

- Work unrelated to Ideavo projects (local development without deployment, internal Dokploy tools with no Ideavo repo).

## Required Information

- Project repository, deployment environment (Atlas/OpenShip or Dokploy), and current owner authority.

## Procedure

1. Identify the phase (code, branch, preview, deploy, credentials).
2. Open the linked skill and follow its procedure.
3. Verify each milestone with evidence before reporting it.
4. Report by milestones: what was done, evidence source, date and time.

## Expected Result

Traceable, verifiable development without operational surprises.

## Safety

Risk level: **medium**. Touches repos, deployments, and credentials: apply the golden rules and each linked skill's approvals.

## Validation

- The expected result is checked with direct evidence.
