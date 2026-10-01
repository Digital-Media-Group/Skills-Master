# Runbook de migración OpenShip

## Preflight

- Identificar proyecto, entorno, rama, servidor y deployment IDs.
- Confirmar que el destino PostgreSQL/volumen no contiene datos o que existe un plan de merge.
- Crear backup completo del origen y obtener evidencia de restauración.
- Registrar conteos de tablas, migraciones, usuarios/cuentas, catálogo, precios, contenido y
  relaciones externas.

## Preview

1. Crear PostgreSQL y volumen Preview.
2. Restaurar el backup completo de Neon/origen.
3. Invalidar sesiones efímeras y mantener usuarios/cuentas.
4. Aplicar migraciones faltantes de forma idempotente.
5. Cargar solo variables Preview.
6. Desplegar `Preview` usando el ID interno de Preview.
7. Poll del deployment hasta `ready` y comprobar todos los servicios.
8. Probar health, login, admin, precios, catálogo, formularios, WHMCS y cron.

## Production

1. Obtener aprobación humana de Production.
2. Congelar escrituras y generar backup/delta final.
3. Restaurar Production en su volumen independiente.
4. Aplicar migraciones.
5. Desplegar el mismo commit/candidato validado.
6. Mantener mantenimiento hasta completar smoke tests.
7. Cambiar Cloudflare únicamente para registros web aprobados.
8. Observar, conservar rollback y retirar el proveedor anterior solo tras cierre.

## Evidencia mínima

- source project/branch/database;
- backup ID, tamaño, checksum y restore rehearsal;
- destination project/environment/database/volume IDs;
- migration ledger antes/después;
- candidate commit/deployment ID;
- service readiness;
- health/login/admin/catalog/price/WHMCS/cron checks;
- DNS/TLS response;
- rollback decision and owner.
