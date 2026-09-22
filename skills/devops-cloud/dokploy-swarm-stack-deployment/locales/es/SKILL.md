# Despliegue Dokploy en modo Stack (Swarm) multi-nodo

## Propósito

Preparar y operar una aplicación en Dokploy usando **Compose Type `Stack`** y `docker stack deploy`, incluso cuando el clúster todavía tiene un único nodo. El resultado debe poder escalar las réplicas web a nuevos nodos sin cambiar de modo de despliegue ni rehacer la arquitectura.

El patrón de referencia es:

```text
merge a la rama de despliegue
  -> CI valida y publica imágenes privadas por SHA
  -> Dokploy obtiene la fuente y ejecuta docker stack deploy --with-registry-auth
  -> Swarm hace pull de la imagen en cada nodo
  -> bootstrap/entrypoint aplica migraciones idempotentes
  -> Web pasa smoke/healthcheck y recibe tráfico
```

## Cuándo utilizarla

- El proyecto debe desplegarse desde el inicio como un Swarm Stack.
- Se prevé añadir nodos manager/worker y escalar réplicas web.
- El proyecto tiene Dockerfile, healthcheck y un registry accesible por todos los nodos.
- Las migraciones y el bootstrap pueden ejecutarse de forma idempotente.

## Cuándo no utilizarla

- El proyecto es estrictamente de un solo nodo y no se prevé escalar: usa Compose Type `docker-compose`.
- La organización no permite publicar imágenes en un registry.
- La aplicación depende de `depends_on` con condiciones, perfiles o jobs one-shot para arrancar correctamente.
- La base de datos o los uploads dependen de un volumen local que tendría que moverse entre nodos sin estrategia de persistencia.

## Información necesaria

- Repositorio Git, rama protegida y ruta exacta del Compose.
- Dominio, servicio interno y puerto del contenedor.
- Variables y secretos almacenados en Dokploy, nunca en Git.
- Registry privado, usuario, token de solo lectura y nombres exactos de imágenes.
- Política de persistencia para PostgreSQL, uploads, backups y object storage.
- Nodos manager/worker y restricciones de placement.
- Acceso al panel/API de Dokploy y, para diagnóstico avanzado, SSH a un manager.

## Seguridad de accesos

- Nunca pidas ni pegues contraseñas, PAT, claves privadas o tokens en el chat.
- Una clave privada pegada en una conversación debe revocarse y sustituirse.
- Para SSH usa una clave nueva almacenada como archivo local con permisos `600`, por ejemplo `ATLAS_SSH_KEY_PATH`; nunca guardes su contenido en `.env` ni Git.
- El usuario SSH debe tener el mínimo acceso necesario. Para operar Docker puede usar `sudo -n docker` sin revelar la contraseña.
- En `.env` solo se guardan rutas, hosts e identificadores no secretos; valida nombres y longitudes, nunca valores.
- Dokploy puede ocultar o no devolver valores secretos en su UI/API. La ausencia de visualización no implica ausencia de configuración: verifica presencia, longitud y comportamiento, o rota el valor desde un canal seguro.

## Procedimiento

### 1. Diseñar el Stack para Swarm

- `docker stack deploy` no construye imágenes desde `build:`. El Compose debe usar `image:` de un registry.
- No dependas de `depends_on` para ordenar migraciones.
- No hagas que un servicio one-shot `migrate` sea requisito para que `web` arranque.
- No uses perfiles para operaciones esenciales.
- Declara las variables en Dokploy; no dependas de `env_file` implícito.
- Usa `deploy.restart_policy`, `update_config` y `rollback_config`.
- Usa redes `overlay`; conecta el servicio Web a la red externa de Traefik/Dokploy.
- En un nodo usa `APP_REPLICAS=1`; escala solo después de validar otro nodo elegible.

### 2. Migraciones y bootstrap

El bootstrap o entrypoint debe aplicar migraciones antes de servir tráfico:

```sh
set -eu
# Esperar PostgreSQL con límite y backoff.
# Adquirir advisory lock antes de migrar.
bun run db:migrate
bun run provision-runtime
# Seed solo en Development/Preview; prohibido en Production.
exec bun run start
```

Requisitos:

