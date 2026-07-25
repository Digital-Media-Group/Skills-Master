# Revisión de diseño de API

## Propósito

Evaluar una API por consistencia, seguridad, evolucion y experiencia de consumo.

## Cuándo utilizarla

- Existe un contrato o propuesta de API para revisar.

## Cuándo no utilizarla

- No hay requisitos funciónales ni consumidores identificados.

## Información necesaria

- Contrato, casos de uso, consumidores, autenticacion y restricciones operativas.

## Procedimiento

1. Relaciona cada operación con un caso de uso y un propietario.
2. Revisa recursos, nombres, metodos, estados, errores y paginacion.
3. Evalua autenticacion, autorización, validación, limites y datos sensibles.
4. Comprueba versionado, idempotencia, compatibilidad y observabilidad.
5. Clasifica hallazgos por impacto y valida los cambios con consumidores.

## Validación

- Cada hallazgo o decisión tiene evidencia y responsable.
- Los criterios de exito se comprueban antes de cerrar la tarea.
- Las desviaciones quedan registradas con su siguiente accion.

## Resultado esperado

Informe priorizado con hallazgos, riesgos y cambios recomendados.

## Seguridad

Nivel de riesgo: **medium**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa.
