# Revisión del directorio, 24 de noviembre de 2026

## Cambio preparado

- Portada por las seis categorías existentes, con una descripción por skill.
- Catálogo generado ES/EN con fichas: requisitos, resultados, dependencias, versión, riesgo y fecha de revisión declarada.
- Vistas por etiquetas de plataforma: Ideavo, Atlas/OpenShip, Dokploy y Azure. Las etiquetas no certifican compatibilidad y no sustituyen la vista completa por categorías.
- No se mueven rutas, no se cambian IDs y no se altera el contenido operativo de ninguna skill.
- Se conservan los 25 estados experimentales. No hay evidencia suficiente en esta revisión para declarar una skill estable o un procedimiento probado.

## Qué se ha comprobado

Se comprueban los esquemas, los documentos ES/EN, la generación reproducible del catálogo, las rutas de destino y la correspondencia entre los metadatos y las fichas. Estas pruebas verifican el directorio, no ejecutan los procedimientos de despliegue descritos por las skills.

La fecha de revisión mostrada viene de los metadatos existentes. No es una fecha de prueba operativa. Las capacidades y requisitos tampoco conceden permiso para usar credenciales, cambiar infraestructura o publicar.

## Conciliación pendiente, sin borrar ni fusionar

| Elemento | Revisión necesaria | Acción en esta propuesta |
| --- | --- | --- |
| Documento Ideavo suelto en raíz y documento localizado con el mismo ID | Comparar alcance y contenido antes de señalar uno como sustituto | Ambos se conservan; el catálogo sigue enlazando al documento localizado |
| PR 16, aprendizajes Ideavo | Comparar con los procedimientos ya presentes y los límites actuales por proyecto | Sin incorporar ni cerrar |
| PR 14, integración de desarrollo | Comprobar si sigue vigente y su relación con el proceso actual | Sin incorporar ni cerrar |
| PR 12, CI | Revisar frente a la plataforma de CI vigente, sin activar workflows | Sin incorporar ni cerrar |
| PR 4, OpenShip | Comparar con la skill OpenShip ya catalogada | Sin incorporar ni cerrar |

La clasificación por marca o proyecto no se infiere de nombres ni ejemplos: falta definir y revisar metadatos de ámbito antes de ofrecerla como filtro fiable. Por ahora se conserva una única fuente general y las particularidades de cada proyecto permanecen en sus instrucciones.

## Segundo hito: Azure

Azure Container Apps con escalado automático sigue pendiente de desplegarse y probarse. La vista Azure muestra ese estado, no instrucciones ejecutables nuevas. Solo se añadirá una skill del procedimiento real después de recibir evidencia del despliegue, sus pruebas y su recuperación. No se presupone integración con Atlas/OpenShip, una VM ni despliegue desde Ideavo todavía.

## Fuera del cambio

La publicación se limita a una rama y una PR para revisión. No se fusionan ramas, actualizan los pins de proyectos ni ejecuta infraestructura. La integración requiere una decisión posterior.