- Migraciones, provisión de roles y seeds deben ser idempotentes.
- Usa advisory lock o mecanismo equivalente.
- Libera el lock aunque falle la migración.
- Reintenta la conexión a PostgreSQL con límite.
- Production debe ser migrations-only y nunca recibir fixtures.
- Un servicio bootstrap `replicas: 1` puede terminar con `0/1` después de código 0: es normal; comprueba su último task y logs.

### 3. Publicar imágenes

Publica cada imagen con el SHA completo del commit. No uses `latest` en Preview/Production.

```yaml
permissions:
  contents: read
  packages: write

jobs:
  validate:
    steps:
      - run: bun install --frozen-lockfile --linker=hoisted
      - run: bun run typecheck
      - run: bun run --filter '*' test
      - run: bun run lint

  images:
    needs: validate
    if: github.event_name == 'push'
    steps:
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          file: Dockerfile.web
          tags: ghcr.io/organizacion/proyecto-web:${{ github.sha }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          file: Dockerfile.worker
          tags: ghcr.io/organizacion/proyecto-worker:${{ github.sha }}
```

Comprueba que todos los scripts llamados por CI existen. Un `bun run test` en la raíz sin script válido hace que nunca se publiquen las imágenes.

Para GHCR privado:

- Usa PAT classic con mínimo `read:packages` en Dokploy para descargar.
- Usa `GITHUB_TOKEN` con `packages: write` en Actions para publicar.
- Vincula el paquete a la organización/repositorio si GitHub lo requiere.
- Prueba el registry en Dokploy antes del primer deploy.
- `401` anónimo en GHCR es normal para paquetes privados; `denied` durante el deploy indica tag inexistente o credenciales no aplicadas.

### 4. Configurar Dokploy

- Selecciona Compose Type `Stack`.
- Configura repositorio, propietario, rama y `composePath` exactos.
- Mantén `autoDeploy=false` en Preview/Production; usa deploy manual y fail-closed.
- Registra el registry privado antes del primer deploy.
- Verifica que el deploy ejecuta `docker stack deploy ... --with-registry-auth`.
- Guarda variables por entorno en Dokploy; genera secretos distintos para cada entorno.
- Usa `freshVolumes=false` en redeploys normales y recuperación.
- No borres stacks, volúmenes ni datos para resolver un pull fallido.

### 5. Diagnóstico de imágenes y caché

Cuando aparezca `No such image`, `pull access denied` o el Web no arranque:

1. Consulta `docker service ps --no-trunc <stack>_<service>` en el manager.
2. Inspecciona la imagen efectiva con `docker service inspect`.
3. Comprueba que el tag existe y que el workflow terminó antes de desplegar.
4. Prueba el registry desde Dokploy (`registry.testRegistryById`).
5. Compara el SHA del checkout de Dokploy con la rama GitHub.
6. Refresca la fuente antes del deploy (`compose.fetchSourceType`/carga de servicios tipo `fetch`).
7. Si Dokploy conserva una definición antigua, deja `autoDeploy=false`, actualiza variables, refresca fuente y ejecuta un único deploy manual.
8. Si GHCR sigue bloqueado y el nodo es de Development, construye temporalmente en el manager desde el checkout verificado, etiqueta con el SHA y despliega sin borrar volúmenes. Documenta esa excepción y publica las imágenes en GHCR antes de Preview/Production.

Nunca asumas que el estado `done` de Dokploy implica que las tareas están listas: verifica las réplicas y los errores de cada servicio.

### 6. Acceso de dominio y Traefik

- El dominio debe apuntar al VPS y resolver al origen correcto.
- Configura el dominio en Dokploy con servicio Web y puerto interno.
- Si Dokploy genera la ruta, haz redeploy después de crearla.
- El nombre del servicio puede requerir el nombre completo de Swarm: `<stack>_<service>`, no solo `web`.
- Comprueba la red externa de Traefik en el servicio Web.
- Si el dominio aparece en la API pero Traefik devuelve `404` y no existe una regla dinámica, no repitas deployments indefinidamente: crea una regla file-provider controlada que apunte al servicio completo y al puerto interno.
- Para emitir Let’s Encrypt, usa temporalmente DNS-only durante el challenge si el proxy Cloudflare produce `526`; vuelve a activar proxy después de verificar TLS.
- No uses `verify=false` ni dejes Cloudflare en modo inseguro como solución permanente.

