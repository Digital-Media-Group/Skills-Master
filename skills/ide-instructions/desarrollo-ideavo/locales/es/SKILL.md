# Desarrollo en Ideavo

## Propósito

Punto de entrada para cualquier trabajo de desarrollo en proyectos gestionados con Ideavo. Resume las reglas de oro y enlaza a la skill específica de cada fase.

## Cuándo utilizarla

Siempre que se trabaje un proyecto Ideavo: nuevas funcionalidades, correcciones, despliegues, migraciones de hosting o gestión de credenciales.

## Reglas de oro

1. Nunca afirmes un estado sin evidencia directa (ver `verificacion-con-evidencia`).
2. Valores de secretos nunca en chat, logs, informes ni repos; van al baúl de credenciales.
3. Nada de escrituras destructivas (borrados de ramas, repos, registros DNS, merges de PR) sin OK explícito del propietario.
4. CI/CD en el propio hosting (Atlas/OpenShip o Dokploy); nunca GitHub Actions.
5. Sin datos de prueba inventados (mock data) en el código.

## Mapa de skills del flujo Ideavo

| Fase | Skill |
| --- | --- |
| Ramas y promoción desarrollo - preview - producción | `ideavo-flujo-ramas` |
| Previews restringidas (dominios y protección de acceso) | `ideavo-previews-restringidas` |
| Reglas de base de datos (Neon, Atlas, Dokploy) | `ideavo-reglas-bd` |
| Claves y credenciales de tarea | `ideavo-claves-tarea` |
| Builds en Atlas/OpenShip (npm, no bun) | `openship-build-npm` (devops-cloud) |
| Entornos de proyecto en OpenShip | `openship-project-environments` (devops-cloud) |
| Despliegue de herramientas en Dokploy | `dokploy-compose-deployment` (devops-cloud) |
| Archivo de instrucciones del proyecto | `ideavo-instructions-setup` |
| Verificación con evidencia | `verificacion-con-evidencia` (management-quality) |

## Cuándo no utilizarla

- Tareas ajenas a proyectos Ideavo (desarrollo local sin despliegue, herramientas internas en Dokploy sin repo Ideavo).

## Información necesaria

- Repositorio del proyecto, entorno de despliegue (Atlas/OpenShip o Dokploy) y autoridad vigente del propietario.

## Procedimiento

1. Identifica la fase (código, rama, preview, despliegue, credenciales).
2. Abre la skill enlazada y sigue su procedimiento.
3. Verifica cada hito con evidencia antes de reportarlo.
4. Reporta por hitos: qué se hizo, fuente de la evidencia, fecha y hora.

## Validación

- Cada fase queda verificada con la evidencia que exige su skill.
- No quedan secretos expuestos ni acciones sin autorizar.

## Resultado esperado

Desarrollo trazable, verificable y sin sorpresas operativas.

## Seguridad

Nivel de riesgo: **medium**. Toca repos, despliegues y credenciales: aplica las reglas de oro y las aprobaciones de cada skill enlazada.
