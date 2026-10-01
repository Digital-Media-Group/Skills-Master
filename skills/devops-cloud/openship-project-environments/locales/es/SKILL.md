# Despliegue OpenShip por proyecto y entornos

## Propósito

Operar aplicaciones en OpenShip sobre un servidor propio (por ejemplo, Atlas) con un único
proyecto y entornos internos separados para `Production` y `Preview`. La skill cubre servicios
Docker, PostgreSQL persistente, migración completa desde otro proveedor, backups, promoción,
rollback y DNS.

OpenShip no es Dokploy. No se deben usar endpoints, nombres de recursos ni supuestos de Dokploy
para operar OpenShip. La skill Dokploy/Swarm sigue siendo válida para Dokploy, pero no sustituye
esta integración.

## Modelo obligatorio

Usa un proyecto único:

```text
EmprenRed
├── Production → rama Production
└── Preview    → rama Preview
```

Un proyecto OpenShip puede tener varios entornos. Cada entorno tiene su propio identificador
interno, variables, deployments, dominios y estado. Al desplegar, usa siempre el `projectId` o
identificador interno del entorno que devuelve OpenShip; no uses el ID del proyecto Production
para enviar `environment: preview`.

Solo crea proyectos separados si el contrato de OpenShip exige explícitamente que un entorno no
productivo sea otro proyecto. Si ocurre, documenta la excepción y evita duplicar datos o dominios.

## Acceso y seguridad

- Usa el MCP real de OpenShip y su transporte/autenticación documentados.
- Verifica workspace, servidor Atlas, permisos y estado del host antes de mutar.
- No confundas la identidad `gh-cli` conectada con una GitHub App global: comprueba qué fuente
  puede leer el repositorio y qué operaciones puede ejecutar.
- Nunca aceptes secretos pegados en el chat.
- No imprimas objetos completos: env, tokens, dumps, conexiones y respuestas de backup pueden
  contener credenciales.
- Usa `requestId` idempotente y precondiciones (`resourceVersion`, `expectedSequence`,
  `expectedUpdatedAt`) cuando OpenShip las exija.

## Ramas y promoción

- `Preview` se despliega desde la rama `Preview`.
- `Production` se despliega desde la rama `Production`.
- El mismo candidato validado debe promocionarse entre entornos; no reconstruyas una versión
  diferente para Production.
- El pipeline ordena: validación → build/artifact → Preview → smoke tests → aprobación humana →
  Production.
- No cambies DNS ni retires el proveedor anterior antes de verificar Production nueva.
- Mantén un rollback real: deployment anterior, datos anteriores y configuración anterior.

## Servicios y persistencia

Un deployment multi-servicio puede contener, según la aplicación:

- `web`: aplicación HTTP.
- `worker` o `cron`: tareas asíncronas/programadas.
- `postgres`: PostgreSQL local si el proveedor/servidor permite el modo single-node.
- Redis, almacenamiento de objetos u otros servicios solo cuando estén documentados.

Cada entorno debe tener volúmenes separados:

```text
emprenred-preview-postgres-data
emprenred-production-postgres-data
```

No compartas `DATABASE_URL`, volúmenes, contraseñas, backups restaurados ni datos entre Preview y
Production. En un único servidor no declares alta disponibilidad: documenta el punto único de
fallo y compensa con backups externos y restore rehearsal.

Si OpenShip exige un cluster privado con dos servidores para PostgreSQL gestionado, no fuerces la
operación usando la IP pública. Decide explícitamente entre añadir un nodo, usar PostgreSQL local
persistente en el servidor único o usar un proveedor externo temporal.

## Configuración de build

- Usa el flujo nativo de OpenShip.
- Si el proyecto usa `buildKind: dockerfile`, OpenShip debe construir y ejecutar el Dockerfile.
- No pongas `docker build` ni `docker run` dentro de `buildCommand`/`startCommand` salvo que
  OpenShip documente Docker-in-Docker y exista una aprobación explícita.
- No dependas de GHCR si OpenShip puede construir en el servidor; si usas registry, fija el
  artefacto por digest verificable.
- No uses `build.target` de un Compose como si OpenShip pudiera resolverlo automáticamente.
  Divide servicios explícitos o proporciona un Dockerfile/servicio compatible.
- El health check debe comprobar el endpoint de aplicación, por ejemplo `/api/health`.

## PostgreSQL y migración completa

### Antes de tocar datos

