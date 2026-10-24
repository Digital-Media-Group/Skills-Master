# Despliegue Dokploy en modo Compose multi-entorno

## Propósito

Crear, promover y diagnosticar recursos Docker Compose de Dokploy con nombres técnicos explícitos, variables protegidas, dominios HTTPS enlazados al servicio correcto y un flujo de promoción master -> production con aprobación humana. Dokploy construye la imagen al recibir el push en la rama configurada; el despliegue no depende de una CI externa.

## Cuándo utilizarla

- El servicio se despliega como Docker Compose en Dokploy (`composeType: docker-compose`), con Dockerfile y `docker-compose.yml` compatibles.
- Se trabaja con ramas `master` (validación) y `production` (live) y PR de promoción.
- Se necesitan recursos identificables por entorno y dominios Traefik enlazados al servicio web.

## Cuándo no utilizarla

- El destino es un Stack Swarm: usa la skill `dokploy-swarm-stack-deployment`.
- El destino es OpenShip/Atlas: usa la skill `openship-project-environments`.
- No hay autorización explícita de Production ni backup verificable para servicios con estado.

## Información necesaria

- Repositorio Git, `docker-compose.yml` y Dockerfile compatibles.
- Acceso a la API/panel de Dokploy y al proyecto y entorno correctos (la organización activa de sesión determina qué proyectos son visibles).
- Dominios, variables protegidas, decisión de persistencia y autorización explícita para Production.
- Ramas `master` (validación) y `production` (live), con PR de promoción.

## Procedimiento

1. Crea el recurso Compose con `composeType: docker-compose` y un `appName` técnico explícito por entorno (por ejemplo `firma-documentos` y `firma-documentos-master`). Usa `randomize: false` cuando esté soportado; algunas versiones de Dokploy añaden sufijo igualmente, así que verifica y registra el `appName` devuelto.
2. Mantén neutros los nombres visibles de proyecto y Compose; las ramas y entornos ya expresan master frente a production.
3. Conecta el repositorio y la rama del entorno. Dokploy construye al recibir el push; no conviertas el flujo a Stack/Swarm o Nixpacks de forma silenciosa.
4. Guarda el entorno completo antes de desplegar, con quoting dotenv seguro y sin secretos en Git. Verifica que `POSTGRES_PASSWORD` está disponible para la interpolación de Compose y coincide con `DATABASE_URL`.
5. Enlaza los dominios HTTPS al servicio web correcto: puerto interno real y red edge adecuada en Traefik.
6. Despliega primero `master`, ejecuta smoke tests y healthchecks, y promueve a `production` mediante PR con aprobación explícita. Promueve el mismo candidato validado.
7. Si el nombre técnico quedó mal, no uses `compose.update` como renombrado: crea un Compose nuevo con el `appName` deseado, valídalo, mueve el dominio y solo después borra el antiguo con `deleteVolumes: false`, salvo aprobación explícita de borrado de volúmenes.

## Persistencia y backups

- Preserva los volúmenes de PostgreSQL por defecto. Nunca pases `deleteVolumes: true` ni `freshVolumes: true` sin aprobación explícita.
- Antes de mutar `production`, verifica configuración, destino y evidencia de finalización del backup; una respuesta 200 o una tarea encolada no demuestran que el backup sea restaurable.

## Diagnóstico

- Comprueba `composeStatus`, el deployment más reciente, réplicas y logs por `containerId`; `done` en Dokploy no garantiza servicios saludables.
- Ante timeout, compara DNS, TLS, binding y backend antes de redeployar.
- Si la API/TLS de Dokploy está inestable, detén las acciones destructivas y espera un read-back estable.

## Validación

- `db`, `web`, `worker`, DNS y TLS correctos y `/api/health` público respondiendo HTTP 200 de forma repetida antes de declarar éxito.
- Variables leídas de vuelta tras guardarlas; dominios enlazados al servicio correcto.
- Mismo candidato promovido y rollback documentado.

## Resultado esperado

Recursos Dokploy Docker Compose identificables y aislados por entorno, variables guardadas con quoting seguro y sin secretos en Git, dominios HTTPS enlazados al servicio web correcto, smoke tests y healthchecks verdes, y rollback documentado.

## Seguridad

Nivel de riesgo: **high**. No imprimas objetos completos de Dokploy: `env` puede contener secretos. No aceptes tokens ni claves pegados en el chat. Nada de acciones destructivas, borrado de volúmenes o cambios en Production sin autorización explícita, copia recuperable y plan de reversa.
