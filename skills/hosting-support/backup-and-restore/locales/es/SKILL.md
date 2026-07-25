# Copias de seguridad y restauracion

## Propósito

Definir y verificar una estrategia de backup basada en objetivos de recuperación.

## Cuándo utilizarla

- Un servicio necesita proteccion o validar su recuperabilidad.

## Cuándo no utilizarla

- No se conocen propietarios, datos criticos, RPO o RTO.

## Información necesaria

- Inventario de datos, RPO, RTO, retencion, cifrado, ubicaciones y responsables.

## Procedimiento

1. Clasifica datos y acuerda RPO, RTO, retencion y responsabilidades.
2. Disena copias independientes, cifradas y protegidas contra borrado.
3. Automatiza ejecución, alertas y verificacion de integridad.
4. Restaura en un entorno aislado usando un procedimiento documentado.
5. Compara resultados con objetivos y corrige cualquier brecha.

## Validación

- Cada hallazgo o decisión tiene evidencia y responsable.
- Los criterios de exito se comprueban antes de cerrar la tarea.
- Las desviaciones quedan registradas con su siguiente accion.

## Resultado esperado

Politica de backup y evidencia de una restauracion probada.

## Seguridad

Nivel de riesgo: **high**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa.
