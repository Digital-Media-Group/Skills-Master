# Claves de tarea en Ideavo

## Propósito

Resolver las credenciales de una tarea con autonomía, sin filtrar valores y dejando todo revocable.

## Reglas

1. Autonomía de claves de tarea: crear, usar, revocar e informar sin pedir permiso para cada una.
2. Los valores NUNCA aparecen en chat, logs, informes ni repos. Se pasan por archivos temporales que se borran, o por el baúl de credenciales.
3. Toda clave nueva se guarda en el baúl y se informa del enlace de copia al responsable.
4. Stripe: solo modo TEST (claves pk_test/sk_test y webhook de prueba). Nada live ni pagos reales.
5. LLM: usar el router OmniRoute propio, modelo más barato primero.
6. Resets de contraseña de servicios: con el buzón de la asistente (triana@agente.mypanelhost.com), guardando la nueva contraseña en la entrada existente del baúl.
7. Al terminar la tarea, revoca las claves de tarea creadas e infórmalo.

## Cuándo utilizarla

- Cuando una tarea necesita una credencial o clave nueva para un servicio externo.

## Cuándo no utilizarla

- Credenciales live o de producción, y pagos reales: quedan fuera de la autonomía de tarea.

## Información necesaria

- Servicio destino, ámbito mínimo de la clave y entrada del baúl donde guardarla.

## Procedimiento

1. Identifica el servicio y el ámbito mínimo de la clave (test, solo lectura, etc.).
2. Créala, guárdala en el baúl y configúrala en el servicio que la necesita.
3. Verifica que funciona con una llamada real de bajo riesgo.
4. Al cerrar la tarea: revoca y reporta.

## Validación

- La clave funciona en el servicio destino (llamada verificada).
- Ningún valor quedó en canales inseguros.
- Revocación confirmada al terminar.

## Resultado esperado

Credenciales de tarea gestionadas sin fricción y sin exposición.

## Seguridad

Nivel de riesgo: **medium**. Cualquier clave live o de producción queda fuera de esta autonomía.
