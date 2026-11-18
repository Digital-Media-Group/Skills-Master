# Proceso estándar de desarrollo con Ideavo

## Fases, sprints y promoción por lotes (revisión 2026-11-18)

Esta sección sustituye cualquier pauta de este documento que permita cerrar con un smoke parcial, publicar cada fase por separado o promover sin la autorización vigente del propietario. No cambia la plataforma de CI, las ramas reales ni las autorizaciones del proyecto.

- Mantén un plan vivo por fases y sprints con dependencias, alcance, PRs y criterios de aceptación. Cada hito debe terminarse y validarse antes de cerrarlo; no cuentes PRs ni commits como funciones entregadas.
- Desarrolla en Ideavo conforme al flujo de ramas aprobado del proyecto. Conserva la sesión y el modelo elegidos. Los cambios documentales no autorizan tocar entornos, datos ni CI.
- Cada hito pasa obligatoriamente por Preview. El 100% significa que TODOS los casos de aceptación definidos para su alcance se han ejecutado y pasan sobre el candidato identificado por SHA exacto. No significa cobertura universal ni ausencia demostrable de cualquier bug.
- La matriz incluye flujos completos, roles y permisos, estados de error, regresiones y, cuando corresponda, varios usuarios, persistencia e integraciones reales de prueba. CI verde, tests con dobles y smokes parciales son evidencias distintas y no sustituyen esa aceptación. El agente ejecuta las pruebas, no se las encarga al propietario.
- Registra por caso resultado, entorno, SHA, fecha y evidencia. Un caso pendiente, fallido o bloqueado impide cerrar el hito como probado. Corrige en desarrollo y repite los casos afectados y sus regresiones en Preview.
- Agrupa una cantidad considerable de PRs terminadas en un lote funcional coherente por dependencias, valor y riesgo, sin inventar un número mínimo. Valida también el conjunto integrado en Preview; la suma de pruebas de PRs aisladas no certifica el lote.
- Antes de producción, fija PRs, SHA y alcance del lote, comprueba CI del candidato, aceptación completa de Preview, copia restaurable y rollback ensayado. Obtén la autorización de promoción exigida para esa versión y entorno. Nunca saltes Preview ni interpretes esta guía como permiso para mergear o desplegar.
- Informa separando código escrito, pruebas locales, CI, aceptación de Preview y producción. Actualiza el plan con lo entregado y lo pendiente, sin porcentajes no medidos. Tras una promoción autorizada, solo verificación operativa mínima en producción, nunca QA funcional allí.

### Carga en todos los proyectos

El archivo de arranque del proyecto (AGENTS.md o equivalente nativo de Ideavo) debe enlazar proceso-estandar-desarrollo-ideavo, desarrollo-ideavo-opencode e ideavo-instructions-setup desde un SHA revisado de Skills-Master. Registra versión, rutas y evidencia de lectura al inicio. Un enlace al catálogo, una copia antigua o un PR abierto no demuestran carga efectiva. Mantén inventario por proyecto con rama real, pin, ruta de arranque y estado: propuesto, fusionado o carga comprobada. Revisa deriva y conflictos antes de actualizar el pin; conserva los límites particulares del propietario.



## Propósito

Entregar fases y sprints con trazabilidad desde la petición hasta la aceptación completa en Preview y la promoción autorizada por lotes. Compilar no acredita funcionamiento.

## Cuándo utilizarla

Cualquier proyecto desarrollado con Ideavo, nuevo o existente, incluidas correcciones, seguimiento y preparación de releases.

## Cuándo no utilizarla

Investigación sin implementación ni ruta de release. Si una instrucción vigente del propietario entra en conflicto, documentar el conflicto y detener la acción afectada.

## Información necesaria

Plan vivo, repositorio, rama de desarrollo e integración reales, protecciones, CI autorizado, Preview aislada y límites de autonomía. No asumir que todas las aplicaciones usan las mismas ramas o plataforma.

## Procedimiento

1. Inventariar alcance, dependencias y aceptación por fases/sprints en docs/project o ruta equivalente.
2. Desarrollar en la sesión y modelo autorizados de Ideavo. Antes de cada prompt verificar rama, SHA, árbol y efecto del autosave. Guardar avances mediante commits y pushes en la rama autorizada; no alterar cambios ajenos.
3. Revisar el diff, secretos, tests y migraciones. Ejecutar gates apropiados al riesgo en el cómputo autorizado por el proyecto, sobre el SHA candidato, sin activar nuevos pipelines.
4. Preparar PR y obtener la aceptación exigida antes de merge o promoción. El documento no sustituye al propietario.
5. Ejecutar toda la matriz del hito y del lote integrado en Preview según la sección inicial. Un bloqueo externo queda como pendiente, nunca como aprobado.
6. Fijar lote, versión, SHA y PRs; comprobar backup con checksum y restauración aislada ensayada, plan de recuperación de aplicación y datos y autorización de destino. Migraciones versionadas y ensayadas desde cero y desde esquema anterior; no improvisar SQL ni confundir rollback de imagen con rollback de datos.
7. Promover solo la versión y entorno autorizados mediante el pipeline aprobado. Si cambia el SHA tras autosave o autocommit, repetir los gates afectados antes de promover. Avisar de apertura y cierre de la ventana.
8. Verificar operativamente el despliegue, registrar evidencia y cerrar recursos temporales autorizados. Actualizar plan, estado, riesgos y siguiente hito sin borrar historia.

## Validación

- Diff revisado, sin secretos ni cambios ajenos; CI del SHA exacto y pruebas apropiadas pasan.
- Todos los casos de aceptación del hito y lote están aprobados en Preview con evidencia.
- Promoción y destino autorizados; backup restaurable y rollback ensayado.
- Estado separado de código, pruebas locales, CI, Preview y producción; sin porcentajes inventados.
- Fuentes cargadas por proyecto comprobadas, no asumidas por enlaces o PRs.

## Resultado esperado

Hitos terminados y probados en Preview, agrupados en entregas coherentes. Producción solo tras su autorización; cualquier pendiente queda visible y no se llama terminado.

## Seguridad

La skill es procedimiento, no autorización. No concede permisos para mergear PRs, desplegar, tocar servidores, secretos, datos, variables de producción, pagos o comunicaciones a terceros. Aplicar los límites del propietario por proyecto, PR, versión y entorno; no deducirlos de otro proyecto ni de un PR anterior. Secretos solo en el gestor autorizado, nunca en chat, logs o archivos versionados. Sin datos reales de producción para QA ni efectos externos reales durante pruebas.

## Compatibilidad con otras propuestas

La guía desarrollo-ideavo-opencode complementa los detalles técnicos y ideavo-instructions-setup cubre el archivo de arranque. Las propuestas abiertas de CI, ramas o una nueva entrada desarrollo-ideavo no se consideran integradas por este cambio. Reconciliarlas por separado sin cambiar CI, infraestructura ni permisos como efecto de esta revisión. El pin de cada proyecto se actualiza con revisión propia; fusionar esta guía no instala automáticamente sus cambios en las aplicaciones.
