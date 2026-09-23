# Lecciones verificadas del despliegue Dokploy - 2026-09-23

- En el nodo único `atlas`, `start-first` con `max_replicas_per_node=1` dejó la nueva tarea pendiente por `no suitable node`; `stop-first` permitió converger sin borrar volúmenes.
- Las copias nativas de Dokploy Volume Backups son un gate válido para volúmenes Compose, pero `200`/encolado no prueba restaurabilidad: conserva el ID y exige verificar archivo o hacer restore rehearsal.
- Un Stack raw no usa el alias corto `web` en sus bindings. El servicio correcto es `<stack>_web`; el puerto interno Web validado fue `4000`.
- El build API-only usa una Application temporal a cero réplicas. Su imagen local puede consumirse solo en el nodo constructor con `--resolve-image never`; `RepoDigests=[]` no es publicación.
- `compose.readLogs` necesita `composeId` y `containerId`. Las tareas antiguas pueden quedar en Dokploy después de eliminarse del daemon y devolver `No such container`.
- Un deployment `done` no sustituye la comprobación de tareas, health, DNS, IPv4/IPv6, Traefik y los dos hosts.
- En esta ejecución, `www.gescodi.com` falló por IPv6 mientras IPv4 devolvía mantenimiento; el diagnóstico debe comparar familias antes de redeployar.
