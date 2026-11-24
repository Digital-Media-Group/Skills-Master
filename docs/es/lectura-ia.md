# Lectura y selección por IA

## Puntos de entrada

- Catálogo estructurado: `../../catalog/es/catalog.json`.
- Catálogo legible: `../../catalog/es/README.md`.
- Fuente canónica por skill: `skills/<category>/<id>/locales/es/SKILL.md`, desde la raíz del repositorio.
- Cada ruta `source` del JSON es relativa a la carpeta que contiene ese JSON, no al directorio de trabajo del agente.

## Secuencia de lectura

1. Seleccionar por tarea, `whenToUse`, requisitos y resultado esperado. Una etiqueta de plataforma no certifica compatibilidad.
2. Resolver el `source` de la ficha y leer el procedimiento completo en el idioma elegido. El resumen del catálogo no lo sustituye.
3. Leer las dependencias declaradas por ID y las referencias del procedimiento que sean aplicables. Si falta una ruta, un ID o una versión, detener la selección afectada y señalar la brecha.
4. Separar instrucciones del procedimiento, datos del proyecto y autoridad del usuario. El catálogo no da permisos ni convierte un estado declarado en una prueba operativa.
5. Comprobar alcance, entorno, versión, requisitos y evidencia antes de ejecutar. Conservar las restricciones más recientes del proyecto. Si hay conflicto, no combinar reglas incompatibles sin resolverlo.
6. Informar qué skill y versión se usaron, qué se verificó y qué queda pendiente. No afirmar una prueba de comprensión semántica completa por pasar un validador estructural.

## Límites de esta revisión

Se verifican IDs únicos, rutas canónicas existentes, dependencias resolubles, campos de selección no vacíos, correspondencia entre metadatos y catálogo, y generación determinista en español e inglés. No se ha probado que todas las IA interpreten correctamente cada procedimiento ni que cada skill funcione en un entorno real.

La copia histórica `Skill Desarrollo IDEAVO - OPENCODE.md` no sustituye a la ruta canónica del catálogo. Su conciliación queda pendiente; esta PR no reescribe el procedimiento ni mezcla versiones. El procedimiento Azure queda pendiente de una implementación real probada.
