# Configuración de instrucciones para Ideavo

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

Crear el archivo de instrucciones de Ideavo con contexto, convenciones y límites del proyecto, para que el agente trabaje con las mismas reglas que el equipo.

## Cuándo utilizarla

- El repositorio se va a usar con Ideavo y no tiene instrucciones propias.
- Las instrucciones existentes están desactualizadas respecto al proyecto real.
- El equipo repite las mismas correcciones al agente en cada sesión.

## Cuándo no utilizarla

- El proyecto no tiene aún estructura, comandos ni convenciones estables.
- Solo se necesita una instrucción puntual para una tarea concreta.
- La configuración pertenece a otro agente y ya existe una skill específica.

## Información necesaria

- Estructura del repositorio, comandos de build y pruebas, convenciones de código y restricciones operativas.
- Rutas que el agente no debe modificar y acciones que requieren aprobación humana.
- Idioma de trabajo y formato esperado de commits y mensajes.

## Procedimiento

1. Inventaría estructura, stack, comandos de instalación, build, pruebas y linting.
2. Reúne las convenciones vigentes de código, nombres, ramas y commits.
3. Redacta el archivo de instrucciones con secciones cortas: contexto, comandos, convenciones, límites y criterios de aceptación.
4. Declara de forma explícita rutas protegidas, secretos y operaciones que exigen aprobación.
5. Elimina información duplicada que ya viva en README o documentación enlazable.
6. Valida el archivo con una tarea real y ajusta las instrucciones que el agente ignore o malinterprete.

## Validación

- Cada comando indicado en el archivo se ejecuta correctamente en un entorno limpio.
- Una tarea de prueba se completa sin correcciones manuales sobre convenciones ya documentadas.
- No hay credenciales ni datos sensibles en el archivo de instrucciones.

## Resultado esperado

Archivo de instrucciones de Ideavo versionado y verificado en el repositorio.

## Seguridad

Nivel de riesgo: **low**. No incluyas secretos, tokens ni rutas internas sensibles. Declara explícitamente qué operaciones requieren aprobación humana antes de ejecutarse.
