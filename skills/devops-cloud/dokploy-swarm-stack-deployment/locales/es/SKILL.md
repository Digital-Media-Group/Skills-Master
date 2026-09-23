# Despliegue Dokploy en modo Stack (Swarm)

## Propósito

Operar stacks Dokploy/Swarm en Development, Preview y Production con promoción fail-closed, mantenimiento independiente por superficie y diagnóstico verificable. El procedimiento soporta un nodo único y no presenta la disponibilidad local como alta disponibilidad.

## Accesos y secretos

- Usa la API REST de Dokploy con variables locales protegidas; no aceptes tokens, PAT o claves pegados en el chat.
- SSH es opcional y solo procede por un canal autorizado. La API no demuestra permisos de GitHub o de publicación en GHCR.
- No imprimas objetos completos de Dokploy: `env` puede contener secretos. Registra únicamente IDs, estados, nombres permitidos, tamaños y hashes.

## Build e identidad de imagen

Un Stack no construye `build:`. Para una fuente publicada, usa imágenes con manifest digest verificado. Cuando GitHub/GHCR no está disponible y existe autorización explícita para un snapshot:

```text
ZIP por allowlist -> Application Dokploy temporal (sourceType=drop, Dockerfile, replicas=0)
                  -> imagen local en el Engine
                  -> Stack raw con --resolve-image never y placement al nodo constructor
```

El ZIP debe excluir `.git`, `.env*` reales, claves, certificados, dumps, backups, `node_modules`, `.next`, logs y evidencia. Rechaza symlinks, rutas absolutas, `..`, duplicados y archivos no allowlisted. Registra SHA-256 del ZIP/manifiesto, hashes de Dockerfiles, commit informativo, builder e image ID.

Un image ID local `sha256:...` no es un manifest digest. `RepoDigests=[]` significa que la imagen no está publicada. Un tag local `latest` tampoco es inmutable. No uses `repo@sha256:<image-config-id>`.

## Nodo único y estrategia de actualización

En un Swarm single-node con `max_replicas_per_node: 1`, `update_config.order: start-first` no puede reemplazar la tarea existente y deja `no suitable node`, normalmente con `502`. Usa `stop-first` mientras no haya capacidad adicional, junto con `freshVolumes=false`, mantenimiento activo y rollback verificado. Reconsidera `start-first` solo después de validar capacidad y placement multi-nodo.

## Backup y persistencia

Antes de mutar Preview o Production:

1. Verifica la configuración de backup, destino, scope, retención, cifrado y capacidad.
2. Para PostgreSQL/Compose, ejecuta el backup manual configurado y espera evidencia de finalización.
3. Para volúmenes Compose, Dokploy Volume Backups nativos son válidos; registra el backup ID, volumen, `turnOff=true` y estado del servicio.
4. Verifica el archivo remoto o realiza un restore rehearsal aprobado. Una respuesta `200` o una tarea encolada no demuestra que el backup sea restaurable.
5. Si no hay backup nativo/remoto verificable, detén el despliegue stateful.

Conserva `freshVolumes=false`. No borres stacks, volúmenes o datos para resolver un pull, un error de imagen o un fallo de despliegue.

## Mantenimiento y promoción

- Define `GESCODI_SITE_URL` y `GESCODI_APP_URL` por separado; no dependas de `NEXT_PUBLIC_*` para routing server-side.
- Development y Preview mantienen Basic Auth; Production conserva mantenimiento hasta aprobación.
- Production es migrations-only y nunca recibe seed/fixtures.
- Promueve el mismo candidato comprobado: Development -> Preview -> Production.
- Antes de quitar variables force-on, persiste y lee de vuelta los flags de mantenimiento en la base destino y verifica recuperación administrativa real.

## Bindings de dominios y Traefik

Cada entorno con dashboard necesita dos hosts apuntando al mismo Web:

| Entorno | Site | App | Protección |
|---|---|---|---|
| Development | `dev.example.com` | `dev-app.example.com` | Basic Auth |
| Preview | `preview.example.com` | `preview-app.example.com` | Basic Auth |
| Production | `www.example.com` | `app.example.com` | mantenimiento/app auth |

Con `sourceType=raw`, el binding debe usar el nombre completo generado por Swarm, `<stack>_web`, no el alias Compose `web`. Usa el puerto interno real, normalmente `4000`, HTTPS y la red edge correcta. Si Dokploy guarda el dominio pero no crea router, añade una regla file-provider controlada hacia `<stack>_web:4000`; elimina routers duplicados antes de probar.

## Diagnóstico

- Comprueba `composeStatus`, deployment más reciente, tareas de cada servicio, nodo, estado, error y bootstrap.
- `done` en Dokploy no garantiza tareas saludables; revisa réplicas y el último task.
- `compose.readLogs` requiere `composeId` y `containerId`. Las tareas históricas pueden devolver `No such container`; no infieras la causa de aplicación desde `Error:` genérico. Usa una tarea actual o logs centralizados.
- Ante timeout, compara IPv4/IPv6, DNS, Cloudflare, TLS, Traefik, binding y backend antes de redeployar. Un timeout en un host y `307` en el host hermano puede ser routing/ingress, no Next.js.
- Verifica siempre HTTP->HTTPS, TLS, `401/403` esperado, mantenimiento/app y health autorizado.

## Validación

```bash
curl -I https://dev.example.com/
curl -I https://dev-app.example.com/
curl -I https://preview.example.com/
curl -I https://preview-app.example.com/
curl -I https://www.example.com/
curl -I https://app.example.com/
```

Valida Compose, typecheck, tests, tareas Swarm, imágenes/digests, backups, dos hostnames por entorno y rollback. No declares HA con un único nodo o volumen local.

## Seguridad

Nivel de riesgo: **high**. Nunca guardes secretos en Git, Compose, dumps, imágenes, logs o chat. No confundas integración configurada con permisos de publicación. No retires Basic Auth, mantenimiento, killswitches o desactivación de proveedores como parte del alta de dominios.