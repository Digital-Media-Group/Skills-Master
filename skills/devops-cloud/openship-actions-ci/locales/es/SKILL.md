# CI con OpenShip Actions y runners propios

## Propósito

Preparar y verificar CI independiente en infraestructura propia. Usa workflows nativos de OpenShip/Atlas como vía preferente y un ejecutor independiente aislado en Dokploy solo cuando esté disponible y validado. GitHub aloja código, PRs, eventos y Checks; no orquesta ni ejecuta los jobs. GitHub Actions alojado y self-hosted quedan fuera de este procedimiento.

## Cuándo utilizarla

- Se necesitan typecheck, lint, tests, build o ensayos de migración en infraestructura propia.
- Hay que documentar o validar un workflow nativo de OpenShip y su relación con la promoción.
- Se evalúa una alternativa independiente en Dokploy sin registrar runners de GitHub.

## Cuándo no utilizarla

- Se pretende registrar un runner de GitHub Actions o ejecutar un workflow coordinado por GitHub.
- No existe un destino aislado o no se ha autorizado el consumo de cómputo remoto.
- El código procede de forks sin revisar o requiere secretos de producción para ejecutar tests.

## Información necesaria

- Capacidades actuales de la instancia, versión, SO, arquitectura y herramientas verificadas. La versión o un runner Ready no demuestran que el pipeline del producto funcione.
- Repositorio, rama de trabajo, SHA exacto, workflow nativo, destino y evidencia del último run de ese producto.
- Identidad de publicación de Checks con permisos mínimos; no usar credenciales de despliegue en jobs de pruebas.
- Política de aprobación por intento, concurrencia, límites de tiempo y recursos, artefactos y retención.
- Relación explícita entre PR, CI y despliegue; estado real de Auto Deploy, webhook y reglas de promoción.

## Procedimiento

1. En lectura, inventaría workflows asociados al producto, runners, capacidades, ejecuciones y controles de despliegue. Distingue disponible, configurado y validado. Si no hay workflow enlazado o run verificable, registra pendiente; no declares CI operativo.
2. Prepara un workflow nativo independiente en `.openship/workflows/` o en la configuración nativa de la instancia, según sus capacidades verificadas. La sintaxis YAML similar a GitHub no cambia quién orquesta los jobs. No reutilices `.github/workflows/` como ejecución de GitHub ni actives runners self-hosted de GitHub.
3. Documenta etapas y dependencias: preflight de rama/SHA -> validaciones locales del candidato -> tests e integración aislados -> build -> evidencia. La promoción es un paso separado sujeto a aceptación del PR y autorización de entorno.
4. Usa bases desechables sin datos de producción para instalación inicial, upgrade y segundo pase de migraciones. Conserva logs y ledger sin secretos. No ejecutes el ensayo contra la base que sirve tráfico.
5. Limita acceso y aprobaciones por actor, SHA, intento y destino; usa cola y bloqueo para impedir promociones concurrentes. Un Check de un SHA anterior, un run omitido o una cola pendiente no es un gate verde.
6. Solo tras autorización ejecuta el diagnóstico o pipeline. Registra plataforma que orquesta y destino que ejecuta, SHA, run, artefacto/digest, resultados y límites. Detén la promoción ante fallo; no cambies código para ocultar fallos de infraestructura.
7. Publica Checks como evidencia cuando exista una integración autorizada. Publicar un Check no requiere ejecutar GitHub Actions. No habilites Auto Deploy ni webhooks como efecto de configurar CI.

## Alternativa endurecida en Dokploy

No presupongas que existe un servicio de CI porque existe un proyecto con ese nombre. Verifica un ejecutor independiente, sin coordinación de GitHub Actions, su cola, contrato de jobs, aislamiento, permisos, límites y evidencia de diagnóstico. Si falta, documenta el gap y pide aprobación de implementación; no inventes endpoints ni registres un runner de GitHub.

- Contenedores desechables, sin `privileged`, red host, socket Docker del host, redes de aplicaciones ni volúmenes externos al job. Si un build requiere otra capacidad, detente y presenta un diseño de aislamiento aprobado; no amplíes permisos silenciosamente.
- Credenciales y bases de CI efímeras, sin secretos de Preview/Production ni acceso a despliegues.
- Un job activo por recurso limitado, timeout, limpieza verificable y logs sin secretos.
- La guía documental no crea el ejecutor, no activa triggers y no autoriza cómputo remoto.

## Validación

- La plataforma de orquestación es nativa OpenShip o independiente Dokploy, nunca GitHub Actions.
- El workflow está asociado al producto y un run autorizado del SHA exacto terminó con todos los gates aplicables, sin confundir Ready con probado.
- Los tests de migración usan datos y base aislados; las aprobaciones, artefactos y resultados quedan registrados.
- Auto Deploy, webhooks y gates de promoción se comprueban por entorno; no se modifican sin autorización.
- Si falta acceso o un ejecutor validado, el resultado queda pendiente y no se promueve.

## Resultado esperado

Plan de CI o CI verificado, claramente diferenciados, con trazabilidad de SHA, run, resultados, artefactos y aprobaciones. La documentación no equivale a un pipeline instalado o ejecutado.

## Seguridad

Nivel de riesgo: **high**. No ejecutes jobs remotos, despliegues ni migraciones por una aprobación documental. Mantén forks sin revisar bloqueados. No amplíes permisos, expongas secretos ni uses datos de producción para tests. Una prueba fallida bloquea la promoción, no justifica eludir el control.
