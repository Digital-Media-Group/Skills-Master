# Despliegue OpenShip por proyecto y entornos

## Propósito

Operar aplicaciones en OpenShip sobre un servidor propio (por ejemplo, Atlas) con un único proyecto y entornos internos separados para `Production` y `Preview`. La skill cubre servicios Docker, PostgreSQL persistente, migración completa desde otro proveedor, backups, promoción, rollback y DNS.

OpenShip no es Dokploy. No se deben usar endpoints, nombres de recursos ni supuestos de Dokploy para operar OpenShip. La skill Dokploy/Swarm sigue siendo válida para Dokploy, pero no sustituye esta integración.

## Cuándo utilizarla

- Cuando una aplicación debe desplegarse en OpenShip/Atlas.
- Cuando se necesitan entornos Preview y Production dentro de un proyecto OpenShip.
- Cuando hay que migrar PostgreSQL y servicios persistentes desde Neon, Vercel u otro proveedor.
- Cuando el despliegue incluye backups, promoción, rollback o Cloudflare.

## Cuándo no utilizarla

- Si el destino real es Dokploy; usa la skill Dokploy/Swarm.
- Si no existe acceso al MCP/panel de OpenShip.
- Si no se conocen el origen de datos, responsables, RPO/RTO o autorización de Production.
- Si no hay backup restaurable para una migración stateful.

## Información necesaria

- Repositorio, rama de integración real (`main` o `master`), rama de trabajo/PR, ramas `preview`/`production` y candidato a promover.
- Workspace, servidor Atlas y permisos del MCP OpenShip.
- Proyecto OpenShip único e IDs internos de sus entornos.
- Variables separadas por entorno y secretos cargados por canal seguro.
- PostgreSQL origen, inventario de tablas, migraciones y relaciones críticas.
- RPO/RTO, destino de backups, retención, dominios, Cloudflare y aprobación de Production.

## Modelo obligatorio

Usa un proyecto único:

```text
EjemploApp
├── Production → rama production
└── Preview    → rama preview
```

El desarrollo ocurre en una rama de trabajo en Ideavo. No escribas directamente en integración (`main` o `master`), `preview` o `production`. Promueve mediante PR aceptado hacia la integración real y autorización separada para Preview y Production. No renombres ramas ni cambies el default para ajustarlos a una receta. El servidor aloja Preview y Production; el modelo no crea entornos por sí mismo.

Un proyecto OpenShip puede tener varios entornos. Cada entorno tiene su propio identificador interno, variables, deployments, dominios y estado. Al desplegar, usa siempre el identificador interno que devuelve OpenShip; no uses el ID del proyecto Production para enviar `environment: preview`.

Solo crea proyectos separados si el contrato de OpenShip exige explícitamente que un entorno no productivo sea otro proyecto. Si ocurre, documenta la excepción y evita duplicar datos o dominios.

## Procedimiento

1. Verifica workspace, servidor Atlas, permisos, salud del host y repositorio.
2. Identifica el proyecto único y los IDs internos de Production y Preview.
3. Comprueba ramas, commit candidato, configuración de build y health check.
4. Configura servicios web, cron/worker y PostgreSQL con volúmenes separados.
5. Crea un backup completo independiente y prueba su restauración.
6. En un traslado inicial autorizado, restaura en un destino aislado de Preview; en una release incremental aplica solo migraciones pendientes ya ensayadas. Verifica esquema, ledger, integridad y smoke tests.
7. Obtén aprobación del candidato y del entorno Production. En una release incremental no restaures ni sobrescribas la base activa; en un traslado inicial sigue el corte autorizado, la copia final y la restauración en un volumen independiente.
8. Promueve el mismo candidato validado, verifica servicios y solo después cambia DNS.

## Acceso y seguridad

- Usa el MCP real de OpenShip y su transporte/autenticación documentados.
- No confundas la identidad `gh-cli` conectada con una GitHub App global.
- Nunca aceptes secretos pegados en el chat ni imprimas objetos completos de env, tokens, dumps, conexiones o backups.
- Usa `requestId` idempotente y precondiciones (`resourceVersion`, `expectedSequence`, `expectedUpdatedAt`) cuando OpenShip las exija.

## Ramas y promoción

- `preview` se despliega desde la rama `preview`.
- `production` se despliega desde la rama `production`.
- Promueve el mismo candidato de código validado. Reutiliza el artefacto inmutable cuando la configuración lo permita. Si hay variables públicas horneadas por entorno, genera imágenes por entorno desde el mismo SHA, lockfile y receta; registra ambos digests y valida su equivalencia. No reutilices una imagen que contenga URLs o claves públicas de otro entorno.
- Orden: validación → build/artifact → Preview → smoke tests → aprobación humana → Production.
- Conserva deployment, datos y configuración anteriores para rollback.

## Servicios y persistencia

Un deployment puede contener `web`, `worker`/`cron` y `postgres`, además de Redis u object storage cuando estén documentados. Cada entorno debe tener volúmenes separados, por ejemplo:

```text
ejemploapp-preview-postgres-data
ejemploapp-production-postgres-data
```

No compartas `DATABASE_URL`, volúmenes, contraseñas, backups restaurados ni datos. En un único servidor no declares alta disponibilidad; compensa el punto único de fallo con backups externos y restore rehearsal.

Si PostgreSQL gestionado exige un cluster privado con dos servidores, no fuerces la operación usando la IP pública. Decide explícitamente entre añadir un nodo, usar PostgreSQL persistente local o un proveedor externo temporal.

## Configuración de build

