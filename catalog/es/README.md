# Catálogo de skills

Directorio generado desde los metadatos de cada skill. Las rutas y los IDs se conservan.

El estado es el declarado por sus autores. Una fecha de revisión o el estado stable no acreditan una prueba operativa: consulta las evidencias y condiciones de la skill antes de usarla. Este catálogo no concede permisos para ejecutar cambios.

Las vistas por plataforma usan etiquetas explícitas; no certifican compatibilidad. Las skills sin esas etiquetas siguen disponibles por tipo. Las particularidades de cada proyecto deben conservarse en sus instrucciones, sin copiar secretos al catálogo.

## Por tipo de trabajo

- [Desarrollo web](#type-web-development) (4)
- [DevOps y cloud](#type-devops-cloud) (7)
- [Alojamiento y soporte](#type-hosting-support) (3)
- [Marketing digital](#type-digital-marketing) (3)
- [Gestión y calidad](#type-management-quality) (4)
- [Instrucciones para IDEs](#type-ide-instructions) (4)

## Por plataforma

### Ideavo

- [Desarrollo IDEAVO - OpenCode](#desarrollo-ideavo-opencode)
- [Proceso estándar de desarrollo con Ideavo](#proceso-estandar-desarrollo-ideavo)
- [Flujo de ramas en Ideavo](#ideavo-flujo-ramas)
- [Configuración de instrucciones para Ideavo](#ideavo-instructions-setup)

### Atlas / OpenShip

- [CI con OpenShip Actions y runners propios](#openship-actions-ci)
- [Despliegue OpenShip por proyecto y entornos](#openship-project-environments)

### Dokploy

- [Despliegue Dokploy en modo Compose multi-entorno](#dokploy-compose-deployment)
- [Despliegue Dokploy en modo Stack (Swarm)](#dokploy-swarm-stack-deployment)
- [CI con OpenShip Actions y runners propios](#openship-actions-ci)

### Azure

Sin skill catalogada. El procedimiento Azure Container Apps con escalado automático está pendiente de desplegarse y probarse; no se presenta como una integración Atlas/OpenShip.

<a id="type-web-development"></a>

## Desarrollo web

Frontend, backend, APIs, datos, pruebas, accesibilidad y rendimiento.

| Skill | Descripción | Estado declarado | Riesgo |
| --- | --- | --- | --- |
| [Revisión de diseño de API](#api-design-review) | Evaluar una API por consistencia, seguridad, evolucion y experiencia de consumo. | experimental | medium |
| [Desarrollo IDEAVO - OpenCode](#desarrollo-ideavo-opencode) | Flujo general de desarrollo seguro, verificable y gobernado para proyectos trabajados con IDEAVO en OpenCode. | experimental | high |
| [Auditoria de rendimiento web](#web-performance-audit) | Identificar cuellos de botella y proponer mejoras medibles de rendimiento web. | experimental | low |
| [Preparación de proyecto web](#web-project-bootstrap) | Preparar una base web mantenible con decisiones, estructura y controles iniciales. | experimental | low |

<a id="api-design-review"></a>

### Revisión de diseño de API

Evaluar una API por consistencia, seguridad, evolucion y experiencia de consumo.

- ID: `api-design-review` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: medium
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Existe un contrato o propuesta de API para revisar.

**Requisitos**

- Contrato, casos de uso, consumidores, autenticacion y restricciones operativas.

**Resultado esperado**

- Informe priorizado con hallazgos, riesgos y cambios recomendados.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/web-development/api-design-review/locales/es/SKILL.md)

<a id="desarrollo-ideavo-opencode"></a>

### Desarrollo IDEAVO - OpenCode

Flujo general de desarrollo seguro, verificable y gobernado para proyectos trabajados con IDEAVO en OpenCode.

- ID: `desarrollo-ideavo-opencode` · Versión: 0.4.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-11-11
- Plataformas etiquetadas: Ideavo
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Crear una aplicación o servicio, añadir funcionalidad, corregir bugs o refactorizar.
- Modificar interfaces web o añadir autenticación, bases de datos, pagos, colas o almacenamiento.
- Preparar, validar o promover despliegues.
- Revisar rendimiento, accesibilidad, SEO, seguridad o calidad.
- Investigar fallos de CI, GitHub Actions, Vercel, bases de datos o runtime.

**Requisitos**

- Petición del usuario, estado del repositorio, instrucciones locales, stack, comandos de validación, MCP disponibles y restricciones operativas.

**Resultado esperado**

- Cambio implementado con evidencia de validación, riesgos pendientes y estado de entrega claramente documentados.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/web-development/desarrollo-ideavo-opencode/locales/es/SKILL.md)

<a id="web-performance-audit"></a>

### Auditoria de rendimiento web

Identificar cuellos de botella y proponer mejoras medibles de rendimiento web.

- ID: `web-performance-audit` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: low
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Un sitio presenta lentitud o necesita una línea base.

**Requisitos**

- URLs, dispositivos, mercados, analítica disponible y objetivos de rendimiento.

**Resultado esperado**

- Linea base, causas verificadas y plan priorizado con metricas objetivo.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/web-development/web-performance-audit/locales/es/SKILL.md)

<a id="web-project-bootstrap"></a>

### Preparación de proyecto web

Preparar una base web mantenible con decisiones, estructura y controles iniciales.

- ID: `web-project-bootstrap` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: low
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Un proyecto nuevo necesita una base técnica repetible.

**Requisitos**

- Objetivos, usuarios, restricciones, stack aprobado y criterios de entrega.

**Resultado esperado**

- Repositorio inicial, convenciones, comandos verificables y registro de decisiones.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/web-development/web-project-bootstrap/locales/es/SKILL.md)

<a id="type-devops-cloud"></a>

## DevOps y cloud

Entrega continua, infraestructura, contenedores, observabilidad y seguridad cloud.

| Skill | Descripción | Estado declarado | Riesgo |
| --- | --- | --- | --- |
| [Diseño de pipeline CI/CD](#ci-cd-pipeline-design) | Diseñar una entrega automatizada con controles, trazabilidad y recuperación. | experimental | high |
| [Revisión de arquitectura cloud](#cloud-architecture-review) | Evaluar una arquitectura cloud por fiabilidad, seguridad, rendimiento y coste. | experimental | high |
| [Contenerización de una aplicación web](#containerize-web-application) | Crear una imagen reproducible, segura y operable para una aplicación web. | experimental | medium |
| [Despliegue Dokploy en modo Compose multi-entorno](#dokploy-compose-deployment) | Crear, promover y diagnosticar recursos Docker Compose de Dokploy con nombres técnicos explícitos, variables protegidas, dominios y flujo master -> preview -> production. | experimental | high |
| [Despliegue Dokploy en modo Stack (Swarm)](#dokploy-swarm-stack-deployment) | Preparar, promover y diagnosticar stacks Dokploy/Swarm con gates de backup verificable, builds API-only, mantenimiento independiente y bindings site/app. | experimental | high |
| [CI con OpenShip Actions y runners propios](#openship-actions-ci) | Ejecutar validaciones CI en infraestructura propia con OpenShip Actions, en modo independiente o con runners self-hosted para workflows de GitHub, con alternativa endurecida en Dokploy. | experimental | high |
| [Despliegue OpenShip por proyecto y entornos](#openship-project-environments) | Operar proyectos OpenShip con Production y Preview, servicios persistentes, migraciones PostgreSQL, backups verificables, promoción y rollback. | experimental | high |

<a id="ci-cd-pipeline-design"></a>

### Diseño de pipeline CI/CD

Diseñar una entrega automatizada con controles, trazabilidad y recuperación.

- ID: `ci-cd-pipeline-design` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- El proyecto necesita automatizar validación o despliegue.

**Requisitos**

- Repositorios, entornos, riesgos, aprobaciones, pruebas y estrategia de release.

**Resultado esperado**

- Pipeline documentado con etapas, controles, artefactos y rollback.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/devops-cloud/ci-cd-pipeline-design/locales/es/SKILL.md)

<a id="cloud-architecture-review"></a>

### Revisión de arquitectura cloud

Evaluar una arquitectura cloud por fiabilidad, seguridad, rendimiento y coste.

- ID: `cloud-architecture-review` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Existe un diagrama o inventario de la solución.

**Requisitos**

- Arquitectura, cargas, SLO, datos, amenazas, costes y restricciones regulatorias.

**Resultado esperado**

- Evaluacion de riesgos y hoja de ruta priorizada de mejoras.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/devops-cloud/cloud-architecture-review/locales/es/SKILL.md)

<a id="containerize-web-application"></a>

### Contenerización de una aplicación web

Crear una imagen reproducible, segura y operable para una aplicación web.

- ID: `containerize-web-application` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: medium
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- La aplicación tiene un proceso de build y ejecución conocido.

**Requisitos**

- Runtime, comandos, puertos, dependencias, secretos y objetivos de despliegue.

**Resultado esperado**

- Dockerfile validado, exclusiones, documentación y pruebas de ejecución.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/devops-cloud/containerize-web-application/locales/es/SKILL.md)

<a id="dokploy-compose-deployment"></a>

### Despliegue Dokploy en modo Compose multi-entorno

Crear, promover y diagnosticar recursos Docker Compose de Dokploy con nombres técnicos explícitos, variables protegidas, dominios y flujo master -> preview -> production.

- ID: `dokploy-compose-deployment` · Versión: 0.8.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-11-11
- Plataformas etiquetadas: Dokploy
- Dependencias: `containerize-web-application`

**Cuándo utilizarla**

- El servicio se despliega como Docker Compose en Dokploy (`composeType: docker-compose`), con Dockerfile y `docker-compose.yml` compatibles.
- Se trabaja con ramas `master` (desarrollo), `preview` (validación) y `production` (live), y PR de promoción.
- Se necesitan recursos identificables por entorno y dominios Traefik enlazados al servicio web.

**Requisitos**

- Repositorio Git, docker-compose.yml y Dockerfile compatibles.
- Acceso a la API/panel Dokploy y al proyecto/entorno correctos.
- Dominios, variables protegidas, decisión de persistencia y autorización explícita para Production.
- Ramas master (validación) y production (live), con PR de promoción.

**Resultado esperado**

- Recursos Dokploy Docker Compose identificables y aislados por entorno.
- Variables guardadas con quoting dotenv seguro y sin secretos en Git.
- Dominios HTTPS enlazados al servicio web correcto.
- Smoke tests, healthchecks, logs y rollback documentados.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/devops-cloud/dokploy-compose-deployment/locales/es/SKILL.md)

<a id="dokploy-swarm-stack-deployment"></a>

### Despliegue Dokploy en modo Stack (Swarm)

Preparar, promover y diagnosticar stacks Dokploy/Swarm con gates de backup verificable, builds API-only, mantenimiento independiente y bindings site/app.

- ID: `dokploy-swarm-stack-deployment` · Versión: 0.6.2
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-10-24
- Plataformas etiquetadas: Dokploy
- Dependencias: `containerize-web-application`

**Cuándo utilizarla**

- El servicio se despliega como Stack de Dokploy/Swarm (`composeType: stack`), no como Compose simple ni Nixpacks.
- Hay entornos Development, Preview y Production con promoción fail-closed.
- Se necesitan bindings site/app por entorno, backups nativos verificables y diagnóstico de tareas Swarm.

**Requisitos**

- Repositorio Git o snapshot ZIP saneado, Compose Stack y workflow compatibles.
- Acceso a la API/panel Dokploy, stacks aislados, dominios site/app y variables protegidas.
- Registry privado opcional; permisos de publicación y lectura deben comprobarse por separado.
- Decisiones de persistencia, backup/restore, seeds, smoke tests, promoción y aprobación de Production.

**Resultado esperado**

- Stacks Dokploy/Swarm aislados y promovibles Development -> Preview -> Production.
- Builds reproducibles por registry digest o snapshot API-only explícitamente acotado.
- Backup nativo de volumen/backup remoto con evidencia de finalización o restore rehearsal.
- Dos superficies site/app por entorno, enlazadas al servicio completo Swarm.
- Smoke tests, diagnóstico de tareas/logs y rollback documentado.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/devops-cloud/dokploy-swarm-stack-deployment/locales/es/SKILL.md)

<a id="openship-actions-ci"></a>

### CI con OpenShip Actions y runners propios

Ejecutar validaciones CI en infraestructura propia con OpenShip Actions, en modo independiente o con runners self-hosted para workflows de GitHub, con alternativa endurecida en Dokploy.

- ID: `openship-actions-ci` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-10-24
- Plataformas etiquetadas: Atlas / OpenShip, Dokploy
- Dependencias: `ci-cd-pipeline-design`

**Cuándo utilizarla**

- Se necesitan typecheck, lint, tests, build o ensayos de migración en infraestructura propia.
- Hay que documentar o validar un workflow nativo de OpenShip y su relación con la promoción.
- Se evalúa una alternativa independiente en Dokploy sin registrar runners de GitHub.

**Requisitos**

- Instancia OpenShip con Actions (v0.9.0 o superior) verificada en su panel.
- Destino de ejecución con SO, arquitectura y herramientas conocidas.
- Conexión GitHub de la instancia para importar workflows y publicar Checks.
- Política de acceso y aprobaciones por intento de ejecución.

**Resultado esperado**

- Validaciones ejecutadas en infraestructura propia con Checks publicados en GitHub.
- Runners registrados, etiquetados y en estado Ready/Idle.
- Acceso por workflow limitado y aprobaciones registradas.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/devops-cloud/openship-actions-ci/locales/es/SKILL.md)

<a id="openship-project-environments"></a>

### Despliegue OpenShip por proyecto y entornos

Operar proyectos OpenShip con Production y Preview, servicios persistentes, migraciones PostgreSQL, backups verificables, promoción y rollback.

- ID: `openship-project-environments` · Versión: 0.2.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-11-11
- Plataformas etiquetadas: Atlas / OpenShip
- Dependencias: `containerize-web-application`, `ci-cd-pipeline-design`, `openship-actions-ci`

**Cuándo utilizarla**

- Cuando una aplicación debe desplegarse en OpenShip/Atlas.
- Cuando se necesitan entornos Preview y Production dentro de un proyecto OpenShip.
- Cuando hay que migrar PostgreSQL y servicios persistentes desde Neon, Vercel u otro proveedor.
- Cuando el despliegue incluye backups, promoción, rollback o Cloudflare.

**Requisitos**

- Repositorio Git, ramas master/preview/production y Dockerfile o definición de servicios compatible con OpenShip.
- Acceso al MCP de OpenShip y workspace/servidor destino.
- Proyecto OpenShip único con entornos internos; no crear proyectos duplicados para Preview salvo que OpenShip lo exija.
- Inventario de datos, PostgreSQL origen, RPO/RTO, backups, dominios, Cloudflare y aprobación explícita de Production.

**Resultado esperado**

- Un proyecto OpenShip con Production y Preview aislados por entorno.
- Servicios web, workers/cron y PostgreSQL persistente con volúmenes separados.
- Backup completo y restauración de ensayo verificada.
- Promoción del mismo candidato validado y rollback documentado.
- DNS/TLS cambiado solo después de validar la nueva Production.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/devops-cloud/openship-project-environments/locales/es/SKILL.md)

<a id="type-hosting-support"></a>

## Alojamiento y soporte

DNS, servidores, migraciónes, copias de seguridad, correo y soporte técnico.

| Skill | Descripción | Estado declarado | Riesgo |
| --- | --- | --- | --- |
| [Copias de seguridad y restauracion](#backup-and-restore) | Definir y verificar una estrategia de backup basada en objetivos de recuperación. | experimental | high |
| [Configuración de DNS](#dns-configuration) | Planificar y aplicar cambios DNS con validación y recuperación segura. | experimental | high |
| [Migración de sitio web](#website-migration) | Mover un sitio entre entornos reduciendo pérdida de datos y tiempo de inactividad. | experimental | high |

<a id="backup-and-restore"></a>

### Copias de seguridad y restauracion

Definir y verificar una estrategia de backup basada en objetivos de recuperación.

- ID: `backup-and-restore` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Un servicio necesita proteccion o validar su recuperabilidad.

**Requisitos**

- Inventario de datos, RPO, RTO, retencion, cifrado, ubicaciones y responsables.

**Resultado esperado**

- Politica de backup y evidencia de una restauracion probada.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/hosting-support/backup-and-restore/locales/es/SKILL.md)

<a id="dns-configuration"></a>

### Configuración de DNS

Planificar y aplicar cambios DNS con validación y recuperación segura.

- ID: `dns-configuration` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Se necesita crear o modificar registros DNS.

**Requisitos**

- Zona, proveedor, registros actuales, objetivo, TTL y ventana de cambio.

**Resultado esperado**

- Registros aplicados, propagacion verificada y plan de reversa documentado.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/hosting-support/dns-configuration/locales/es/SKILL.md)

<a id="website-migration"></a>

### Migración de sitio web

Mover un sitio entre entornos reduciendo pérdida de datos y tiempo de inactividad.

- ID: `website-migration` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Origen, destino y ventana de migración estan identificados.

**Requisitos**

- Inventario, accesos, datos, DNS, correo, trafico y tolerancia a interrupciones.

**Resultado esperado**

- Sitio migrado, validado, monitorizado y con reversa disponible.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/hosting-support/website-migration/locales/es/SKILL.md)

<a id="type-digital-marketing"></a>

## Marketing digital

SEO, analítica, contenidos, publicidad, conversión y automatizacion.

| Skill | Descripción | Estado declarado | Riesgo |
| --- | --- | --- | --- |
| [Plan de medición analítica](#analytics-measurement-plan) | Convertir objetivos de negocio en eventos, dimensiones, KPI y controles de calidad. | experimental | medium |
| [Auditoría de conversión](#conversion-rate-audit) | Identificar fricciones de conversión y formular experimentos medibles. | experimental | low |
| [Auditoría SEO técnica](#technical-seo-audit) | Detectar barreras técnicas que afectan rastreo, indexacion y rendimiento orgánico. | experimental | low |

<a id="analytics-measurement-plan"></a>

### Plan de medición analítica

Convertir objetivos de negocio en eventos, dimensiones, KPI y controles de calidad.

- ID: `analytics-measurement-plan` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: medium
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Un producto necesita implementar o corregir su medición.

**Requisitos**

- Objetivos, recorrido, conversiones, plataformas, consentimiento y necesidades de reporting.

**Resultado esperado**

- Plan de medición versionado con especificaciones y validación.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/digital-marketing/analytics-measurement-plan/locales/es/SKILL.md)

<a id="conversion-rate-audit"></a>

### Auditoría de conversión

Identificar fricciones de conversión y formular experimentos medibles.

- ID: `conversion-rate-audit` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: low
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Existe un recorrido con trafico y una conversión definida.

**Requisitos**

- Objetivo, embudo, segmentos, analítica, investigacion de usuarios y restricciones.

**Resultado esperado**

- Backlog de hipotesis priorizadas con metricas y diseño de prueba.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/digital-marketing/conversion-rate-audit/locales/es/SKILL.md)

<a id="technical-seo-audit"></a>

### Auditoría SEO técnica

Detectar barreras técnicas que afectan rastreo, indexacion y rendimiento orgánico.

- ID: `technical-seo-audit` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: low
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Un sitio necesita diagnostico SEO o prepara una migración.

**Requisitos**

- Dominio, mercados, CMS, analítica, Search Console, cambios recientes y competidores.

**Resultado esperado**

- Informe priorizado con evidencia, impacto y criterios de validación.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/digital-marketing/technical-seo-audit/locales/es/SKILL.md)

<a id="type-management-quality"></a>

## Gestión y calidad

Discovery, requisitos, estimación, QA, entregas y mejora continua.

| Skill | Descripción | Estado declarado | Riesgo |
| --- | --- | --- | --- |
| [Proceso estándar de desarrollo con Ideavo](#proceso-estandar-desarrollo-ideavo) | Estándar vigente para ejecutar proyectos con Ideavo por fases y bloques, con CI propio, QA real en preview y ventanas de producción gobernadas. | experimental | high |
| [Discovery de proyecto](#project-discovery) | Alinear problema, resultados, alcance, riesgos y plan de validación antes de ejecutar. | experimental | low |
| [Revisión de preparación para release](#release-readiness-review) | Decidir si una release puede avanzar mediante evidencia técnica, operativa y de negocio. | experimental | high |
| [Estimación de software](#software-estimation) | Producir una estimación explicable con rango, supuestos, riesgos y nivel de confianza. | experimental | low |

<a id="proceso-estandar-desarrollo-ideavo"></a>

### Proceso estándar de desarrollo con Ideavo

Estándar vigente para ejecutar proyectos con Ideavo por fases y bloques, con CI propio, QA real en preview y ventanas de producción gobernadas.

- ID: `proceso-estandar-desarrollo-ideavo` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-11-15
- Plataformas etiquetadas: Ideavo
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

Cualquier proyecto desarrollado con Ideavo, nuevo o existente, incluidas correcciones, seguimiento y preparación de releases.

**Requisitos**

- Plan por fases del proyecto, repositorio con ramas master/preview/production, CI propio en Atlas/Dokploy y límites de autonomía aprobados por el propietario.

**Resultado esperado**

- Fases entregadas en producción con PRs mergeados por el operador, CI verde, QA de preview, ventanas documentadas y cierre con evidencia.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/management-quality/proceso-estandar-desarrollo-ideavo/locales/es/SKILL.md)

<a id="project-discovery"></a>

### Discovery de proyecto

Alinear problema, resultados, alcance, riesgos y plan de validación antes de ejecutar.

- ID: `project-discovery` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: low
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Una iniciativa necesita convertir una idea en decisiones verificables.

**Requisitos**

- Contexto de negocio, usuarios, evidencia, restricciones, responsables y plazo.

**Resultado esperado**

- Brief validado, mapa de riesgos, alcance inicial y siguientes decisiones.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/management-quality/project-discovery/locales/es/SKILL.md)

<a id="release-readiness-review"></a>

### Revisión de preparación para release

Decidir si una release puede avanzar mediante evidencia técnica, operativa y de negocio.

- ID: `release-readiness-review` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: high
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Una versión candidata se aproxima a un entorno compartido o producción.

**Requisitos**

- Cambios, pruebas, riesgos, dependencias, observabilidad, soporte y rollback.

**Resultado esperado**

- Decision registrada de avanzar, detener o avanzar con condiciones.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/management-quality/release-readiness-review/locales/es/SKILL.md)

<a id="software-estimation"></a>

### Estimación de software

Producir una estimación explicable con rango, supuestos, riesgos y nivel de confianza.

- ID: `software-estimation` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: low
- Última revisión declarada: 2026-07-25
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Hay suficiente alcance para planificar o comparar alternativas.

**Requisitos**

- Alcance, criterios de aceptacion, arquitectura, equipo, dependencias y restricciones.

**Resultado esperado**

- Rango de esfuerzo o calendario con supuestos y riesgos explicitos.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/management-quality/software-estimation/locales/es/SKILL.md)

<a id="type-ide-instructions"></a>

## Instrucciones para IDEs

Archivos de instrucciones y reglas para IDEs y agentes de codificación como Ideavo, Claude Code y Codex.

| Skill | Descripción | Estado declarado | Riesgo |
| --- | --- | --- | --- |
| [Redacción de instrucciones para agentes](#agent-instructions-authoring) | Escribir un archivo de instrucciones neutral y reutilizable entre IDEs y agentes de codificación. | experimental | low |
| [Auditoría de instrucciones de IDE](#ide-instructions-audit) | Revisar archivos de instrucciones existentes para detectar reglas obsoletas, contradictorias o inseguras. | experimental | medium |
| [Flujo de ramas en Ideavo](#ideavo-flujo-ramas) | Flujo de ramas desarrollo, preview y production en proyectos Ideavo, con tratamiento de ramas de historia disjunta. | experimental | medium |
| [Configuración de instrucciones para Ideavo](#ideavo-instructions-setup) | Crear el archivo de instrucciones de Ideavo con contexto, convenciones y límites del proyecto. | experimental | low |

<a id="agent-instructions-authoring"></a>

### Redacción de instrucciones para agentes

Escribir un archivo de instrucciones neutral y reutilizable entre IDEs y agentes de codificación.

- ID: `agent-instructions-authoring` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: low
- Última revisión declarada: 2026-08-10
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- El equipo usa más de un agente o IDE sobre el mismo repositorio.
- Existen varios archivos de instrucciones con reglas divergentes.
- Se quiere una fuente única de convenciones que cada agente pueda referenciar.

**Requisitos**

- Agentes e IDEs en uso, convenciones del equipo y tareas habituales delegadas al agente.

**Resultado esperado**

- Archivo de instrucciones neutral con reglas verificables y referencias por agente.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/ide-instructions/agent-instructions-authoring/locales/es/SKILL.md)

<a id="ide-instructions-audit"></a>

### Auditoría de instrucciones de IDE

Revisar archivos de instrucciones existentes para detectar reglas obsoletas, contradictorias o inseguras.

- ID: `ide-instructions-audit` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: medium
- Última revisión declarada: 2026-08-10
- Plataformas etiquetadas: Sin etiqueta específica
- Dependencias: `agent-instructions-authoring`

**Cuándo utilizarla**

- El agente incumple convenciones que ya están documentadas.
- El repositorio cambió de stack, comandos o estructura.
- Se sospecha que hay secretos o permisos excesivos en las instrucciones.

**Requisitos**

- Archivos de instrucciones vigentes, estado real del repositorio y incidencias reportadas por el equipo.

**Resultado esperado**

- Informe de hallazgos priorizados con correcciones aplicadas o propuestas.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/ide-instructions/ide-instructions-audit/locales/es/SKILL.md)

<a id="ideavo-flujo-ramas"></a>

### Flujo de ramas en Ideavo

Flujo de ramas desarrollo, preview y production en proyectos Ideavo, con tratamiento de ramas de historia disjunta.

- ID: `ideavo-flujo-ramas` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: medium
- Última revisión declarada: 2026-11-24
- Plataformas etiquetadas: Ideavo
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- Al crear, promover, integrar o limpiar ramas en un proyecto Ideavo cuya rama de trabajo es `desarrollo`.

**Requisitos**

- Repositorio, ramas y SHA vigentes, configuración real de entornos y autoridad del propietario.

**Resultado esperado**

- Flujo de promoción documentado y verificado por versión, con estado de ramas y evidencia de sus gates.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/ide-instructions/ideavo-flujo-ramas/locales/es/SKILL.md)

<a id="ideavo-instructions-setup"></a>

### Configuración de instrucciones para Ideavo

Crear el archivo de instrucciones de Ideavo con contexto, convenciones y límites del proyecto.

- ID: `ideavo-instructions-setup` · Versión: 0.1.0
- Estado declarado: experimental · Riesgo: low
- Última revisión declarada: 2026-08-10
- Plataformas etiquetadas: Ideavo
- Dependencias: Ninguna declarada

**Cuándo utilizarla**

- El repositorio se va a usar con Ideavo y no tiene instrucciones propias.
- Las instrucciones existentes están desactualizadas respecto al proyecto real.
- El equipo repite las mismas correcciones al agente en cada sesión.

**Requisitos**

- Estructura del repositorio, comandos de build y pruebas, convenciones de código y restricciones operativas.

**Resultado esperado**

- Archivo de instrucciones de Ideavo versionado y verificado en el repositorio.

[Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad](../../skills/ide-instructions/ideavo-instructions-setup/locales/es/SKILL.md)
