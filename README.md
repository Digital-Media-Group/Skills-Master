# Directorio profesional de skills

Repositorio bilingue y reutilizable de procedimientos operativos para desarrollo web, DevOps y cloud, alojamiento y soporte, marketing digital, y gestión y calidad.

La fuente canonica es neutral respecto al agente. Los adaptadores de `Claude Code` y `OpenAI Codex` se generan desde el mismo contenido para evitar duplicidades.

## Idiomas

- Espanol: los titulos, instrucciones, catálogos y nombres visibles se publican en espanol.
- English: titles, instructions, catalogs, and display names are published in English.
- Los identificadores técnicos (`id`, rutas y etiquetas) permanecen estables y no se traducen.

Cada skill contiene sus versiónes en `locales/es/SKILL.md` y `locales/en/SKILL.md`. Los catálogos se generan por separado en `catalog/es/` y `catalog/en/`.

## Categorías

| ID técnico | Espanol | English |
| --- | --- | --- |
| `web-development` | Desarrollo web | Web Development |
| `devops-cloud` | DevOps y cloud | DevOps and Cloud |
| `hosting-support` | Alojamiento y soporte | Hosting and Support |
| `digital-marketing` | Marketing digital | Digital Marketing |
| `management-quality` | Gestión y calidad | Management and Quality |
| `ide-instructions` | Instrucciones para IDEs | IDE Instructions |

<!-- BEGIN GENERATED SKILLS INDEX -->

## Índice de skills

Copia el nombre técnico o la URL completa para indicarle a un agente qué skill instalar: `instala la skill <id> desde <url>`.

| Skill | ID técnico | Categoría | URL |
| --- | --- | --- | --- |
| Diseño de pipeline CI/CD | `ci-cd-pipeline-design` | DevOps y cloud | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/ci-cd-pipeline-design |
| Revisión de arquitectura cloud | `cloud-architecture-review` | DevOps y cloud | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/cloud-architecture-review |
| Contenerización de una aplicación web | `containerize-web-application` | DevOps y cloud | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/containerize-web-application |
| Plan de medición analítica | `analytics-measurement-plan` | Marketing digital | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/analytics-measurement-plan |
| Auditoría de conversión | `conversion-rate-audit` | Marketing digital | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/conversion-rate-audit |
| Auditoría SEO técnica | `technical-seo-audit` | Marketing digital | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/technical-seo-audit |
| Copias de seguridad y restauracion | `backup-and-restore` | Alojamiento y soporte | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/backup-and-restore |
| Configuración de DNS | `dns-configuration` | Alojamiento y soporte | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/dns-configuration |
| Migración de sitio web | `website-migration` | Alojamiento y soporte | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/website-migration |
| Redacción de instrucciones para agentes | `agent-instructions-authoring` | Instrucciones para IDEs | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/agent-instructions-authoring |
| Auditoría de instrucciones de IDE | `ide-instructions-audit` | Instrucciones para IDEs | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ide-instructions-audit |
| Configuración de instrucciones para Ideavo | `ideavo-instructions-setup` | Instrucciones para IDEs | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ideavo-instructions-setup |
| Discovery de proyecto | `project-discovery` | Gestión y calidad | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/project-discovery |
| Revisión de preparación para release | `release-readiness-review` | Gestión y calidad | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/release-readiness-review |
| Estimación de software | `software-estimation` | Gestión y calidad | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/software-estimation |
| Revisión de diseño de API | `api-design-review` | Desarrollo web | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/api-design-review |
| Desarrollo IDEAVO - OpenCode | `desarrollo-ideavo-opencode` | Desarrollo web | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/desarrollo-ideavo-opencode |
| Auditoria de rendimiento web | `web-performance-audit` | Desarrollo web | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/web-performance-audit |
| Preparación de proyecto web | `web-project-bootstrap` | Desarrollo web | https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/web-project-bootstrap |

<!-- END GENERATED SKILLS INDEX -->

## Uso rapido

```bash
npm install
npm run check
npm run build
```

Los artefactos para agentes se generan en `dist/<adaptador>/<idioma>/`.

## Skill de desarrollo IDEAVO

La skill `desarrollo-ideavo-opencode` define el flujo general para desarrollar con IDEAVO en OpenCode: inspección antes de editar, preservación de cambios ajenos, seguridad, validación proporcional al riesgo, Git, despliegues, observabilidad y formato de entrega.

Fuente: `skills/web-development/desarrollo-ideavo-opencode/`.

## Estructura de una skill

```text
skills/<categoría>/<skill-id>/
|- skill.yaml
|- locales/
|  |- es/SKILL.md
|  `- en/SKILL.md
|- examples/      # opcional
|- references/    # opcional
|- scripts/       # opcional
`- assets/        # opcional
```

Consulta `docs/es/primeros-pasos.md` y `CONTRIBUTING.md` para crear o actualizar una skill.

## Licencia

Apache-2.0. Consulta `LICENSE`.

[Read in English](README.en.md)
