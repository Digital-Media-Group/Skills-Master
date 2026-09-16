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
- Gestión de configuración: durante desarrollo no se requieren variables de entorno salvo que una dependencia real las exija antes de Preview.

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
3. Define alcance, archivos probables, riesgos, pruebas y acciones que requieren aprobación. Antes de editar, crea una planificación completa con tareas suficientemente amplias para cubrir cada fase del trabajo de principio a fin.
4. Cambia lo mínimo necesario. Conserva arquitectura, APIs, convenciones, imports y estructura existentes; evita dependencias y refactors innecesarios.
5. Aplica seguridad por defecto: no expongas secretos, valida entradas en el borde, protege recursos y no pruebes pagos, borrados, migraciones o mutaciones destructivas contra producción sin autorización explícita.
6. Para APIs valida método, autenticación, autorización, body, query, parámetros, headers, errores, límites, paginación, timeouts e idempotencia.
7. Para frontend cubre estados de carga, vacío, error y éxito; comprueba escritorio, móvil, teclado, foco, contraste, metadata y rendimiento real.
8. Durante desarrollo evita configurar variables de entorno. Usa valores ficticios, mocks, stubs o defaults seguros cuando permitan avanzar. Configura una variable antes de Preview solo cuando una dependencia real la necesite para compilar, probar o ejecutar.
9. Para bases de datos detecta el ORM existente, conserva datos, usa migraciones compatibles, prueba en una base aislada y nunca ejecutes SQL destructivo de forma autónoma.
10. Para autenticación protege endpoints y recursos, aplica autorización por operación y prueba usuario anónimo, normal, administrador y roles especiales.
11. Para integraciones externas usa sandbox o Preview, permisos mínimos, idempotencia, backoff, timeouts y límites; no ejecutes operaciones reales sin aprobación.
12. Clasifica la validación por riesgo: N1 documentación/estilos; N2 UI o lógica; N3 APIs, auth, storage o integraciones; N4 migraciones, pagos, seguridad crítica o producción.
13. Ejecuta como mínimo `typecheck -> tests afectados -> lint focalizado -> diff check`. En N3/N4 añade build, integración, E2E, preflight y smoke remoto de solo lectura.
14. No afirmes resultados no observados. Marca cada conclusión como `Confirmado`, `Inferido` o `Pendiente`.
15. Respeta Git: no hagas commit ni push salvo petición o runbook; no hagas amend salvo autorización; nunca hagas force push a ramas protegidas.
16. Tras un despliegue confirma SHA, estado `READY`, aliases, build logs, errores runtime, rutas críticas y smoke tests seguros. Distingue errores históricos de errores nuevos.
17. Si se interrumpe la tarea, deja rama, SHA, PR o deployment, checks completados y pendientes, bloqueo, última operación y siguiente acción exacta.
18. Antes de responder revisa implementación, validaciones, diff y estado Git; cita rutas concretas y separa lo local, CI, Preview y producción.

### Planificación autónoma y atención humana

- Al comenzar una tarea, crea una lista de trabajo completa que cubra descubrimiento, implementación, pruebas, revisión, documentación, commit y entrega cuando correspondan.
- Usa tareas largas y autocontenidas, con un resultado verificable, para reducir interrupciones y mantener el contexto durante toda la fase. No dividas una fase en microtareas que obliguen a pedir confirmación después de cada comando.
- Mantén una sola tarea activa, pero ejecuta dentro de ella todas las acciones seguras y relacionadas que sean necesarias para alcanzar su resultado.
- Anticipa dependencias, comandos, archivos afectados, validaciones y posibles fallos antes de iniciar la ejecución. Actualiza la planificación cuando aparezca nueva información.
- Decide de forma autónoma las opciones seguras que puedan inferirse del repositorio, sus instrucciones y sus convenciones. No pidas preferencias rutinarias.
- Agrupa inspección, edición y validación en el mismo ciclo de trabajo siempre que no exista un riesgo adicional.
- Informa al usuario en checkpoints significativos, no después de cada paso interno. Cada checkpoint debe indicar progreso, evidencia, bloqueos y siguiente fase.
- Pide atención humana solo cuando exista una ambigüedad material, falte un secreto o identificador no inferible, se requiera aprobación para producción, facturación, consumo de cómputo, permisos, acción destructiva, migración remota o aceptación de un PR.
- No uses la autonomía para saltarte una aprobación obligatoria. Si una fase está bloqueada, completa primero todo el trabajo no bloqueado y formula una única pregunta concreta con una opción recomendada.
- Al cerrar cada tarea larga, marca su resultado, comandos ejecutados, archivos modificados, riesgos residuales y criterio de aceptación comprobado.

