# Revisión de arquitectura cloud

## Propósito

Evaluar una arquitectura cloud por fiabilidad, seguridad, rendimiento y coste.

## Cuándo utilizarla

- Existe un diagrama o inventario de la solución.

## Cuándo no utilizarla

- No hay limites de negocio, datos ni cumplimiento definidos.

## Información necesaria

- Arquitectura, cargas, SLO, datos, amenazas, costes y restricciones regulatorias.

## Procedimiento

1. Confirma objetivos de negocio, SLO y limites de responsabilidad.
2. Inventaria componentes, flujos de datos, identidades y dependencias.
3. Evalua resiliencia, seguridad, operación, rendimiento y costes.
4. Prueba escenarios de fallo y recuperación con evidencia disponible.
5. Prioriza cambios por riesgo, valor, esfuerzo y dependencias.

## Validación

- Cada hallazgo o decisión tiene evidencia y responsable.
- Los criterios de exito se comprueban antes de cerrar la tarea.
- Las desviaciones quedan registradas con su siguiente accion.

## Resultado esperado

Evaluacion de riesgos y hoja de ruta priorizada de mejoras.

## Seguridad

Nivel de riesgo: **high**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa.
