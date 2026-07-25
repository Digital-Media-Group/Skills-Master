# Contenerización de una aplicación web

## Propósito

Crear una imagen reproducible, segura y operable para una aplicación web.

## Cuándo utilizarla

- La aplicación tiene un proceso de build y ejecución conocido.

## Cuándo no utilizarla

- No se conocen dependencias, puertos ni requisitos de persistencia.

## Información necesaria

- Runtime, comandos, puertos, dependencias, secretos y objetivos de despliegue.

## Procedimiento

1. Identifica artefactos, runtime, puertos y datos persistentes.
2. Selecciona una imagen base mantenida y fija versiónes relevantes.
3. Separa build y ejecución, minimiza capas y excluye archivos innecesarios.
4. Ejecuta con usuario no privilegiado y entrega secretos solo en runtime.
5. Construye, analiza vulnerabilidades y prueba salud, senales y apagado.

## Validación

- Cada hallazgo o decisión tiene evidencia y responsable.
- Los criterios de exito se comprueban antes de cerrar la tarea.
- Las desviaciones quedan registradas con su siguiente accion.

## Resultado esperado

Dockerfile validado, exclusiones, documentación y pruebas de ejecución.

## Seguridad

Nivel de riesgo: **medium**. No ejecutes cambios irreversibles, accesos a producción ni operaciones con credenciales sin autorización explícita, copia recuperable y plan de reversa.
