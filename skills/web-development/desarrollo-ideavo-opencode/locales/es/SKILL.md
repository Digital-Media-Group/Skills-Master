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
- Plataforma de CI/CD y despliegue: OpenShip/Atlas Actions como vía preferente y Dokploy endurecido como alternativa (skill `openship-actions-ci`); GitHub Actions hospedado, Neon y Vercel no deben aportar cómputo de pipelines o entornos de prueba salvo una decisión explícita.
- Gestión de configuración: durante desarrollo no se requieren variables de entorno salvo que una dependencia real las exija antes de Preview.

### MCP requeridos

Comprueba que el entorno del agente tiene habilitados estos MCP antes de iniciar tareas que dependan de sus capacidades:

- **Playwright**: automatización de navegador, verificación visual, pruebas E2E y smoke tests seguros.
- **Dokploy MCP**: operación autorizada de proyectos, entornos, despliegues, variables y logs en Dokploy.
- **OpenShip MCP**: operación autorizada de proyectos, entornos, despliegues y runners de Actions en OpenShip/Atlas.
- **Context7**: consulta de documentación actualizada y ejemplos de librerías o frameworks.
- **Firecrawl**: scraping y extracción de datos desde páginas web cuando la tarea lo requiera.
- **MCP GitHub**: operaciones de repositorio, ramas, issues, PRs, revisiones y checks mediante `https://api.githubcopilot.com/mcp/`.
- **Neon MCP** (solo si el proyecto usa Neon por decisión expresa): administración y consulta controlada de proyectos, ramas, bases de datos, migraciones y observabilidad.
- **Vercel MCP** (solo si el usuario lo autoriza para una finalidad concreta): consulta y operaciones autorizadas sobre proyectos, deployments, logs y analítica mediante `https://mcp.vercel.com`.
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

### Modelo de ramas y entornos

- Ramas: `master` (desarrollo) -> `preview` -> `production`, un proyecto con tres entornos y base de datos separada por entorno. Sin ramas de desarrollo extra: Ideavo autocommite cada sesión sobre `master`.
- El desarrollo ocurre en `master` (por ejemplo, en Ideavo); Preview y Production viven en el servidor (OpenShip/Atlas o Dokploy). Preview existe para validar y promocionar; no es un entorno permanente.
- Todo cambio se sube a GitHub. Los PR quedan abiertos sin fusionar salvo OK numerado de Carlos: cada merge a `master` lleva su OK numerado por PR, y la promoción a producción lleva su propio OK numerado.
- Antes de mutar Preview o Production: backup en destino S3 (Backblaze B2) con evidencia de restauración ensayada. Una respuesta 200 o una tarea encolada no demuestran que el backup sea restaurable.
- Las migraciones se diseñan y prueban siempre en desarrollo con bases aisladas. Preview valida la promoción del candidato ya ensayado; producción no es un entorno de pruebas. Las comprobaciones las ejecuta el agente, no el usuario.

### CI/CD y despliegues

- Ejecuta CI/CD y los entornos de prueba mediante OpenShip/Atlas Actions cuando la instancia lo soporte (skill `openship-actions-ci`) o, como alternativa endurecida, mediante Docker en Dokploy, reutilizando su cómputo para builds, tests, integración y validaciones.
- No uses recursos de pago ni cómputo de GitHub Actions para pipelines, builds o entornos de prueba. GitHub puede alojar el repositorio y el PR, pero no debe ejecutar el pipeline salvo autorización explícita.
- No uses cómputo de Neon ni Vercel para CI, builds o entornos de prueba. Neon se utiliza como persistencia aislada por entorno y Vercel solo si el usuario lo autoriza expresamente para una finalidad concreta.
- No crees previews automáticas ni despliegues automáticos desde una rama, PR o commit. Un despliegue a Preview o a cualquier rama distinta de producción requiere que el usuario acepte el PR antes de ejecutarse.
- No promociones directamente desde una rama de trabajo a producción. Tras la aceptación del PR, despliega desde Dokploy siguiendo la rama y el orden aprobados.
- Antes de consumir cómputo remoto, verifica que el job, entorno o deployment corresponde a la acción aprobada y evita duplicar ejecuciones pendientes.

