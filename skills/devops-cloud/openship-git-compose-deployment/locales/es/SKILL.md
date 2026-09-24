# Despliegue Git y Compose en Openship

## Propósito

Desplegar una aplicación desde GitHub en una instancia self-hosted de Openship usando Dockerfile y, cuando exista, `docker-compose.openship.yml`. El procedimiento cubre aplicaciones web con workers y otros servicios, variables de entorno, dominio HTTPS, observabilidad y recuperación.

## Cuándo utilizarla

- El proyecto vive en un repositorio Git accesible por Openship.
- La aplicación usa Dockerfile, Compose o una configuración equivalente detectada por Openship.
- Se necesita desplegar uno o varios servicios, por ejemplo `web` y `worker`, en el mismo proyecto.
- Se dispone de un endpoint MCP/REST autenticado de Openship.

## Cuándo no utilizarla

- El destino no es Openship o no se ha confirmado el endpoint de control.
- No existe un plan para conservar datos, variables y rollback.
- Se pretende copiar secretos al repositorio, a una skill, a logs o a la conversación.

## Información necesaria

- Repositorio, propietario, rama y ruta del Compose si no está en la raíz.
- Tipo de build, runtime, comandos de cada servicio, puertos publicados y endpoint de readiness.
- Dominio público y DNS apuntando a Openship.
- Lista de variables de entorno separando valores obligatorios, opcionales y secretos.
- Token MCP de Openship guardado en el entorno local del agente.
- Identificador del proyecto existente si se trata de una actualización.

## Variables de entorno

Antes de desplegar, crea una plantilla local basada en `.env.openship.example` y rellena los valores reales solo en Openship. No publiques `.env`, tokens ni credenciales.

### Aplicación de referencia

Para una aplicación Next.js/Bun con PostgreSQL, almacenamiento B2, SMS Telnyx, correo SES e integraciones ERP, documenta como mínimo:

- Obligatoria: `NEXT_PUBLIC_APP_URL`, `BETTER_AUTH_SECRET`, `DATABASE_URL`, `TRUSTED_ORIGINS`, `ALLOWED_SIGNUP_DOMAINS`, `SUPERADMIN_EMAILS`.
- Runtime: `NODE_ENV=production`, `HOSTNAME=0.0.0.0`, `PORT=4000`.
- Correo: `AWS_SES_REGION`, `AWS_SES_SMTP_HOST`, `AWS_SES_SMTP_PORT`, `AWS_SES_SMTP_USER`, `AWS_SES_SMTP_PASSWORD`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`.
- Almacenamiento: `B2_ENDPOINT`, `B2_REGION`, `B2_KEY_ID`, `B2_APPLICATION_KEY`, `B2_BUCKET`.
- SMS: `TELNYX_API_KEY`, `TELNYX_PUBLIC_KEY`, `TELNYX_VERIFY_PROFILE_ID`, `TELNYX_FROM_NUMBER`, `TELNYX_MESSAGING_PROFILE_ID`.
- Webhook y retención: `SES_WEBHOOK_SECRET`, `TSA_URL`, `RETENTION_YEARS`.
- ERP opcional: `WHMCS_API_URL`, `WHMCS_IDENTIFIER`, `WHMCS_SECRET`, `DOLIBARR_API_URL`, `DOLIBARR_API_KEY`.

`B2_APPLICATION_KEY`, `TELNYX_API_KEY`, `TELNYX_PUBLIC_KEY`, `AWS_SES_SMTP_PASSWORD`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `SES_WEBHOOK_SECRET`, `WHMCS_SECRET` y `DOLIBARR_API_KEY` deben marcarse como secretos. Las integraciones opcionales pueden registrarse inicialmente vacías, pero la skill debe indicar que la funcionalidad correspondiente quedará no disponible.

## Procedimiento

1. **Inspecciona el repositorio antes de tocar Openship**:
   - Lee `Dockerfile`, Compose, `package.json`, lockfile, `.dockerignore`, entrypoint y scripts de migración/bootstrap.
   - Confirma que el proceso web escucha en `0.0.0.0`, que el puerto coincide con el proyecto y que el worker no publica un puerto.
   - Haz que migraciones y bootstrap sean idempotentes; usa un advisory lock si web y worker pueden arrancar a la vez.
   - Añade herramientas de compilación al stage de dependencias cuando una dependencia nativa lo requiera, por ejemplo `python3`, `make` y `g++` en Alpine.
   - Evita sintaxis o flags exclusivos de BuildKit si el builder de Openship usa el flujo Docker clásico.

2. **Prepara el Compose de producción**:
   - Usa un servicio `web` con build compartido, comando explícito y el puerto HTTP expuesto públicamente.
   - Usa un servicio `worker` con el mismo build y su comando de trabajo, sin endpoint público.
   - Conserva el entorno de cada servicio completo; no elimines variables al actualizar la definición.
   - Añade healthchecks claros: HTTP para web y un check de proceso para worker cuando no tenga puerto.
   - Define `restart: unless-stopped` o la política equivalente y evita depender de `depends_on` para garantizar migraciones.
   - Mantén `DATABASE_URL` apuntando al PostgreSQL externo si el proyecto no despliega la base de datos dentro de Openship.

3. **Configura o asegura el proyecto**:
   - Usa el proyecto existente si el repositorio, rama y entorno coinciden; no crees duplicados.
   - Para un proyecto Git existente, usa la operación Git de deploy con `projectId`, rama y entorno `production`.
   - Para un proyecto nuevo, utiliza el flujo de detección/ensure solo cuando sea necesario y conserva la lista completa de servicios.
   - Configura `composePath`, `runtimeMode=docker`, `buildKind=dockerfile`, puerto, dominio, readiness y estrategia de rollback.
   - Si Openship devuelve un `groupId` pero no expone una operación documentada para listar o mover grupos, no inventes un parámetro ni recrees el proyecto: registra la limitación y conserva el proyecto actual.

4. **Carga las variables con merge seguro**:
   - Lee primero las variables actuales con la operación de entorno del proyecto; los secretos deben llegar enmascarados.
   - Usa el endpoint de merge de variables con `environment=production`, `upserts` y `deletes=[]`.
   - Añade claves faltantes con placeholders vacíos solo para integraciones opcionales. No reemplaces valores existentes por placeholders.
   - Marca `isSecret=true` para credenciales y tokens. Nunca incluyas el valor real en logs, diffs, skill, catálogo o respuesta.
   - Recuerda que las variables de build como `NEXT_PUBLIC_APP_URL` deben estar disponibles durante el build, no solo al arrancar el contenedor.
   - Tras cambiar variables, ejecuta el redeploy necesario: los servicios existentes pueden conservar el entorno anterior hasta ser recreados.

5. **Despliega**:
   - Ejecuta el deploy Git o el build/access apropiado con la rama y entorno correctos.
   - Guarda el ID de deployment y no declares éxito porque la llamada haya sido aceptada.
   - Poll de `get_deployments_by_id_build` y `get_deployments_by_id` hasta estado terminal.
   - Inspecciona los logs de build y runtime por servicio, especialmente el worker.

6. **Resuelve estados parciales con evidencia**:
   - Si aparece `partial_failure` o `awaitingDecision`, consulta primero las acciones pendientes y el motivo exacto.
   - Comprueba contenedores, logs recientes e incidentes antes de elegir `keep` o `reject`.
   - Usa `keep` solo cuando los servicios que deben quedar activos están ejecutándose y la salud pública es correcta.
   - Usa `reject` solo cuando el fallo sea real o la release deba revertirse; trátalo como destructivo.
   - Si el estado deja de estar pendiente antes de actuar, no repitas la acción: vuelve a leer el estado final.

7. **Verifica extremo a extremo**:
   - Proyecto: rama, Compose path, runtime Docker, dominio, readiness y deployment activo.
   - Servicios: todos en `running`, sin duplicados ni reinicios anómalos.
   - Worker: logs de migración/bootstrap y mensaje de arranque estable.
   - Incidentes: monitoring activo, servidor alcanzable y lista de incidentes abierta vacía.
   - HTTP: `GET https://<dominio>/api/health` devuelve `200` y un estado de aplicación saludable.
   - Variables: todas las obligatorias presentes; las opcionales no configuradas quedan identificadas como no disponibles.
   - Repite la comprobación después de un intervalo breve para detectar crash loops.

