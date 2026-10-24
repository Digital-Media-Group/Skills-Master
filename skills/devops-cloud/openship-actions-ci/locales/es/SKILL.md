# CI con OpenShip Actions y runners propios

## Propósito

Ejecutar las validaciones de CI en infraestructura propia cuando GitHub Actions alojado no está disponible (por ejemplo, bloqueo de facturación de la organización) o cuando se prefieren runners propios. OpenShip Actions, disponible desde OpenShip v0.9.0, ofrece dos modos: workflows independientes en `.openship/workflows/` ejecutados por OpenShip, y workflows existentes de GitHub ejecutados en runners self-hosted oficiales registrados en destinos OpenShip.

## Cuándo utilizarla

- La organización tiene GitHub Actions alojado bloqueado o limitado y hay una instancia OpenShip (por ejemplo Atlas) con la sección Actions.
- Se quieren ejecutar validaciones (typecheck, lint, tests, build) en servidores propios con Checks publicados en GitHub.
- Ya existe un workflow de GitHub y basta con apuntarlo a un runner self-hosted.

## Cuándo no utilizarla

- El repositorio necesita runners Windows o GitHub Enterprise Server: no soportados.
- Se depende de protected environments o attestations de GitHub: la ejecución independiente no los implementa.
- El código viene de forks sin revisar: los forks se bloquean por defecto y solo se admiten con aprobación explícita y runners desechables sin secretos privilegiados.
- Un run independiente nuevo no reanuda ni sustituye un run fallido de GitHub; si se exige continuidad exacta, repite el mismo SHA y documéntalo.

## Información necesaria

- Versión de la instancia (Actions requiere v0.9.0 o superior) verificada en el panel: una versión compatible no demuestra que la función esté configurada y operativa.
- Destino de ejecución con SO, arquitectura y herramientas reportadas por capacidades verificadas; los runners Linux soportan imágenes de contenedor y los macOS usan herramientas nativas.
- Conexión GitHub de la instancia (token o App) para importar workflows y publicar Checks de commit.
- Etiquetas de runner, política de acceso por workflow y regla de aprobaciones (actor, commit, intento y destinos).
- Inventario de workflows afectados y qué etiquetas `runs-on` deben cambiar a self-hosted.

## Procedimiento

1. Verifica la capacidad en la instancia: sección Actions en el panel, al menos un runner en estado Ready y la conexión GitHub activa en Settings.
2. Elige el modo por repositorio:
   - Coordinado con GitHub: registra un runner self-hosted oficial en un destino OpenShip y apunta `runs-on` a sus etiquetas self-hosted. GitHub conserva orquestación, secretos, environments y Checks; los jobs con etiquetas alojadas en GitHub siguen ejecutándose en GitHub. Importar un workflow no cambia su plataforma de ejecución por sí solo.
   - Independiente: crea o importa workflows en `.openship/workflows/` con YAML estilo GitHub; ejecútalos manualmente, por push/PR, en schedule, por dispatch autenticado o desde Jobs. GitHub aporta fuente, eventos y Checks de commit sin ejecutar nada.
3. Edita el workflow con el editor único (vistas Topology, List y YAML sobre el mismo borrador), conecta jobs y dependencias, y define reglas de trigger por archivo y por rama.
4. Limita el acceso del workflow a la cuenta o a usuarios seleccionados del repositorio, con aprobación requerida por intento; la aprobación vincula actor, commit, intento y destinos.
5. Ejecuta y sigue los runs: logs enmascarados junto a jobs y pasos, vista de topología y pestaña de approvals separada. Los runs independientes usan artifacts/caches con almacenamiento de alcance limitado; los jobs con `id-token: write` reciben tokens OIDC de la propia instancia, no de GitHub.
6. Ante un fallo, distingue causa de aplicación (exit code del job) de causa de infraestructura (runner no Ready, imagen no disponible) antes de cambiar código o runners.

## Alternativa endurecida en Dokploy

Cuando OpenShip Actions no aplique, un runner self-hosted de GitHub Actions puede desplegarse como servicio Docker Compose en Dokploy:

- Token fine-grained limitado al repositorio, guardado como secreto de Dokploy; el proceso que ejecuta jobs no conserva el token de registro.
- Sin montar `/var/run/docker.sock` (enmascararlo con `/dev/null`), sin `privileged` ni `network_mode: host`, sin unir redes de otras aplicaciones y sin volúmenes externos al proyecto.
- Credenciales y bases de datos de CI desechables; nunca secretos de Preview o Production en el runner.
- Verificación: el runner aparece Idle en Settings -> Actions -> Runners del repositorio y un workflow de diagnóstico ejecuta sus pasos en él.

## Validación

- Runner registrado y Ready/Idle en el panel de OpenShip o en Settings -> Actions -> Runners de GitHub.
- Un run de diagnóstico ejecuta todos sus pasos en el destino propio y publica el Check en el commit.
- Los logs no contienen secretos y las aprobaciones quedan registradas.
- El despliegue de la aplicación no depende de la CI: el build de despliegue sigue su propio camino.

## Resultado esperado

Validaciones ejecutándose en infraestructura propia, con Checks visibles en GitHub, runners etiquetados y listos, acceso por workflow restringido con aprobaciones, y una alternativa Dokploy endurecida documentada para los repositorios donde OpenShip Actions no aplique.

## Seguridad

Nivel de riesgo: **high**. Los runners nativos o con socket Docker del host ejecutan código con el acceso de ese usuario del servidor: resérvalos para código confiable y usa runners desechables para mayor aislamiento. Mantén los forks bloqueados por defecto. No desactives aprobaciones ni amplíes el alcance de tokens sin autorización explícita. Nunca guardes secretos en Git, workflows, logs o chat.
