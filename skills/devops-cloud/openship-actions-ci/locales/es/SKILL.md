# CI con OpenShip Actions y runners propios

## Propósito

Preparar y verificar CI en infraestructura propia. GitHub Actions orquesta los workflows; runners propios gestionados por Dokploy ejecutan los jobs en un VPS separado de producción. GitHub aloja código, PRs, eventos, logs y Checks. Este procedimiento sustituye la antigua preferencia por CI independiente de GitHub. El identificador de la skill se conserva por compatibilidad, no define la plataforma que debe orquestar.

## Cuándo utilizarla

- Se necesitan typecheck, lint, tests, build o ensayos de migración en infraestructura propia.
- Hay que inventariar, diseñar o verificar workflows de GitHub Actions con runners propios.
- Se prepara la promoción a Preview sin lanzar CI con cada push de desarrollo.

## Cuándo no utilizarla

- No existe un destino aislado o falta autorización para crear recursos, activar Actions o consumir cómputo remoto.
- El código procede de forks sin revisar o los tests requieren secretos de producción.
- Se pretende que una aprobación documental autorice despliegues, gasto o migraciones.

## Información necesaria

- Repositorio, visibilidad, rama, SHA exacto, workflows, triggers y último run del producto.
- Hosts de CI y producción identificados y distintos; versión, SO, arquitectura, recursos, redes, montajes y herramientas verificados.
- Inventario de runners, labels, grupos y repositorios permitidos. Ready no demuestra que un pipeline funcione.
- Permisos mínimos de GITHUB_TOKEN y credenciales, por job; aprobaciones de Environment y controles de rama.
- Concurrencia, límites de tiempo y recursos, costes de servidor y servicios, artefactos, retención y limpieza.
- Relación explícita entre PR, CI y despliegue; Auto Deploy, webhooks, proveedor real de despliegue y gates por entorno.

## Procedimiento

1. En lectura, inventaría workflows, triggers, runners, destinos, permisos, secretos referenciados sin mostrar valores, runs y controles de despliegue. Distingue disponible, configurado y validado. No presupongas que otro proyecto replica este modelo.
2. Prepara cambios en `.github/workflows/` en rama de trabajo. Los disparadores automáticos de validación son `pull_request` hacia `preview` y `push` a `preview`, ajustando el nombre real de la rama mediante evidencia. No añadas push genérico de desarrollo ni PR a main/master como disparador automático de CI. Un PR abierto hacia Preview se vuelve a validar con `synchronize`; explícalo, no prometas una sola ejecución. Los gates manuales de producción son separados.
3. Documenta etapas: preflight de rama/SHA -> validación del candidato -> tests e integración aislados -> build -> evidencia. Usa concurrencia por PR/ref, cancelación de runs obsoletos solo donde sea segura, filtros de paths justificados y timeouts. No debilites gates por ahorrar ejecuciones.
4. Diseña un dominio candidato sin secretos ni acceso de Preview/Production. Prefiere runners efímeros de un job con workspace y volúmenes nuevos; verifica borrado y retirada del registro. Un listener persistente o un contenedor reiniciado no equivale a efímero. El controlador de registro no expone sus credenciales al job.
5. Separa el dominio de producción: host o VM y credenciales distintos del candidato, labels/grupos y repositorios restringidos, Environment protegido y aprobación explícita. Labels distintos en el mismo runner persistente no aíslan confianza. Ejecuta herramientas revisadas y un artefacto/digest del SHA autorizado, no scripts candidatos arbitrarios con secretos de producción. No cambies esta ruta solo por actualizar documentación.
6. Usa bases desechables sin datos de producción para instalación inicial, upgrade y segundo pase. Conserva logs y ledger sin secretos. Nunca ensayes contra la base que sirve tráfico.
7. Antes de activar Actions, registrar runners, crear VPS o ejecutar jobs remotos, presenta host, coste, aislamiento, workflows y rollback y recupera el OK correspondiente. Una autorización de lectura o documentación no basta. No habilites Auto Deploy ni webhooks como efecto lateral.
8. Tras autorización, ejecuta un diagnóstico del SHA exacto y registra orquestador, destino, runner, run, artefacto/digest, resultados, recursos y limpieza. Un Check de otro SHA, un run omitido o en cola no es verde. El fallo bloquea la promoción; no lo ocultes cambiando código o tests.

## Aislamiento en Dokploy

- VPS de CI separado de producción; sin redes de apps, modo privilegiado, red host, socket Docker real del host ni montajes fuera del job. Si el build necesita otra capacidad, presenta un diseño aprobado antes de ampliar permisos.
- Sin secretos de producción ni credenciales de despliegue en jobs candidatos. Permisos de token mínimos y dependencias de workflows fijadas y revisadas.
- Egress limitado a destinos necesarios; una red bridge no es aislamiento total ni prueba de firewall. Verifica reglas reales, no solo el compose.
- Cola y un job por recurso limitado al inicio, timeout, límites CPU/RAM/disco, retención acotada y logs sin secretos.
- El código de PR puede comprometer un runner propio. Bloquea forks sin revisar y verifica la política según visibilidad y actores permitidos antes de activarlo.
- GitHub no cobra ejecución de runner propio según su política aplicable, pero VPS, almacenamiento, artefactos, caché y servicios externos pueden costar dinero. Verifica precio y condiciones actuales; no describas todo el sistema como gratis.

## Validación

- GitHub Actions orquesta; el runner propio gestionado por Dokploy y el host separado están comprobados.
- Los triggers reales cumplen la política aprobada; las diferencias de un proyecto existente quedan registradas sin cambiarlas por inferencia.
- El run autorizado del SHA exacto completa todos los gates; Ready no significa probado.
- Datos, bases, permisos y dominios candidato/producción están separados y la limpieza está verificada.
- Artefactos, resultados, aprobación, copia y rollback se comprueban antes de cada promoción que los requiera.
- Si faltan acceso, ejecutor validado o autorización, el estado es pendiente y no se promueve.

## Resultado esperado

Plan de CI o CI verificado, claramente diferenciados, con SHA, host, runner, run, resultados, artefactos, coste, aprobaciones y límites. La documentación no equivale a un pipeline instalado o ejecutado.

## Seguridad

Nivel de riesgo: **high**. Mantén forks sin revisar bloqueados. No amplíes permisos, expongas secretos ni uses datos de producción para tests. Los cambios de servidores, gasto, merge y producción necesitan su autorización. Una prueba fallida bloquea la promoción y nunca justifica eludir el control.