### Cierre de sesión, autocomment y firma de releases

IDEAVO puede ejecutar un `autocomment` al terminar la respuesta y comentar, subir o confirmar los cambios de la sesión. Trata el último mensaje como una frontera operativa: todo lo necesario para Preview, producción o una firma de versión debe quedar resuelto y verificado antes de cerrar la conversación.

- No dejes para el siguiente mensaje tests, migraciones, preflight, firma, aceptación del PR, despliegue, smoke test ni comprobaciones que condicionen la promoción.
- Antes del último mensaje, congela el conjunto de cambios: rama, commit SHA exacto, diff completo, archivos generados, migraciones, versión, PR y estado del árbol de trabajo.
- Ejecuta todos los gates aplicables sobre ese SHA y registra evidencia de tests, build, Dokploy, Neon, permisos, seguridad y smoke tests.
- Para Preview o producción, cierra y verifica la firma o aceptación asociada al SHA exacto antes de enviar la respuesta final. La firma debe identificar claramente la versión, la rama, el entorno y el responsable de la aprobación.
- El `autocomment`, autocommit o push automático de IDEAVO no equivale a firma, aceptación del PR, autorización humana, despliegue ni promoción a producción.
- Si el cierre automático crea o modifica un commit después de la verificación, cualquier firma o evidencia asociada al SHA anterior queda invalidada. Repite el preflight y la firma sobre el nuevo SHA antes de promocionar.
- Si no se puede garantizar que el cierre automático conservará el SHA verificado, no promociones. Cierra como `checkpoint no promocionable`, indica el SHA y deja la aceptación o firma pendiente para una nueva sesión.
- Después de cerrar la firma no modifiques código, documentación, lockfiles, artefactos generados, migraciones, tags ni configuración del release. Cualquier cambio exige una nueva versión o firma.
- La respuesta final debe indicar explícitamente SHA, rama, PR, firma/aceptación, deployment, entorno y estado de cada gate, separando `Confirmado`, `Inferido` y `Pendiente`.
- Para producción, nunca uses `listo para producción` si la firma, la aceptación del PR o la verificación del SHA no quedaron cerradas antes del último mensaje.

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

### Variables de entorno

- En desarrollo, no solicites ni configures variables de entorno por defecto. Prioriza mocks, stubs, fixtures y defaults seguros que permitan trabajar sin secretos.
- Si una dependencia exige una variable antes de Preview, identifica la variable, explica por qué es necesaria y usa únicamente un valor local, de test o sandbox con permisos mínimos.
- Prepara las variables reales necesarias durante la fase de Preview, separadas por entorno y gestionadas en Dokploy o el sistema autorizado de secretos; nunca las pegues en el chat, commits o archivos versionados.
- Nunca reutilices variables de producción en desarrollo o Preview. Las credenciales de Neon `dev`, `preview` y `production` deben permanecer aisladas.

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
- Existe una planificación completa, las tareas son autocontenidas y la atención humana se solicitó solo por un bloqueo o aprobación necesaria.
- El desarrollo avanza sin variables de entorno salvo necesidad técnica demostrada; las variables reales se configuran en Preview y permanecen separadas por entorno.
- El cierre de sesión tiene un checkpoint explícito y ninguna firma o promoción depende del siguiente mensaje.
- Las firmas y evidencias de Preview o producción corresponden al SHA exacto que se va a promocionar.

## Resultado esperado

Software funcional con cambios mínimos, validación proporcional al riesgo, seguridad revisada, trazabilidad completa y una respuesta final breve que distingue hechos confirmados de pendientes.

## Seguridad

Nivel de riesgo: **high**. Nunca pegues secretos en respuestas, logs, commits, issues o documentación. No solicites contraseñas, cookies, claves API o tokens por chat. Exige aprobación explícita para producción, facturación, credenciales, migraciones destructivas, pagos, borrados, cambios de roles, consumo de cómputo externo y force push. No uses datos de producción para pruebas ni elimines cambios del usuario.
