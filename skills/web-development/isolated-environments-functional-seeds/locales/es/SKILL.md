# Entornos aislados, semillas funcionales y autologin DEV

## Propósito

Dejar un proyecto listo para probar funciones y permisos reales con datos semilla ficticios y funcionales guardados en su base de datos. Desarrollo, Preview y producción son destinos independientes, no tres nombres para la misma base. El autologin por usuario o rol pertenece únicamente a DEV.

Esta skill se añade a un proyecto cuando se necesita. Describe un procedimiento; instalarla no autoriza escrituras, creación de infraestructura, costes ni cambios de permisos.

## Cuándo utilizarla

- Al preparar una aplicación con login y varios roles para desarrollo integrado.
- Al añadir una función, API, relación o permiso que necesite nuevos casos persistidos.
- Al revisar si una demostración funciona de verdad o solo muestra respuestas simuladas.
- Al preparar datos de prueba propios de Preview, sin habilitar allí el autologin DEV.

## Cuándo no utilizarla

- Para cargar semillas en producción, copiar clientes reales o relajar sus controles.
- Como permiso de reinicio, borrado, migración, concesión de roles o envío a terceros.
- Para sustituir pruebas unitarias aisladas. Sus dobles y fixtures pueden ser útiles; no prueban integración ni pueden convertirse en implementación del producto.

## Información necesaria

- Instrucciones vigentes del propietario y aclaraciones posteriores, con su alcance.
- Rama y SHA, cambios concurrentes, esquema y ledger actuales, servicios y roles reales.
- Identidad verificable de cada base, servidor y entorno; usuarios, secretos y volúmenes separados.
- Autenticación y autorización existentes, acceso de red al sandbox y proveedores con efectos externos.
- Copia y recuperación adecuadas al riesgo antes de cambiar un destino con datos.

## Procedimiento

### 1. Fijar la matriz de entornos

Registra para DEV, Preview y producción: proyecto, servidor, base, rol de aplicación, rol de migración si existe, referencia del secreto, volumen, origen web y efectos permitidos. No incluyas valores secretos.

- DEV tiene su propia base, usuarios y contraseñas. Mantiene semillas ficticias funcionales para probar la rama de trabajo.
- Preview tiene su propia base, usuarios y contraseñas. Usa sus propias semillas ficticias cuando se necesiten y permanece protegida contra acceso público. Los pagos usan test, nunca live.
- Producción contiene datos reales, sin semillas de prueba ni accesos DEV.
- No compartas credenciales, cookies, sesiones, claves de firma ni accesos entre entornos. Un nombre que contiene `dev` no acredita aislamiento.

Lee el estado real antes de crear. Verifica propietario, consumidores y montaje de volúmenes, redes, puertos y destino efectivo. Ante colisión, no adoptes ni borres recursos ajenos. Un puerto declarado no prueba un listener; una conexión TCP no prueba autenticación ni persistencia.

### 2. Separar esquema, semillas y efectos

Inspecciona qué ejecuta realmente cada comando y qué dispara el primer acceso a la aplicación. Un login puede aplicar migraciones automáticamente. No lo uses como simple sonda si aún no hay autorización para ese efecto.

Aplica por fases: conectividad y metadatos; esquema autorizado; semillas autorizadas; autenticación; pruebas funcionales y por rol. Mantén el usuario de aplicación sin superusuario, creación de bases, creación de roles ni bypass de RLS. No concedas propiedad o permisos DDL por comodidad para que pase un migrador.

Ensaya migraciones en DEV aislado, desde cero y desde la versión anterior, con ledger, integridad, segundo pase y recuperación. Promover código o ejecutar migraciones en Preview o producción mantiene sus propios gates y aprobaciones.

### 3. Crear semillas funcionales persistidas

Inventa registros de prueba coherentes y claramente separados de personas reales. Deben atravesar las validaciones, servicios y persistencia reales del producto: un usuario autentica, una relación existe, una operación autorizada guarda y una operación prohibida se rechaza.