Ejemplo de smoke:

```bash
curl -I http://dev.example.com/
# Esperado: 308/301 a HTTPS
curl -I https://dev.example.com/
# Esperado: 401 si Basic Auth está activo
curl -u "$DEV_USER:$DEV_PASSWORD" -I https://dev.example.com/
# Esperado: 200, 307 a mantenimiento u otra respuesta definida por el entorno
```

### 7. Persistencia y placement

PostgreSQL y Redis con volumen local deben fijarse a nodos con almacenamiento durable:

```yaml
deploy:
  placement:
    constraints:
      - node.labels.gescodi.data == true
```

No guardes uploads importantes en el filesystem local de una réplica. Usa object storage externo. No muevas PostgreSQL sin almacenamiento replicado y backup probado.

### 8. Escalar después del primer nodo

1. Registra el nuevo nodo en Dokploy.
2. Únelo al Swarm.
3. Verifica `docker node ls`.
4. Confirma que puede autenticarse y hacer pull del registry.
5. Escala solo servicios stateless.
6. Comprueba tareas, salud, dominio y logs.

## Validación

### Repositorio

- Compose válido y sin claves YAML duplicadas.
- No depende de `build:` para runtime.
- Web/Worker tienen imágenes SHA.
- CI valida con scripts existentes y publica antes de desplegar.
- Production no contiene variables de seed.

### Runtime

- `docker stack services <stack>` muestra réplicas esperadas.
- `docker service ps --no-trunc` no muestra `No such image`.
- PostgreSQL/Redis están saludables.
- Bootstrap termina migraciones y roles con código 0.
- Web muestra `Ready`.
- Worker muestra `ready`.
- Un segundo deploy es idempotente.
- Rollback por SHA está disponible.

### Dominio

- DNS resuelve al destino previsto.
- HTTP redirige a HTTPS.
- TLS es válido.
- Sin credenciales devuelve `401/403` cuando corresponde.
- Con acceso de entorno responde a mantenimiento, home o healthcheck.
- Preview y Production no se confunden con Development.

## Troubleshooting

### `No such image` / `pull access denied`

Verifica tag, workflow, GHCR, PAT `read:packages`, `--with-registry-auth` y la imagen efectiva de cada servicio. No borres volúmenes.

### CI termina pero no publica

Revisa primero el job `validate`: scripts raíz inexistentes, tests con variables obligatorias o lint fallido impiden llegar al job de imágenes.

### Dokploy despliega un SHA antiguo

Desactiva `autoDeploy`, refresca la fuente GitHub, comprueba el Compose convertido y ejecuta un único deploy manual. Inspecciona `docker service inspect` después.

### Dominio 404 con servicio activo

Comprueba la red Traefik, el nombre completo `<stack>_<service>`, el puerto interno y la regla dinámica. Dokploy puede registrar el dominio sin generar la regla para ciertos Compose Swarm; usa una configuración file-provider controlada y documentada.

### Dominio 526

El origen no tiene un certificado válido o el challenge no terminó. Usa DNS-only temporalmente, valida HTTP/TLS en el origen y después reactiva el proxy.

### Credenciales no visibles en Dokploy

Es comportamiento esperado para secretos protegidos. Verifica presencia/longitud y prueba autenticación; no imprimas el valor. Para cambiarlo, actualízalo desde el panel/API protegido.

## Resultado esperado

Un Stack Dokploy reproducible en un nodo y escalable a varios, con imágenes inmutables, registry autenticado, migraciones seguras, persistencia, rutas Traefik verificadas, smoke tests externos y rollback documentado.

## Seguridad

Nivel de riesgo: **high**.

- No guardes secretos en Git, Compose, dumps, imágenes, logs ni chat.
- Mantén GHCR privado y usa tokens de solo lectura en runtime.
- Revoca credenciales pegadas o expuestas.
- Haz backup verificable antes de migrar PostgreSQL o importar datos.
- No borres volúmenes, stacks o nodos sin aprobación y rollback.
- Protege Production con PR obligatorio, mantenimiento y aprobación humana.
