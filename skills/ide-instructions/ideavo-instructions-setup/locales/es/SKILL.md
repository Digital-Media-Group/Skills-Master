# Configuración de instrucciones para Ideavo

## Propósito

Crear el archivo de instrucciones de Ideavo con contexto, convenciones y límites del proyecto, para que el agente trabaje con las mismas reglas que el equipo.

## Cuándo utilizarla

- El repositorio se va a usar con Ideavo y no tiene instrucciones propias.
- Las instrucciones existentes están desactualizadas respecto al proyecto real.
- El equipo repite las mismas correcciones al agente en cada sesión.

## Cuándo no utilizarla

- El proyecto no tiene aún estructura, comandos ni convenciones estables.
- Solo se necesita una instrucción puntual para una tarea concreta.
- La configuración pertenece a otro agente y ya existe una skill específica.

## Información necesaria

- Estructura del repositorio, comandos de build y pruebas, convenciones de código y restricciones operativas.
- Rutas que el agente no debe modificar y acciones que requieren aprobación humana.
- Idioma de trabajo y formato esperado de commits y mensajes.

## Procedimiento

1. Inventaría estructura, stack, comandos de instalación, build, pruebas y linting.
2. Reúne las convenciones vigentes de código, nombres, ramas y commits.
3. Redacta el archivo de instrucciones con secciones cortas: contexto, comandos, convenciones, límites y criterios de aceptación.
4. Declara de forma explícita rutas protegidas, secretos y operaciones que exigen aprobación.
5. Elimina información duplicada que ya viva en README o documentación enlazable.
6. Valida el archivo con una tarea real y ajusta las instrucciones que el agente ignore o malinterprete.

## Validación

- Cada comando indicado en el archivo se ejecuta correctamente en un entorno limpio.
- Una tarea de prueba se completa sin correcciones manuales sobre convenciones ya documentadas.
- No hay credenciales ni datos sensibles en el archivo de instrucciones.

## Resultado esperado

Archivo de instrucciones de Ideavo versionado y verificado en el repositorio.

## Seguridad

Nivel de riesgo: **low**. No incluyas secretos, tokens ni rutas internas sensibles. Declara explícitamente qué operaciones requieren aprobación humana antes de ejecutarse.
