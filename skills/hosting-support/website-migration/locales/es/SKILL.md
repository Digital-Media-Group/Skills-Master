# Migración de sitio web

## Propósito

Mover un sitio entre entornos reduciendo pérdida de datos y tiempo de inactividad.

## Cuándo utilizarla

- Origen, destino y ventana de migración estan identificados.

## Cuándo no utilizarla

- No existe copia verificable ni acceso suficiente a origen y destino.

## Información necesaria

- Inventario, accesos, datos, DNS, correo, trafico y tolerancia a interrupciones.

## Procedimiento

1. Inventaria aplicación, datos, archivos, DNS, correo y tareas programadas.
2. Crea y prueba copias de seguridad antes de modificar el origen.
3. Prepara el destino y ejecuta una migración de ensayo.
4. Congela cambios, sincroniza diferencias y conmuta durante la ventana aprobada.
5. Valida funciones criticas, observa errores y conserva la reversa.

## Validación

- Cada hallazgo o decisión tiene evidencia y responsable.
- Los criterios de exito se comprueban antes de cerrar la tarea.
- Las desviaciones quedan registradas con su siguiente accion.

## Resultado esperado

Sitio migrado, validado, monitorizado y con reversa disponible.

## Seguridad

Nivel de riesgo: **high**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa.
