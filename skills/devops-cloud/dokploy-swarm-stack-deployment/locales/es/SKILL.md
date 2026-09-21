# Despliegue Dokploy en modo Stack (Swarm) multi-nodo

## Propósito

Desplegar una aplicación en Dokploy con **Compose Type "Stack"** (`docker stack deploy`, Swarm) dejándola lista para escalar a varios nodos, con la imagen publicada en un registry externo (GHCR) y sin depender de trucos de build en el servidor.

## Cuándo utilizarla

- El proyecto ya está contenedorizado (Dockerfile con target de runtime) y se despliega en Dokploy.
- Está previsto añadir nodos al clúster (escala horizontal) o usar `docker service scale`.
- Se quiere un pipeline reproducible: CI construye la imagen, Swarm hace pull.

## Cuándo no utilizarla

- Despliegue de un solo nodo sin planes de escalar: el Compose Type "Docker Compose" de Dokploy es más simple (construye con su comando por defecto).
- La imagen no puede salir a un registry externo por política de seguridad.
- La aplicación depende de servicios one-shot con `depends_on` conditions: deben refactorizarse primero (ver Procedimiento, paso 2).

## Información necesaria

- Repositorio Git, rama de despliegue protegida (p. ej. `production`) y workflow de CI/CD.
- Dominio público y variables de entorno de la aplicación (nunca secretos en el repo).
- Acceso al panel Dokploy y, si algo falla, SSH al servidor para limpieza.
- Nombre del servicio Compose de Dokploy (aparece en la URL del proyecto).

## Procedimiento

1. **Elige el Compose Type "Stack" al crear el servicio** (Dokploy → Create Service → Compose). No se puede cambiar después: hay que recrear el servicio.

2. **Adapta el `docker-compose.yml` a las restricciones de Swarm**:
   - Sin servicios one-shot ni `depends_on` con condiciones (Swarm los ignora).
   - Migraciones y bootstrap de datos iniciales: muévelos a un **entrypoint** de la imagen que se ejecute antes de arrancar el proceso principal. Debe ser idempotente y usar un advisory lock de base de datos para serializar arranques simultáneos.
   - `env_file` en sintaxis corta (`- .env`): el validador de Stack rechaza la sintaxis larga (`path:`/`required:`).
   - `web` con `expose` (puerto interno), no `ports`: Traefik publica el dominio.
   - Sección `deploy:` con `restart_policy` para cada servicio.

3. **Publica la imagen en un registry (obligatorio para multi-nodo)**:
   - Swarm **no construye imágenes** con `docker stack deploy`: solo hace `pull` de `image:`.
   - Una imagen local en el manager **no sirve** para nodos workers: cada nodo necesita hacer pull.
   - Añade al workflow de release un job `build-push` que construya el target de runtime y lo publique con dos tags: uno móvil (`production`) que usa el compose, y uno inmutable por SHA para rollback. En GHCR basta `GITHUB_TOKEN` con `packages: write`.
   - Declara `image: ghcr.io/<org>/<repo>:production` en el compose. El paquete nace **privado por defecto** (repositorio privado): déjalo así y registra el registry en Dokploy con un **Personal Access Token de GitHub** de scope `read:packages` para que el manager y todos los nodos puedan hacer `pull`. Nunca hagas el paquete público.

4. **Configura el servicio en Dokploy**:
   - Provider Git, rama de despliegue, Compose Path.
   - **Deja el custom command VACÍO**: el Default Command (`docker stack deploy ... --with-registry-auth`) es suficiente una vez la imagen vive en el registry. Dokploy antepone `docker` automáticamente y su validador rechaza comandos encadenados que no empiecen por `docker compose`.
   - Pestaña Environment: pega las variables en modo Raw (Dokploy genera el `.env` junto al compose).
   - Copia el Deploy Webhook y guárdalo como secreto del entorno en GitHub.

5. **Añade el dominio**: Dokploy → Domains → dominio público, servicio `web`, puerto interno, HTTPS con Let's Encrypt.

6. **Verifica el despliegue**:
   - Containers: tareas con nombre `<stack>_<service>.1.<id>` (formato Swarm).
   - Logs de `web`: entrypoint (migraciones + bootstrap) y luego el proceso principal.
   - `GET /api/health` (o healthcheck equivalente) responde `200`.

7. **Prepara la escala a multi-nodo** (documentado, sin ejecutar aún):
   - Registra el servidor del nodo en Dokploy → Settings → Remote Servers.
   - Únelo con `docker swarm join` usando el token del manager.
   - Escala con `docker service scale <stack>_web=2`; con constraints si `db`/`worker` deben fijarse al manager.
   - Los nodos nuevos hacen pull del registry sin pasos manuales.

## Validación

- El deploy termina sin `pull access denied` ni `No such image`: la imagen del registry existe y el compose la referencia.
- Los 3 tipos de servicio (base de datos, web, worker) tienen tareas en estado `running` y el healthcheck de `web` pasa.
- Un segundo deploy (redeploy) es idempotente: las migraciones no duplican datos ni fallan.
- El dominio sirve la aplicación con HTTPS y `docker stack ls` lista el stack.
- Simular el arranque simultáneo de web y worker (o redimensionar) no corrompe la base de datos: el advisory lock del entrypoint serializa las migraciones.

## Resultado esperado

Servicio Compose de Dokploy operativo en modo Stack, pipeline `merge → build → push al registry → webhook → stack deploy`, documentación de operación (dominio, variables, webhooks, rollback por SHA) y ruta verificada para añadir nodos.

## Seguridad

Nivel de riesgo: **high**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa. Reglas específicas:

- Nunca guardes secretos en el compose ni en el repositorio: viven en Dokploy (Environment) o en el gestor de secretos.
- El paquete de imagen del registry expone el código compilado y es **privado**: no cambies su visibilidad. El PAT de `read:packages` es una credencial de solo lectura; configúrala solo en Dokploy (Settings → Registries) y rótala si cambia de manos. Verifica en GitHub → Packages que la visibilidad es "Private" tras el primer push del workflow.
- `docker stack rm` y borrar volúmenes son destructivos: confirma antes y verifica que no hay datos de producción en ellos.
- Protege la rama de despliegue (PR obligatorio) y usa CODEOWNERS para exigir aprobación del propietario.
