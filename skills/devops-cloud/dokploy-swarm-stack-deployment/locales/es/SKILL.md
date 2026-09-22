# Despliegue Dokploy en modo Stack (Swarm) multi-nodo

## Propósito

Preparar y operar una aplicación en Dokploy usando **Compose Type `Stack`** y
`docker stack deploy`, incluso cuando el clúster todavía tiene un único nodo.
El resultado debe poder escalar las réplicas web a nuevos nodos sin cambiar de
modo de despliegue ni rehacer la arquitectura.

El patrón de referencia es:

```text
merge a production
  -> CI construye y publica imagen privada en registry
  -> Dokploy ejecuta docker stack deploy
  -> Swarm hace pull de la imagen en cada nodo
  -> entrypoint adquiere lock y aplica migraciones
  -> web pasa healthcheck y recibe tráfico
```

## Cuándo utilizarla

- El proyecto debe desplegarse desde el inicio como un Swarm Stack.
- Se prevé añadir nodos manager/worker y escalar réplicas web.
- El proyecto tiene Dockerfile, healthcheck y un registry accesible por todos los nodos.
- Las migraciones y el bootstrap pueden ejecutarse de forma idempotente desde el entrypoint.

## Cuándo no utilizarla

- El proyecto es estrictamente de un solo nodo y no se prevé escalar: usa Compose Type `docker-compose`.
- La organización no permite publicar imágenes en un registry.
- La aplicación depende de `depends_on` con condiciones, perfiles o jobs one-shot para arrancar correctamente.
- La base de datos o los uploads dependen de un volumen local que tendría que moverse entre nodos sin una estrategia de persistencia.

## Información necesaria

- Repositorio y rama protegida de despliegue, normalmente `production`.
- Dominio y servicio interno al que apunta Traefik.
- Variables de entorno y secretos en Dokploy; nunca secretos en Git.
- Registry privado (GHCR u otro), imagen móvil para despliegue e imagen inmutable por SHA para rollback.
- Política de persistencia para PostgreSQL, uploads, backups y object storage.
- Nodos manager/worker y restricciones de placement.
- Acceso al panel Dokploy y, para diagnóstico avanzado, SSH a un manager.

## Procedimiento

### 1. Diseñar el stack para Swarm desde el principio

No conviertas un Compose normal mecánicamente. Revisa estas incompatibilidades:

- `docker stack deploy` **no construye** imágenes desde `build:`. El compose debe tener `image:` apuntando al registry.
- No dependas de `depends_on` para ordenar migraciones: Swarm no implementa las condiciones de Compose.
- No uses un servicio `migrate` one-shot como requisito para que `web` arranque: Swarm no garantiza ese flujo.
- No uses `profiles` para operaciones esenciales del stack.
- No dependas de `env_file` como fuente implícita; declara las variables en Dokploy y asegúrate de que el stack las recibe.
- Usa `deploy.restart_policy`, `deploy.update_config` y `deploy.rollback_config`.
- Usa red `overlay` para comunicación entre nodos y la red externa de Dokploy para Traefik.
- Usa nombres cortos para recursos (`db`, `web`, `internal`, `db-data`), porque Docker compone `<stack>_<resource>` y limita el nombre final a 63 caracteres.

### 2. Mover migraciones al entrypoint

El servicio web debe ejecutar migraciones antes de iniciar el proceso principal:

```sh
run_migrations_with_lock() {
  # El lock debe ser adquirido en PostgreSQL antes de migrate deploy.
  # El código de ejemplo concreto depende del cliente SQL disponible.
  prisma migrate deploy
  node prisma/seed/ensure-schema.js
}

run_migrations_with_lock
exec node server.js
```

Requisitos:

- La operación debe ser idempotente.
- Usa un advisory lock de PostgreSQL o el mecanismo equivalente del ORM.
- Libera el lock incluso si la migración falla.
- Aplica reintentos para esperar a PostgreSQL.
- El servidor no debe aceptar tráfico antes de terminar la migración.
- Cada réplica puede ejecutar el entrypoint; el lock serializa el ledger.

