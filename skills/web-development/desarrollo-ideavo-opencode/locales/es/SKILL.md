# Desarrollo IDEAVO - OpenCode

## Propósito

Actuar como un agente de desarrollo orientado a entregar cambios seguros, verificables y mantenibles dentro de OpenCode. Mantén trazabilidad entre la petición, el repositorio, los cambios, las pruebas y la entrega. Compilar no demuestra por sí solo que una funcionalidad sea correcta.

## Cuándo utilizarla

- Crear una aplicación o servicio, añadir funcionalidad, corregir bugs o refactorizar.
- Modificar interfaces web o añadir autenticación, bases de datos, pagos, colas o almacenamiento.
- Preparar, validar o promover despliegues.
- Revisar rendimiento, accesibilidad, SEO, seguridad o calidad.
- Investigar fallos de CI, GitHub Actions, Vercel, bases de datos o runtime.

## Cuándo no utilizarla

- Una tarea puramente documental que no cambia código, configuración ni entrega técnica.
- Cuando exista una instrucción de mayor prioridad incompatible con esta skill; en ese caso respeta el orden de precedencia y documenta el conflicto.

## Información necesaria

- Petición del usuario, estructura del repositorio y estado de `git`.
- `AGENTS.md`, `CONTRIBUTING.md`, runbooks y documentación de release.
- Framework, lenguaje, gestor de paquetes, arquitectura, scripts y configuración.
- Integraciones externas, variables de entorno, accesos requeridos y criterio de terminado.

## Procedimiento

1. Inspecciona antes de editar: instrucciones, árbol de trabajo, rama, remotos, lockfile, configuración, rutas afectadas, tests e integraciones.
2. Preserva los cambios ajenos. Nunca uses `git reset --hard`, `git checkout --`, `git clean -fd` ni otros comandos destructivos salvo petición explícita.
3. Define alcance, archivos probables, riesgos, pruebas y acciones que requieren aprobación. En trabajos de tres o más fases, usa una lista con una sola tarea activa.
4. Cambia lo mínimo necesario. Conserva arquitectura, APIs, convenciones, imports y estructura existentes; evita dependencias y refactors innecesarios.
5. Aplica seguridad por defecto: no expongas secretos, valida entradas en el borde, protege recursos y no pruebes pagos, borrados, migraciones o mutaciones destructivas contra producción sin autorización explícita.
6. Para APIs valida método, autenticación, autorización, body, query, parámetros, headers, errores, límites, paginación, timeouts e idempotencia.
7. Para frontend cubre estados de carga, vacío, error y éxito; comprueba escritorio, móvil, teclado, foco, contraste, metadata y rendimiento real.
8. Para bases de datos detecta el ORM existente, conserva datos, usa migraciones compatibles, prueba en una base aislada y nunca ejecutes SQL destructivo de forma autónoma.
9. Para autenticación protege endpoints y recursos, aplica autorización por operación y prueba usuario anónimo, normal, administrador y roles especiales.
10. Para integraciones externas usa sandbox o Preview, permisos mínimos, idempotencia, backoff, timeouts y límites; no ejecutes operaciones reales sin aprobación.
11. Clasifica la validación por riesgo: N1 documentación/estilos; N2 UI o lógica; N3 APIs, auth, storage o integraciones; N4 migraciones, pagos, seguridad crítica o producción.
12. Ejecuta como mínimo `typecheck -> tests afectados -> lint focalizado -> diff check`. En N3/N4 añade build, integración, E2E, preflight y smoke remoto de solo lectura.
13. No afirmes resultados no observados. Marca cada conclusión como `Confirmado`, `Inferido` o `Pendiente`.
14. Respeta Git: no hagas commit ni push salvo petición o runbook; no hagas amend salvo autorización; nunca hagas force push a ramas protegidas.
15. Tras un despliegue confirma SHA, estado `READY`, aliases, build logs, errores runtime, rutas críticas y smoke tests seguros. Distingue errores históricos de errores nuevos.
16. Si se interrumpe la tarea, deja rama, SHA, PR o deployment, checks completados y pendientes, bloqueo, última operación y siguiente acción exacta.
17. Antes de responder revisa implementación, validaciones, diff y estado Git; cita rutas concretas y separa lo local, CI, Preview y producción.

## Validación

- Los comandos indicados por el repositorio se ejecutan con su gestor de paquetes y el resultado se registra.
- Las pruebas cubren rutas felices, entradas inválidas, permisos y errores relevantes al riesgo.
- Las migraciones se aplican desde cero en un entorno aislado y no usan datos de producción.
- Las superficies remotas se comprueban con smoke tests read-only; no se inventan métricas, logs, tests ni deployments.
- El diff no contiene secretos, tokens, PII ni cambios ajenos; `git diff --check` pasa cuando corresponde.
- El criterio de terminado y todo bloqueo externo quedan documentados.

## Resultado esperado

Software funcional con cambios mínimos, validación proporcional al riesgo, seguridad revisada, trazabilidad completa y una respuesta final breve que distingue hechos confirmados de pendientes.

## Seguridad

Nivel de riesgo: **high**. Nunca pegues secretos en respuestas, logs, commits, issues o documentación. No solicites contraseñas, cookies, claves API o tokens por chat. Exige aprobación explícita para producción, facturación, credenciales, migraciones destructivas, pagos, borrados, cambios de roles y force push. No uses datos de producción para pruebas ni elimines cambios del usuario.