1. Identifica el origen exacto: host, base, branch/proyecto y fecha de corte.
2. Clasifica datos: negocio, usuarios/cuentas, catálogo, precios, contenido, auditoría,
   integraciones, sesiones y secretos.
3. Crea una copia completa independiente y verificable.
4. Comprueba que la copia sea restaurable; una tarea encolada o HTTP 200 no basta.
5. Define RPO, RTO, retención y rollback.

### Restauración Preview

1. Crea PostgreSQL Preview y su volumen independiente.
2. Restaura el backup completo, incluidos usuarios/cuentas y contenido persistente.
3. No importes sesiones, cookies ni tokens efímeros como si fueran negocio; fuerza login nuevo.
4. Verifica conteos por tabla, claves foráneas, migraciones y relaciones críticas.
5. Aplica solo las migraciones que falten, de forma idempotente.
6. Configura `DATABASE_URL` interna apuntando al servicio PostgreSQL Preview.
7. Ejecuta smoke tests y validación funcional.

### Restauración Production

1. No ejecutes Production hasta que Preview pase.
2. Crea un backup final/delta del origen y congela escrituras durante el corte.
3. Restaura Production en su volumen independiente.
4. Aplica migraciones antes de levantar tráfico nuevo.
5. Despliega el mismo candidato probado en Preview.
6. Conserva la base y deployment anteriores para rollback.

Nunca ejecutes `--force`, borres volúmenes o destruyas la base origen para resolver un error de
migración.

## Backups

- Configura un destino externo, cifrado y con retención.
- Ejecuta un backup manual antes de Preview y otro antes de Production.
- Registra backup ID, origen, entorno, tamaño, checksum/estado, retención y hora.
- Realiza restore rehearsal en una base/volumen aislado.
- Verifica que el backup contiene PostgreSQL, volúmenes y ficheros necesarios, no solo la
  configuración del proyecto.
- Si no existe evidencia de restauración, bloquea el despliegue stateful.

## Variables y secretos

Mantén variables separadas por entorno. No copies `DATABASE_URL` del proveedor anterior: debe
apuntar a PostgreSQL interno de OpenShip. Adapta también:

- `BETTER_AUTH_URL`.
- `NEXT_PUBLIC_BETTER_AUTH_URL`.
- `BETTER_AUTH_TRUSTED_ORIGINS`.
- dominios de Preview/Production.
- URLs de webhooks y cron.

Los secretos protegidos de Vercel u otro proveedor pueden no ser exportables. En ese caso,
rotarlos o cargarlos directamente en OpenShip mediante su MCP/panel seguro.

## Dominios y Cloudflare

- No cambies DNS para Preview hasta que exista URL/health verificable.
- Usa un dominio Preview separado y protegido, preferiblemente con Basic Auth/noindex.
- Production debe mantener mantenimiento o protección durante el corte.
- Cambia solo registros web; conserva MX, SPF, DKIM, DMARC, SES y `api` salvo migración explícita.
- Comprueba DNS, TLS, HTTP→HTTPS, `/api/health`, login, admin, formularios, catálogo, precios,
  WHMCS y cron.
- Mantén el dominio Vercel anterior como rollback hasta cerrar la observación.

## Diagnóstico y parada

Detén la fase si:

- el `projectId` no corresponde al entorno solicitado;
- Preview usa datos o volumen de Production;
- no hay backup restaurable;
- la imagen/commit no es identificable;
- el host no tiene recursos o el health check falla;
- el PostgreSQL no está listo;
- los conteos o relaciones de datos no coinciden;
- el deployment queda parcial o con servicios persistentes fallidos;
- DNS/TLS no apunta al nuevo destino.

## Checklist final

- [ ] Proyecto único y entornos Production/Preview identificados.
- [ ] Ramas correctas y candidato/promoción trazables.
- [ ] Variables y secretos separados.
- [ ] PostgreSQL y volúmenes separados.
- [ ] Backup completo y restore rehearsal verificados.
- [ ] Migraciones aplicadas antes del tráfico.
- [ ] Preview con smoke tests verdes.
- [ ] Production con el mismo candidato validado.
- [ ] DNS/TLS verificados.
- [ ] Rollback practicable.
- [ ] Proveedor anterior conservado hasta cerrar observación.

## Resultado y responsabilidad

Un despliegue correcto termina con evidencia de proyecto, entorno, commit, deployment, backup,
restore, health, DNS y rollback. La aprobación humana de Production debe quedar registrada; la
skill no autoriza por sí sola un corte irreversible.