### 3. Separar roles sin crear jobs obligatorios

Puedes usar la misma imagen con `ROLE=app`, `ROLE=scheduler` y otros roles
persistentes. Los roles que hacen trabajo puntual, como importar un dump, deben
estar desactivados por defecto (`replicas: 0`) y ejecutarse con un procedimiento
operativo explícito en un manager.

- `web`: puede tener varias réplicas.
- `scheduler`: normalmente una réplica para evitar tareas duplicadas.
- `db`: una réplica, fijada a un manager con volumen persistente.
- `import`: cero réplicas; se activa solo durante una migración autorizada.

### 4. Publicar la imagen y configurar GHCR en Dokploy

Ejemplo de imagen:

```yaml
x-app-image: &app-image
  image: ghcr.io/digital-media-group/formularios-mypanelhost:production
```

El workflow debe publicar dos tags:

- `production`: tag móvil consumido por Dokploy.
- `${{ github.sha }}`: tag inmutable para rollback.

En el registry externo de Dokploy configura exactamente:

```text
Registry URL: ghcr.io
Username: usuario real de GitHub, no el email
Password: PAT classic de GitHub
Image Prefix: ghcr.io/digital-media-group
```

El `Image Prefix` se utiliza para el modo Cluster y debe coincidir con el
namespace que precede al nombre del paquete. No pongas el repositorio completo
ni una ruta con `/` adicional en `Registry URL`.

Permisos del PAT:

- `read:packages` para que Dokploy/Swarm descargue imágenes.
- `write:packages` para el workflow que publica imágenes.
- `delete:packages` solo si se necesita limpieza automatizada.

Prueba el registry desde el mismo servidor que hará el pull. Un test desde el
panel no sustituye a comprobar que el nodo Swarm puede descargar la imagen.

### 5. Configurar Dokploy y Traefik

- Selecciona Compose Type `Stack`.
- Conecta la rama `production`.
- Define el Compose Path correcto.
- Deja vacío el custom command salvo que la documentación de la versión de Dokploy exija otro valor. El comando por defecto debe ser equivalente a `docker stack deploy ... --with-registry-auth`.
- Configura las variables en el panel, no en el repositorio.
- Configura el registry privado antes del primer deploy.
- Conecta `web` a la red externa `dokploy-network`.
- Declara el puerto de la app como `expose: ["3000"]`; **no uses `ports` ni publiques `3000` en el host**, porque Dokploy utiliza puertos del host para su propio servicio.
- Añade el dominio al servicio `web`, puerto interno 3000 y HTTPS.
- Redeploy después de añadir o modificar el dominio para que Traefik actualice la ruta.

Patrón esperado:

```yaml
web:
  expose:
    - "3000"
  networks:
    - dokploy-network
```

### 6. Persistencia y placement

PostgreSQL con volumen local no debe moverse libremente entre nodos:

```yaml
deploy:
  placement:
    constraints:
      - node.role == manager
volumes:
  db-data:
```

Para escalar web:

- No guardes uploads importantes en el filesystem local de la réplica.
- Usa S3/B2 u object storage externo para ficheros compartidos.
- Usa `deploy.mode: global` si quieres una tarea web por nodo; Swarm crea automáticamente la tarea al añadir un nodo.
- Usa `WEB_REPLICAS` o `docker service scale` si necesitas réplicas controladas en modo `replicated`.
- Fija scheduler, workers con estado y bases de datos según su necesidad de estado.

### 7. Escalar después del primer nodo

No ejecutes la escala automáticamente como parte de esta skill. Primero valida
el stack en un nodo:

1. Registra el nuevo servidor en Dokploy.
2. Únelo al Swarm con el token de worker o manager adecuado.
3. Verifica `docker node ls` desde un manager.
4. Confirma que el nodo puede hacer pull del registry privado.
5. Comprueba que `web` usa el modo global o escala el servicio stateless.
6. Comprueba tareas, healthchecks, dominio y logs.
7. No muevas PostgreSQL sin una estrategia de almacenamiento replicado y backup probado.

## Validación

