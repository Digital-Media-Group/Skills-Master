# Diseño de pipeline CI/CD

## Propósito

Diseñar una entrega automatizada con controles, trazabilidad y recuperación.

## Cuándo utilizarla

- El proyecto necesita automatizar validación o despliegue.

## Cuándo no utilizarla

- No hay estrategia de ramas, entornos ni responsables acordados.

## Información necesaria

- Repositorios, entornos, riesgos, aprobaciones, pruebas y estrategia de release.

## Procedimiento

1. Modela el flujo desde commit hasta producción y asigna responsables.
2. Ordena lint, pruebas, seguridad, build y empaquetado por dependencia.
3. Genera artefactos inmutables y promuevelos entre entornos.
4. Protege secretos, permisos, aprobaciones y despliegues de producción.
5. Define observacion, rollback y criterios para detener una release.

## Validación

- Cada hallazgo o decisión tiene evidencia y responsable.
- Los criterios de exito se comprueban antes de cerrar la tarea.
- Las desviaciones quedan registradas con su siguiente accion.

## Resultado esperado

Pipeline documentado con etapas, controles, artefactos y rollback.

## Seguridad

Nivel de riesgo: **high**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa.
