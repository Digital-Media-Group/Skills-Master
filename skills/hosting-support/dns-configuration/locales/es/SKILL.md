# Configuración de DNS

## Propósito

Planificar y aplicar cambios DNS con validación y recuperación segura.

## Cuándo utilizarla

- Se necesita crear o modificar registros DNS.

## Cuándo no utilizarla

- No se ha verificado la propiedad de la zona o el impacto del cambio.

## Información necesaria

- Zona, proveedor, registros actuales, objetivo, TTL y ventana de cambio.

## Procedimiento

1. Exporta el estado actual y confirma autoridad sobre la zona.
2. Detecta dependencias de web, correo, validaciones y servicios externos.
3. Reduce TTL con antelacion cuando el cambio lo requiera.
4. Solicita aprobacion y aplica el conjunto minimo de cambios.
5. Valida desde resolutores independientes y restaura TTL al estabilizar.

## Validación

- Cada hallazgo o decisión tiene evidencia y responsable.
- Los criterios de exito se comprueban antes de cerrar la tarea.
- Las desviaciones quedan registradas con su siguiente accion.

## Resultado esperado

Registros aplicados, propagacion verificada y plan de reversa documentado.

## Seguridad

Nivel de riesgo: **high**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa.
