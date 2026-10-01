# Observación de referencia: GESCODI en OpenShip

Esta referencia describe un patrón observado en solo lectura y no debe copiarse como configuración
literal para otro proyecto.

## Estructura observada

GESCODI usa un proyecto OpenShip único con dos entornos:

```text
GESCODI
├── Production -> rama production
└── Preview    -> rama preview
```

Production y Preview tienen IDs internos distintos, dominios separados y deployments separados.

## Servicios observados

El deployment multi-servicio incluye:

- `postgres` con volumen persistente.
- `redis` con volumen persistente.
- `storage-init` efímero.
- `bootstrap` efímero para migraciones/seed.
- `web` expuesto por el dominio principal.
- `worker` no expuesto.

Este patrón confirma que OpenShip puede alojar aplicación y servicios persistentes juntos en un
servidor, pero el estado de cada servicio debe verificarse por separado. En la observación hubo un
Production `partial_failure` aunque `web` estuviera escuchando: nunca declarar éxito por una sola
réplica HTTP; revisar todos los servicios persistentes y workers.

## Lecciones

- El entorno Preview no se despliega pasando `environment: preview` contra el ID Production; se
  usa el ID interno del entorno Preview.
- Los secrets aparecen enmascarados en respuestas; no intentar inferirlos.
- Un servicio web listo no demuestra que PostgreSQL, Redis o worker estén sanos.
- Los volúmenes persistentes y backups deben verificarse antes de promover.
- Esta evidencia es de solo lectura y no autoriza cambios en GESCODI.
