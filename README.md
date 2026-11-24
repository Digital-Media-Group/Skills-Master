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

## Lectura por IA

Usa el catálogo JSON para seleccionar y el procedimiento canónico completo para ejecutar. Sigue la [secuencia de lectura, resolución de rutas y límites de validación](docs/es/lectura-ia.md). La validación estructural no demuestra por sí sola comprensión semántica ni compatibilidad operativa.

<!-- BEGIN GENERATED SKILLS INDEX -->

## Directorio por tipos de trabajo

Abre el [catálogo con fichas, requisitos, resultados y vistas por plataforma](catalog/es/README.md). El estado declarado y la fecha de revisión no sustituyen evidencia de pruebas ni conceden permiso para ejecutar cambios.

### Desarrollo web (4)

Frontend, backend, APIs, datos, pruebas, accesibilidad y rendimiento.

| Skill | Para qué sirve | ID |
| --- | --- | --- |
| [Revisión de diseño de API](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/api-design-review) | Evaluar una API por consistencia, seguridad, evolucion y experiencia de consumo. | `api-design-review` |
| [Desarrollo IDEAVO - OpenCode](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/desarrollo-ideavo-opencode) | Flujo general de desarrollo seguro, verificable y gobernado para proyectos trabajados con IDEAVO en OpenCode. | `desarrollo-ideavo-opencode` |
| [Auditoria de rendimiento web](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/web-performance-audit) | Identificar cuellos de botella y proponer mejoras medibles de rendimiento web. | `web-performance-audit` |
| [Preparación de proyecto web](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/web-development/web-project-bootstrap) | Preparar una base web mantenible con decisiones, estructura y controles iniciales. | `web-project-bootstrap` |

### DevOps y cloud (7)

Entrega continua, infraestructura, contenedores, observabilidad y seguridad cloud.

| Skill | Para qué sirve | ID |
| --- | --- | --- |
| [Diseño de pipeline CI/CD](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/ci-cd-pipeline-design) | Diseñar una entrega automatizada con controles, trazabilidad y recuperación. | `ci-cd-pipeline-design` |
| [Revisión de arquitectura cloud](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/cloud-architecture-review) | Evaluar una arquitectura cloud por fiabilidad, seguridad, rendimiento y coste. | `cloud-architecture-review` |
| [Contenerización de una aplicación web](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/containerize-web-application) | Crear una imagen reproducible, segura y operable para una aplicación web. | `containerize-web-application` |
| [Despliegue Dokploy en modo Compose multi-entorno](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/dokploy-compose-deployment) | Crear, promover y diagnosticar recursos Docker Compose de Dokploy con nombres técnicos explícitos, variables protegidas, dominios y flujo master -> preview -> production. | `dokploy-compose-deployment` |
| [Despliegue Dokploy en modo Stack (Swarm)](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/dokploy-swarm-stack-deployment) | Preparar, promover y diagnosticar stacks Dokploy/Swarm con gates de backup verificable, builds API-only, mantenimiento independiente y bindings site/app. | `dokploy-swarm-stack-deployment` |
| [CI con OpenShip Actions y runners propios](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/openship-actions-ci) | Ejecutar validaciones CI en infraestructura propia con OpenShip Actions, en modo independiente o con runners self-hosted para workflows de GitHub, con alternativa endurecida en Dokploy. | `openship-actions-ci` |
| [Despliegue OpenShip por proyecto y entornos](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/devops-cloud/openship-project-environments) | Operar proyectos OpenShip con Production y Preview, servicios persistentes, migraciones PostgreSQL, backups verificables, promoción y rollback. | `openship-project-environments` |

### Alojamiento y soporte (3)

DNS, servidores, migraciónes, copias de seguridad, correo y soporte técnico.

| Skill | Para qué sirve | ID |
| --- | --- | --- |
| [Copias de seguridad y restauracion](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/backup-and-restore) | Definir y verificar una estrategia de backup basada en objetivos de recuperación. | `backup-and-restore` |
| [Configuración de DNS](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/dns-configuration) | Planificar y aplicar cambios DNS con validación y recuperación segura. | `dns-configuration` |
| [Migración de sitio web](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/hosting-support/website-migration) | Mover un sitio entre entornos reduciendo pérdida de datos y tiempo de inactividad. | `website-migration` |

### Marketing digital (3)

SEO, analítica, contenidos, publicidad, conversión y automatizacion.

| Skill | Para qué sirve | ID |
| --- | --- | --- |
| [Plan de medición analítica](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/analytics-measurement-plan) | Convertir objetivos de negocio en eventos, dimensiones, KPI y controles de calidad. | `analytics-measurement-plan` |
| [Auditoría de conversión](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/conversion-rate-audit) | Identificar fricciones de conversión y formular experimentos medibles. | `conversion-rate-audit` |
| [Auditoría SEO técnica](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/digital-marketing/technical-seo-audit) | Detectar barreras técnicas que afectan rastreo, indexacion y rendimiento orgánico. | `technical-seo-audit` |

### Gestión y calidad (4)

Discovery, requisitos, estimación, QA, entregas y mejora continua.

| Skill | Para qué sirve | ID |
| --- | --- | --- |
| [Proceso estándar de desarrollo con Ideavo](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/proceso-estandar-desarrollo-ideavo) | Estándar vigente para ejecutar proyectos con Ideavo por fases y bloques, con CI propio, QA real en preview y ventanas de producción gobernadas. | `proceso-estandar-desarrollo-ideavo` |
| [Discovery de proyecto](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/project-discovery) | Alinear problema, resultados, alcance, riesgos y plan de validación antes de ejecutar. | `project-discovery` |
| [Revisión de preparación para release](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/release-readiness-review) | Decidir si una release puede avanzar mediante evidencia técnica, operativa y de negocio. | `release-readiness-review` |
| [Estimación de software](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/management-quality/software-estimation) | Producir una estimación explicable con rango, supuestos, riesgos y nivel de confianza. | `software-estimation` |

### Instrucciones para IDEs (4)

Archivos de instrucciones y reglas para IDEs y agentes de codificación como Ideavo, Claude Code y Codex.

| Skill | Para qué sirve | ID |
| --- | --- | --- |
| [Redacción de instrucciones para agentes](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/agent-instructions-authoring) | Escribir un archivo de instrucciones neutral y reutilizable entre IDEs y agentes de codificación. | `agent-instructions-authoring` |
| [Auditoría de instrucciones de IDE](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ide-instructions-audit) | Revisar archivos de instrucciones existentes para detectar reglas obsoletas, contradictorias o inseguras. | `ide-instructions-audit` |
| [Flujo de ramas en Ideavo](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ideavo-flujo-ramas) | Flujo de ramas desarrollo, preview y production en proyectos Ideavo, con tratamiento de ramas de historia disjunta. | `ideavo-flujo-ramas` |
| [Configuración de instrucciones para Ideavo](https://github.com/Digital-Media-Group/Skills-Master/tree/main/skills/ide-instructions/ideavo-instructions-setup) | Crear el archivo de instrucciones de Ideavo con contexto, convenciones y límites del proyecto. | `ideavo-instructions-setup` |

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