8. **Documenta rollback y mantenimiento**:
   - Conserva deployment ID, commit SHA, logs relevantes y URL de salud.
   - Antes de una release de riesgo, consulta el plan de restore/rollback.
   - Para cambios de código usa redeploy desde Git; para cambios solo de entorno recrea los servicios afectados.
   - No borres proyecto, volúmenes, base de datos ni ramas sin aprobación explícita y copia recuperable.

## Validación

- El proyecto correcto se actualiza y no aparece un duplicado.
- El build termina sin errores de Dockerfile, dependencias nativas o BuildKit.
- Web y worker están en `running` y sin incidentes abiertos.
- El dominio sirve HTTPS y `/api/health` devuelve `200`.
- Las migraciones son idempotentes y el worker arranca después del bootstrap.
- Las variables obligatorias están configuradas y los secretos siguen enmascarados.
- Un estado parcial se resuelve con evidencia, no por intuición.
- El rollback documentado apunta a un deployment o commit verificable.

## Resultado esperado

Un proyecto Openship reproducible y operable: código Git desplegado con Docker/Compose, variables administradas en producción, dominio HTTPS, web y workers saludables, healthcheck verificable, logs consultables y un camino de rollback documentado.

## Seguridad

Nivel de riesgo: **high**. La skill puede operar producción y manejar credenciales. Reglas obligatorias:

- Nunca guardes tokens o secretos en el repositorio, `.env` versionado, skill, catálogo, logs o mensajes.
- Lee y compara antes de hacer merge de variables; no borres claves desconocidas.
- No uses endpoints no documentados para mover grupos, cambiar proyectos o recuperar secretos.
- No aceptes una release parcial sin revisar servicios, logs, incidentes y healthcheck.
- `reject`, rollback, eliminación de proyecto, eliminación de volúmenes y cambios destructivos requieren aprobación explícita.
- Mantén la rama de producción protegida y conserva el commit SHA del despliegue.
