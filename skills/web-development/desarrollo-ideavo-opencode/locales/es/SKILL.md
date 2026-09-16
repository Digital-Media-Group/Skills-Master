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
- Plataforma de CI/CD y despliegue: Dokploy; GitHub Actions, Neon y Vercel no deben aportar cómputo de pipelines o entornos de prueba salvo una decisión explícita.

### MCP requeridos

Comprueba que el entorno del agente tiene habilitados estos MCP antes de iniciar tareas que dependan de sus capacidades:

- **Playwright**: automatización de navegador, verificación visual, pruebas E2E y smoke tests seguros.
- **Neon**: administración y consulta controlada de proyectos, ramas, bases de datos, migraciones y observabilidad de Neon.
- **Context7**: consulta de documentación actualizada y ejemplos de librerías o frameworks.
- **Firecrawl**: scraping y extracción de datos desde páginas web cuando la tarea lo requiera.
- **MCP GitHub**: operaciones de repositorio, ramas, issues, PRs, revisiones y checks mediante `https://api.githubcopilot.com/mcp/`.
- **Vercel MCP**: consulta y operaciones autorizadas sobre proyectos, deployments, logs y analítica de Vercel mediante `https://mcp.vercel.com`.
- **Cloudflare MCP**: consulta y operaciones autorizadas sobre Workers, DNS, seguridad y otros servicios Cloudflare mediante `https://mcp.cloudflare.com/mcp`.

Estos MCP son dependencias del entorno, no una autorización implícita para actuar. Verifica disponibilidad, alcance y credenciales antes de usarlos; nunca solicites secretos por chat ni habilites recursos de pago automáticamente. Vercel MCP puede servir para consultar o administrar recursos autorizados, pero Vercel no se usa como cómputo de CI/CD o entornos de prueba.

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

### CI/CD y despliegues

- Ejecuta CI/CD y los entornos de prueba mediante Docker en Dokploy, reutilizando el cómputo de Dokploy para builds, tests, integración y validaciones.
- No uses recursos de pago ni cómputo de GitHub Actions para pipelines, builds o entornos de prueba. GitHub puede alojar el repositorio y el PR, pero no debe ejecutar el pipeline salvo autorización explícita.
- No uses cómputo de Neon ni Vercel para CI, builds o entornos de prueba. Neon se utiliza como persistencia aislada por entorno y Vercel solo si el usuario lo autoriza expresamente para una finalidad concreta.
- No crees previews automáticas ni despliegues automáticos desde una rama, PR o commit. Un despliegue a Preview o a cualquier rama distinta de producción requiere que el usuario acepte el PR antes de ejecutarse.
- No promociones directamente desde una rama de trabajo a producción. Tras la aceptación del PR, despliega desde Dokploy siguiendo la rama y el orden aprobados.
- Antes de consumir cómputo remoto, verifica que el job, entorno o deployment corresponde a la acción aprobada y evita duplicar ejecuciones pendientes.

### Ramas de Neon

- Para cada rama real del flujo de software crea y mantén tres ramas de Neon: `dev`, `preview` y `production`.
- Aísla credenciales, datos de prueba y migraciones por cada rama de Neon; no uses datos de producción para desarrollo, Preview o tests.
- Crea cada rama de Neon en la región disponible más próxima a Europa, dejando registrada la región elegida y la razón si no existe una opción europea adecuada.
- El entorno `dev` sirve para desarrollo y pruebas locales integradas; `preview` solo después de la aceptación del PR; `production` queda reservado para producción y sus migraciones aprobadas.
- Antes de crear ramas o aplicar migraciones remotas, comprueba el proyecto, la región, el propietario, el nombre de la base y la rama padre. No borres ni reinicies ramas sin autorización explícita.

## Validación

- Los comandos indicados por el repositorio se ejecutan con su gestor de paquetes y el resultado se registra.
- Las pruebas cubren rutas felices, entradas inválidas, permisos y errores relevantes al riesgo.
- Las migraciones se aplican desde cero en un entorno aislado y no usan datos de producción.
- Las superficies remotas se comprueban con smoke tests read-only; no se inventan métricas, logs, tests ni deployments.
- El diff no contiene secretos, tokens, PII ni cambios ajenos; `git diff --check` pasa cuando corresponde.
- El criterio de terminado y todo bloqueo externo quedan documentados.
- La validación de CI/CD se ejecuta en Dokploy y no consume cómputo de pago de GitHub Actions, Neon o Vercel.
- Los despliegues de Preview y de ramas no se ejecutan automáticamente; existe aceptación del PR registrada antes de ejecutarlos.
- Cada rama real tiene sus ramas Neon `dev`, `preview` y `production` en una región próxima a Europa.
- Los MCP necesarios están disponibles y sus permisos son suficientes, mínimos y verificables para la tarea.

## Resultado esperado

Software funcional con cambios mínimos, validación proporcional al riesgo, seguridad revisada, trazabilidad completa y una respuesta final breve que distingue hechos confirmados de pendientes.

## Seguridad

Nivel de riesgo: **high**. Nunca pegues secretos en respuestas, logs, commits, issues o documentación. No solicites contraseñas, cookies, claves API o tokens por chat. Exige aprobación explícita para producción, facturación, credenciales, migraciones destructivas, pagos, borrados, cambios de roles, consumo de cómputo externo y force push. No uses datos de producción para pruebas ni elimines cambios del usuario.