### Aislamiento obligatorio del cómputo de pruebas

Anotación crítica: cualquier prueba de migración, test, gate o validación ejecutada vía CI/CD debe ejecutarse siempre en un entorno externo aislado (runner de OpenShip Actions o Docker en Dokploy), habitualmente conectado mediante MCP.

- En desarrollo, ninguna prueba de migración ni ejecución de CI/CD se hace directamente desde Vercel, Neon ni cualquier otro cómputo exterior. Siempre se enruta al entorno aislado de OpenShip Actions o Dokploy.
- En Preview, aunque la base de datos esté en un proveedor externo, las pruebas, migraciones y gates se ejecutan en un entorno aislado (OpenShip Actions o Dokploy) contra una copia o rama de datos desechable; nunca contra el servicio que sirve el tráfico.
- Las migraciones entre entornos, las pruebas de gates y las verificaciones de despliegue también se aíslan en OpenShip Actions o Dokploy antes de tocar el entorno de destino.
- La finalidad es ahorrar cómputo de proveedores externos (Neon, Vercel u otros operadores de despliegue): su cómputo queda reservado para servir tráfico real autorizado, no para ejecutar pruebas.
- Gestiona este enrutamiento de forma automática según el workflow activo: detecta la fase actual (desarrollo, Preview, producción) y dirige cada prueba al entorno aislado de OpenShip Actions o Dokploy sin pedir confirmación rutinaria. Solo pregunta si ninguno de los dos está disponible o el workflow no permite el aislamiento.

### Migraciones: desarrollo primero y aplicación automática

- Diseña, corrige y prueba las migraciones siempre en desarrollo, con una base aislada y datos estructurales. No utilices Preview ni producción para descubrir o reparar por primera vez una migración.
- Versiona SQL, journal/manifest, dependencias y pruebas con el cambio funcional. Ensaya tanto instalación desde cero como actualización desde el esquema anterior; compara el ledger y el esquema efectivo, no solo el número de archivos. Comprueba el segundo pase sin cambios, permisos, integridad, compatibilidad entre versiones y recuperación ante fallo parcial.
- Prepara en desarrollo el paso de migración del pipeline. En una promoción autorizada a Preview o producción, el pipeline aplica automáticamente solo las migraciones pendientes del mismo candidato validado, sin SQL manual ni nuevas preguntas por cada paso rutinario.
- La automatización de la aplicación no autoriza un merge, una promoción ni cambios fuera de alcance. Mantén el OK numerado del PR y la autorización de la versión y entorno; una migración destructiva o un riesgo nuevo exige su decisión específica. Este procedimiento no ejecuta ni habilita despliegues por sí mismo.
- Antes de aplicar: identifica la base de destino y su entorno, bloquea ejecuciones concurrentes, verifica el ledger, fija el SHA/digest aprobado y genera un backup en S3/B2 con checksum, fecha y prueba de restauración aislada verificable. Si falta una precondición, detén el pipeline antes de cambiar datos o tráfico.
- Separa instalación inicial o traslado de datos de la migración incremental de esquema. No restaures una copia sobre una base activa como paso rutinario de release y nunca ejecutes semillas de desarrollo en producción.
- Conserva una vía de rollback ensayada para aplicación y datos. Prioriza migraciones expand/contract compatibles con la versión anterior. No asumas que bajar la imagen revierte el esquema ni que todo DDL es transaccional; si hace falta restaurar datos, protege las escrituras posteriores y respeta el RPO/RTO aprobado. No hagas un down destructivo automático no ensayado.
- Ante fallo: corta la promoción y el tráfico nuevo, conserva logs y ledger, ejecuta únicamente la recuperación ya ensayada y autorizada y verifica salud e integridad. Si la recuperación automática no es segura, deja el entorno detenido de forma controlada y escala; no improvises SQL en Preview o producción.
- Cierra el pipeline con evidencia: entorno y base, SHA/digest, migraciones previstas/aplicadas, backup y restore verificados, resultado de smoke tests, estado del rollback y bloqueos. Una aplicación correcta de migraciones no equivale por sí sola a aceptación funcional de Preview o producción.

