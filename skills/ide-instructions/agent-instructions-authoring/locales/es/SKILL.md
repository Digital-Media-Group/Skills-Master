# Redacción de instrucciones para agentes

## Propósito

Escribir un archivo de instrucciones neutral y reutilizable entre IDEs y agentes de codificación, evitando reglas duplicadas o contradictorias.

## Cuándo utilizarla

- El equipo usa más de un agente o IDE sobre el mismo repositorio.
- Existen varios archivos de instrucciones con reglas divergentes.
- Se quiere una fuente única de convenciones que cada agente pueda referenciar.

## Cuándo no utilizarla

- Solo se usa un agente y basta con su archivo nativo.
- La regla depende de una capacidad exclusiva de un agente concreto.

## Información necesaria

- Agentes e IDEs en uso, convenciones del equipo y tareas habituales delegadas al agente.
- Comandos canónicos de instalación, build, pruebas y linting.
- Política de aprobaciones, ramas y revisión de cambios.

## Procedimiento

1. Localiza todos los archivos de instrucciones existentes y clasifícalos por agente.
2. Extrae las reglas comunes y sepáralas de las específicas de cada agente.
3. Redacta el archivo neutral con reglas imperativas, verificables y sin ambigüedad.
4. Deja en cada archivo específico solo lo exclusivo del agente y enlaza al archivo neutral.
5. Resuelve contradicciones con el equipo y registra la decisión adoptada.
6. Prueba la misma tarea con cada agente y compara el resultado.

## Validación

- Ninguna regla aparece duplicada con distinto contenido en dos archivos.
- Cada regla puede comprobarse con un comando, una revisión o un criterio observable.
- Los agentes en uso producen resultados equivalentes en la tarea de prueba.

## Resultado esperado

Archivo de instrucciones neutral con reglas verificables y referencias por agente.

## Seguridad

Nivel de riesgo: **low**. Mantén fuera del archivo credenciales, endpoints internos y datos personales. Marca como sujetas a aprobación las acciones destructivas o sobre producción.