- Usa el flujo nativo de OpenShip.
- Con `buildKind: dockerfile`, OpenShip debe construir y ejecutar el Dockerfile.
- No pongas `docker build` ni `docker run` dentro de `buildCommand`/`startCommand` salvo autorización explícita de Docker-in-Docker.
- No dependas de GHCR si OpenShip puede construir en Atlas; si usas registry, fija el digest.
- No asumas que OpenShip resuelve `build.target` de Compose; usa servicios explícitos o Dockerfile compatible.
- Configura health check, por ejemplo `/api/health`.

## PostgreSQL y migración completa

Antes de tocar datos identifica origen, clasifica negocio/auth/sesiones, crea una copia verificable y define RPO/RTO/retención/rollback. En Preview crea base y volumen independientes, restaura datos, excluye sesiones/tokens efímeros, verifica tablas/foreign keys/migraciones, aplica solo migraciones faltantes y ejecuta smoke tests. Para Production espera a Preview, congela escrituras, crea backup/delta final, restaura en volumen independiente, aplica migraciones antes del tráfico y conserva el rollback.

Nunca uses `--force`, borres volúmenes o destruyas el origen para resolver errores.

## Backups

- Usa destino externo cifrado con retención; por defecto S3 (Backblaze B2).
- Ejecuta backup manual antes de Preview y Production.
- Registra ID, origen, entorno, tamaño, checksum/estado, retención y hora.
- Realiza restore rehearsal aislado.
- Si no hay evidencia de restauración, bloquea el despliegue stateful.

## Variables y secretos

Mantén variables separadas. No copies `DATABASE_URL` del proveedor anterior: apunta a PostgreSQL interno. Adapta URLs de auth, trusted origins, webhooks, cron y dominios. Si Vercel no permite exportar secretos, rótalos o cárgalos mediante el canal seguro de OpenShip.

## Dominios y Cloudflare

No cambies DNS antes de una URL/health verificable. Protege Preview con Basic Auth/noindex y Production con mantenimiento durante el corte. Cambia solo registros web; conserva MX, SPF, DKIM, DMARC, SES y `api` salvo aprobación explícita. Verifica DNS, TLS, redirects, health, auth, admin, formularios, catálogo, precios, WHMCS y cron.

## Integración continua

Para CI usa workflows nativos independientes de OpenShip o un ejecutor independiente validado en Dokploy según `openship-actions-ci`. No uses GitHub Actions, tampoco runners self-hosted coordinados por GitHub. La CI nunca sustituye los gates de esta skill: backup restaurable, Preview validada y aprobación humana antes de Production.

## Aplicación en Atlas y servicios vinculados en Dokploy

Este es un patrón configurable, no una orden de traslado. Documenta el estado actual y el objetivo aprobado por separado. Si la aplicación todavía vive en Dokploy, moverla a Atlas requiere un plan y autorización de migración propios; no borres ni apagues el origen como parte de una actualización documental.

Mantén en documentos privados del proyecto el inventario por entorno: repositorio/rama/SHA, aplicación, workers, motor de agentes, PostgreSQL/Redis, volúmenes, endpoint lógico, versión/contrato y digest, responsables, backups y restore, CI y triggers, evidencias y gaps. Usa solo ejemplos genéricos en guías públicas; nunca copies hosts internos, IDs, cuentas o secretos del proyecto.

Coordina compatibilidad app/servicios antes de promover: confirma el endpoint real sin imprimir secretos, prueba capacidades observables, fija imágenes por digest y registra el orden de parada, migración y arranque. Una etiqueta de versión coincidente no prueba identidad ni compatibilidad. Una etiqueta mutable no sustituye un digest.

## Migración incremental y cierre de fase

- Reutiliza el protocolo de migraciones de `desarrollo-ideavo-opencode`: ensayo de instalación desde cero y upgrade, ledger y esquema real, segundo pase sin cambios, bloqueo de concurrencia y recuperación ante fallo parcial.
- Antes de una promoción autorizada: backup externo con checksum y restore aislado verificable; candidato, base y entorno inequívocos. El pipeline aplica solo las migraciones pendientes del candidato aprobado antes de habilitar tráfico. No improvises SQL ni cargues seeds de desarrollo en producción.
- Una migración irreversible puede impedir volver al binario antiguo. Documenta compatibilidad expand/contract o recuperación coordinada de datos y aplicación, protección de escrituras posteriores, RPO/RTO y aprobación. Nunca supongas que revertir la imagen revierte la base.
- Cierra cada fase con estado Git, PR y aprobación, SHA/digests, checks observados y pendientes, ledger/migraciones, backup/restore, deployment real o no ejecutado, bloqueos y siguiente acción exacta. Un informe no sustituye evidencia ni autoriza la siguiente fase.
- Revisar o redactar esta guía no ejecuta CI, crea servicios, migra datos, cambia triggers, modifica DNS ni despliega.

## Validación

- Proyecto único e IDs internos de Production/Preview correctos.
- Ramas, commit y deployment trazables.
- PostgreSQL y volúmenes separados.
- Backup y restore rehearsal verificados.
- Migraciones y conteos comprobados.
- Todos los servicios sanos, no solo `web`.
- Preview validada antes de Production.
- DNS/TLS y rollback comprobados.

## Resultado esperado

Un proyecto OpenShip con Production y Preview aislados, datos restaurados y verificados, servicios persistentes respaldados, el mismo candidato promovido, smoke tests verdes, DNS/TLS verificados y rollback practicable.

## Seguridad

Nivel de riesgo: **high**. No guardes secretos en Git, Compose, dumps, imágenes, logs o chat. No declares éxito por HTTP si PostgreSQL/worker fallan. No cambies DNS, destruyas datos ni promuevas Production sin backup restaurable, aprobación explícita y plan de reversa.