### Persistencia por entorno

- Por defecto, cada entorno usa PostgreSQL propio en el servidor del proyecto (Atlas o Dokploy), con base y credenciales separadas para desarrollo, preview y production.
- Neon solo se usa como persistencia por decisión expresa del usuario; en ese caso crea y mantén las ramas `dev`, `preview` y `production` en la región disponible más próxima a Europa, dejando registrada la región elegida.
- Aísla credenciales, datos de prueba y migraciones por entorno; nunca uses datos de producción para desarrollo, Preview o tests.
- El entorno de desarrollo sirve para desarrollo y pruebas locales integradas; `preview` solo después de la aceptación del PR; `production` queda reservado para producción y sus migraciones aprobadas.
- Antes de crear bases o aplicar migraciones remotas, comprueba el proyecto, la región, el propietario, el nombre de la base y el origen. No borres ni reinicies bases sin autorización explícita.

### Variables de entorno

- En desarrollo, no solicites ni configures variables de entorno por defecto. Prioriza mocks, stubs, fixtures y defaults seguros que permitan trabajar sin secretos.
- Si una dependencia exige una variable antes de Preview, identifica la variable, explica por qué es necesaria y usa únicamente un valor local, de test o sandbox con permisos mínimos.
- Prepara las variables reales necesarias durante la fase de Preview, separadas por entorno y gestionadas en Dokploy o el sistema autorizado de secretos; nunca las pegues en el chat, commits o archivos versionados.
- Nunca reutilices variables de producción en desarrollo o Preview. Las credenciales de desarrollo, preview y production deben permanecer aisladas.

### Autologin por rol solo en desarrollo

Cuando el proyecto tenga login con roles, implementa autologin por rol SOLO para el entorno de desarrollo (por ejemplo, dentro de Ideavo), para probar el login y el dashboard de cada rol sin escribir credenciales:

- Doble condición fail-closed: exige `APP_ENV=development` (o el equivalente del framework) Y un flag explícito `DEV_AUTOLOGIN=true`. Con cualquier otro valor, o si falta alguno, el autologin no existe.
- Imposible en preview/production: el código comprueba el entorno en tiempo de ejecución y aborta el arranque si el flag aparece fuera de desarrollo; el flag nunca se define en las variables de Preview/Production; añade una guarda de build o CI que falle si el código de autologin queda incluido en un build de preview o production.
- Solo las cuentas de rol estructurales de la seed de desarrollo (una por rol relevante, creadas por el CRUD); nunca credenciales ni datos de usuarios reales.
- Ofrece un selector de rol visible únicamente en desarrollo para cambiar de rol al probar.
- Añade una prueba de regresión que verifique que en preview/production el autologin está ausente y que las rutas protegidas exigen autenticación real.
- Nunca expongas el autologin en rutas públicas ni lo uses para saltarte la autorización por operación fuera de desarrollo.

### Datos semilla en desarrollo

- Regla general: NUNCA datos de ejemplo, mock, placeholders ni fixtures "de prueba" en ningún entorno (nada de lorem ipsum ni registros "test/demo" que luego haya que localizar y limpiar): retirarlos después cuesta más que crearlos bien. Todo se crea a través del CRUD real de la aplicación, como datos funcionales desde el primer momento.
- La base de datos de desarrollo se siembra siempre con datos reales y estructurales: roles y su matriz de permisos, catálogos, configuración base y las cuentas estructurales por rol. Un script idempotente (al arrancar el entorno o con un comando documentado) la deja lista para probar las novedades de la rama `master` (por ejemplo, en Ideavo) sin preparación manual.
- Cada función nueva o cambio de API o esquema de base de datos debe incluir en `master` las ampliaciones o ajustes de semillas necesarios para probar sus casos, relaciones y permisos. No se da por completo el cambio hasta que las semillas cubran la nueva función.
- Actualizar el código de semillas no autoriza su ejecución sobre una base de datos real: las escrituras mantienen su aprobación propia. Las semillas de desarrollo y preview siguen separadas y nunca se cargan en producción.
- La seed es determinista y reseteable; se regenera desde cero sin pasos manuales y no deja anotaciones que limpiar después.
- El sembrado pasa por el CRUD o los servicios de la aplicación, nunca por SQL que se salte sus validaciones: cada registro sembrado es válido y funcional.
- Los registros funcionales adicionales se crean por el CRUD con contenido realista y válido, nunca marcados como desechables.
- Nunca datos personales ni copiados de producción; estructural y funcional generado únicamente.
- La seed de desarrollo nunca se ejecuta en preview ni en production: misma guarda fail-closed que el autologin. Production es migrations-only y nunca recibe seed ni fixtures.
- Preview mantiene su propia seed completa para las pruebas previas a producción; Stripe (o el proveedor de pagos) permanece siempre en modo test en Preview.