### Validación del repositorio

- `docker-compose.yml` y `.dokploy/docker-compose.yml` parsean como YAML.
- No existen claves YAML duplicadas, especialmente dos anchors `<<` en el mismo mapping.
- Cada servicio persistente tiene `deploy.restart_policy`.
- Web tiene `deploy.mode` configurable y `update_config`/rollback razonables.
- La base de datos tiene healthcheck y placement manager.
- La red interna es `overlay`; la red Traefik es externa.
- `web` usa `expose`, no `ports` publicados en el host Dokploy.
- El compose no depende de `build:` para que un worker arranque.
- El workflow publica la imagen antes del deploy.

### Validación del despliegue

- `docker stack ls` muestra el stack.
- `docker service ls` muestra las réplicas esperadas.
- Las tareas tienen formato `<stack>_<service>.<replica>.<id>`.
- Logs de web muestran espera de DB, lock, migraciones y arranque de Next.js.
- `GET /api/health` responde 200.
- Un segundo deploy es idempotente.
- Un rollback al tag SHA anterior es posible sin reconstruir en el servidor.
- La imagen se puede descargar desde un nodo nuevo.

## Troubleshooting

### `Map keys must be unique` o anchors duplicados

Causa habitual:

```yaml
environment:
  <<: *db-vars
  <<: *app-env
```

Si `app-env` ya contiene `db-vars`, la segunda referencia es inválida. Usa un
solo anchor por mapping o combina los valores en un anchor único.

### `service declares mutually exclusive network_mode and networks`

No mezcles `network_mode` con `networks`. En Swarm usa `networks` y una red
`overlay`; en Dokploy conecta el servicio web a la red externa de Traefik.

### `port 3000 is already in use by service dokploy`

No publiques el puerto host 3000 desde la app. Dokploy usa puertos del host para
su propio servicio. Elimina `ports`, usa `expose: 3000`, conecta `web` a
`dokploy-network` y configura el dominio de Dokploy apuntando al puerto interno
3000.

### `all predefined address pools have been fully subnetted`

No fuerces Docker a crear redes bridge por proyecto. En Swarm, usa la red overlay
externa/interna gestionada por el clúster y elimina redes duplicadas o huérfanas
solo después de verificar que ningún servicio las usa.

### `pull access denied` o `No such image`

Verifica que:

- El tag existe en el registry.
- Todos los nodos pueden resolver y alcanzar el registry.
- Dokploy tiene credenciales `read:packages` para el paquete privado.
- El Registry URL es exactamente `ghcr.io`.
- El Image Prefix coincide con `ghcr.io/digital-media-group`.
- El usuario es el username GitHub, no el email.
- El deploy usa `--with-registry-auth`.
- El tag del compose coincide con el tag publicado por CI.

### El job `migrate` reinicia o la web arranca sin migrar

Es un diseño incompatible con Swarm. Mueve `prisma migrate deploy` y los
scripts idempotentes al entrypoint de `web`, protégelos con advisory lock y
elimina la dependencia one-shot.

### El dominio no responde tras crearlo

Comprueba que:

- El servicio está conectado a la red externa de Dokploy.
- El dominio apunta al nombre exacto del servicio.
- El puerto interno coincide con el puerto del contenedor.
- Se hizo redeploy después de crear el dominio.

## Resultado esperado

Un Stack de Dokploy que funciona con un único nodo desde el primer día, pero que
ya tiene la misma imagen, red, persistencia, migraciones, healthchecks, registry
y flujo de rollback necesarios para añadir nodos sin cambiar el modo de
operación.

## Seguridad

Nivel de riesgo: **high**.

- No guardes secretos en Git, Compose, dumps ni imágenes.
- Usa el panel Dokploy o un gestor de secretos para variables sensibles.
- Mantén el paquete de registry privado y usa tokens de solo lectura en nodos.
- Haz backup verificable antes de migrar PostgreSQL o ejecutar un import.
- No borres volúmenes, stacks ni nodos sin aprobación y plan de rollback.
- Protege `production` con PR obligatorio y revisión de propietario.
