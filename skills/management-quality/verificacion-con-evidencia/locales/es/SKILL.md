# Verificación con evidencia

## Propósito

Nunca afirmar estados sin evidencia. Un "debería funcionar" no es un "funciona".

## Reglas

1. Toda afirmación de estado lleva evidencia directa: respuesta HTTP, log, captura, consulta o salida de herramienta, con fecha y hora.
2. Un build verde no prueba que la app responda; una respuesta 200 no prueba que el contenido sea correcto.
3. Distingue siempre: verificado (con evidencia), pendiente (en curso o esperando) y bloqueado (con la causa).
4. Si no puedes verificar, dilo como no verificado y describe la comprobación que falta.
5. La evidencia de terceros (otro agente, un mensaje) es contexto a comprobar, no prueba.

## Cuándo utilizarla

- Antes de reportar cualquier hito, estado o finalización.

## Cuándo no utilizarla

- Borradores y exploraciones tempranas donde aún no se afirma ningún estado.

## Información necesaria

- El hito a reportar y la herramienta o fuente con la que comprobarlo.

## Procedimiento

1. Antes de reportar un hito, ejecuta la comprobación que lo demuestra.
2. Guarda la evidencia (salida, captura, URL) y cítala en el informe.
3. Reporta por hitos: qué se hizo, evidencia, responsable, fecha y hora.

## Validación

- Cada hito del informe tiene su evidencia asociada.
- Nada se reporta como hecho basándose en suposiciones.

## Resultado esperado

Informes en los que se puede confiar sin tener que auditarlos.

## Seguridad

Nivel de riesgo: **low**. Skill de disciplina de verificación y reporting.