## Validación

- Los comandos indicados por el repositorio se ejecutan con su gestor de paquetes y el resultado se registra.
- Las pruebas cubren rutas felices, entradas inválidas, permisos y errores relevantes al riesgo.
- Las migraciones se aplican desde cero en un entorno aislado y no usan datos de producción.
- Las superficies remotas se comprueban con smoke tests read-only; no se inventan métricas, logs, tests ni deployments.
- El diff no contiene secretos, tokens, PII ni cambios ajenos; `git diff --check` pasa cuando corresponde.
- El criterio de terminado y todo bloqueo externo quedan documentados.
- La validación de CI/CD se ejecuta en OpenShip Actions o Dokploy y no consume cómputo de pago de GitHub Actions, Neon o Vercel.
- Toda prueba de migración, gate o validación se ejecutó en el entorno aislado (OpenShip Actions o Dokploy), incluso en Preview y con base de datos externa.
- Los despliegues de Preview y de ramas no se ejecutan automáticamente; existe aceptación del PR registrada antes de ejecutarlos.
- Cada entorno tiene su base y credenciales separadas (desarrollo, preview, production); Neon solo si se decidió expresamente.
- El autologin por rol funciona solo con `APP_ENV=development` y `DEV_AUTOLOGIN=true`, está ausente en preview/production y su guarda de regresión pasa.
- La seed de desarrollo es idempotente, estructural y reseteable, sin datos mock ni de ejemplo; production no recibe seed.
- Ningún cambio introduce datos de ejemplo, mock ni placeholders; los datos se crean por el CRUD real.
- Existe backup en S3/B2 con restauración ensayada antes de mutar Preview o Production, y consta el OK numerado de Carlos para cada merge a `master` y para la promoción a producción.
- Los MCP necesarios están disponibles y sus permisos son suficientes, mínimos y verificables para la tarea.
- Existe una planificación completa, las tareas son autocontenidas y la atención humana se solicitó solo por un bloqueo o aprobación necesaria.
- El desarrollo avanza sin variables de entorno salvo necesidad técnica demostrada; las variables reales se configuran en Preview y permanecen separadas por entorno.
- El cierre de sesión tiene un checkpoint explícito y ninguna firma o promoción depende del siguiente mensaje.
- Las firmas y evidencias de Preview o producción corresponden al SHA exacto que se va a promocionar.

## Resultado esperado

Software funcional con cambios mínimos, validación proporcional al riesgo, seguridad revisada, trazabilidad completa y una respuesta final breve que distingue hechos confirmados de pendientes.

## Seguridad

Nivel de riesgo: **high**. Nunca pegues secretos en respuestas, logs, commits, issues o documentación. No solicites contraseñas, cookies, claves API o tokens por chat. Exige aprobación explícita para producción, facturación, credenciales, migraciones destructivas, pagos, borrados, cambios de roles, consumo de cómputo externo y force push. No uses datos de producción para pruebas ni elimines cambios del usuario. El autologin por rol y la seed de desarrollo nunca se activan fuera del entorno de desarrollo; si un despliegue de preview o production los expone, trátalo como incidente y retíralo de inmediato.