- Cubre cada rol efectivo y las relaciones necesarias por módulo, incluida separación entre organizaciones si aplica.
- Usa identificadores y marcadores de propiedad estables. Reejecutar no debe duplicar ni modificar filas ajenas. Valida todas las colisiones antes de escribir; agrupa cambios de forma atómica cuando sea posible.
- Genera contraseñas aleatorias por entorno mediante el canal seguro. Nada de contraseñas fijas, públicas, en Git, respuestas de API o navegador.
- Actualiza semillas y matriz de cobertura con cada función o cambio de esquema. Comprueba lectura tras reconectar o recrear el proceso, no solo la memoria de la página.
- No inventes eventos live, cobros, entregas, firmas, consentimientos de personas, llamadas ni confirmaciones de proveedores. Una fila de prueba no acredita que ocurrió un efecto externo.
- Bloquea correo, SMS, cobros y otros efectos reales. Usa sandbox o un destino de captura propio cuando esté autorizado; declara qué integración sigue sin probarse.
- El perfil de Preview tiene sus propias cuentas y secretos. No cargues la semilla DEV allí por cambiar una URL.
- Producción rechaza cualquier comando o perfil de semilla de prueba, incluso con flags contradictorios.

No uses mocks de UI, respuestas hardcoded ni servicios simulados para aparentar que el flujo está implementado. Distingue siempre prueba unitaria con dobles, integración con datos persistidos y efecto externo real.

### 4. Implementar autologin solo en DEV

Reutiliza el mecanismo real de sesión y autorización. El selector visible en login o dashboard enumera únicamente las identidades semilla propias y los roles existentes; nunca permite elegir un usuario arbitrario, suplantar una cuenta real o elevar permisos.

Exige juntas, en servidor, una identidad DEV explícita, un flag de autologin explícito y la acreditación del destino DEV. Añade un perímetro privado o un control de acceso equivalente para el sandbox: una URL difícil de adivinar o una variable enviada por el cliente no lo protegen. Verifica orígenes permitidos, CSRF, método, cookies y sesiones. Nunca entregues la contraseña al cliente.

No basta `NODE_ENV !== production`, el hostname, un sufijo en la base ni un único flag. La variable puede marcar la intención; los controles independientes deben evitar que una configuración errónea active el acceso fuera de DEV. Ante valores ausentes, contradictorios, desconocidos o destino no acreditado, falla cerrado.

En Preview y producción el selector no aparece y el endpoint no emite sesiones, aunque se copien flags DEV o se llame directamente. Añade gates de compilación o despliegue que detecten configuración incompatible, sin suponer que ocultar UI elimina la ruta. Documenta retirada y reconexión segura tras recrear el sandbox.

### 5. Probar y entregar por gates

Conserva evidencia del SHA, destino, rol y resultado, sin datos secretos. Verifica al menos:

- Cada rol inicia sesión mediante la autenticación real y solo puede realizar sus operaciones permitidas; probar también acceso directo a API, cuentas ajenas y otro tenant.
- Semillas persistidas y segunda ejecución idempotente; colisiones ajenas abortan sin cambios parciales.
- DEV sin flag, flag sin DEV, valores desconocidos, Preview y producción con flags DEV: autologin ausente o rechazado, sin sesión.
- Usuario arbitrario, origen no permitido, CSRF y llamada directa sin el perímetro requerido: rechazados.
- Aplicación con rol limitado: no puede crear roles, bases, alterar estructura ajena ni conectar a otros destinos. Comprueba acceso heredado de `PUBLIC`; no alteres permisos globales para resolverlo sin autoridad.
- Ningún secreto llega al bundle, logs, URL, argumentos de procesos o repositorio. Ningún efecto externo real se dispara por sembrar o entrar.
- La URL exterior, las redirecciones y el login pertenecen al sandbox vigente; inspecciona visualmente login, selector y dashboard de cada rol.

## Validación

Registra cada gate como confirmado, pendiente o bloqueado: destino y aislamiento; conexión autenticada; esquema; semillas; autologin; permisos; persistencia; efectos externos; revisión visual; recuperación. Un test offline, un recurso creado o un login PGlite no acreditan conexión al PostgreSQL esperado.

## Resultado esperado

Matriz de entornos sin secretos, comandos y perfiles documentados, cobertura por rol y función, pruebas negativas, referencia de copia y retirada, y lista concreta de lo pendiente. Di dónde queda la guía y qué está realmente aplicado. No declares el proyecto funcional por completar solo su infraestructura.

## Seguridad

Riesgo alto: autenticación, credenciales, permisos y datos persistidos. Mantén revisión previa para mutaciones sensibles y gasto. Nunca copies datos personales de producción por inferencia. No resetees una base con datos ni revoques permisos globales para hacer pasar pruebas. Si aparece un secreto en una salida, detén la operación afectada, comprueba qué se aplicó y sustituye el valor nuevo afectado dentro del alcance autorizado; no reproduzcas el secreto en informes.
