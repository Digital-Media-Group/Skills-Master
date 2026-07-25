# Revisión de preparación para release

## Propósito

Decidir si una release puede avanzar mediante evidencia técnica, operativa y de negocio.

## Cuándo utilizarla

- Una versión candidata se aproxima a un entorno compartido o producción.

## Cuándo no utilizarla

- No hay propietario con autoridad para aceptar el riesgo residual.

## Información necesaria

- Cambios, pruebas, riesgos, dependencias, observabilidad, soporte y rollback.

## Procedimiento

1. Confirma alcance, versión, ventana y responsables de la release.
2. Revisa evidencia de pruebas, seguridad, datos y compatibilidad.
3. Verifica configuración, migraciones, observabilidad, soporte y comunicaciones.
4. Ensaya o valida rollback y criterios de parada.
5. Registra la decisión, condiciones, riesgos aceptados y responsables.

## Validación

- Cada hallazgo o decisión tiene evidencia y responsable.
- Los criterios de exito se comprueban antes de cerrar la tarea.
- Las desviaciones quedan registradas con su siguiente accion.

## Resultado esperado

Decision registrada de avanzar, detener o avanzar con condiciones.

## Seguridad

Nivel de riesgo: **high**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa.
