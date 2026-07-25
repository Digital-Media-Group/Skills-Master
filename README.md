# Directorio profesional de skills

Repositorio bilingue y reutilizable de procedimientos operativos para desarrollo web, DevOps y cloud, alojamiento y soporte, marketing digital, y gestión y calidad.

La fuente canonica es neutral respecto al agente. Los adaptadores de `Claude Code` y `OpenAI Codex` se generan desde el mismo contenido para evitar duplicidades.

## Idiomas

- Espanol: los titulos, instrucciones, catálogos y nombres visibles se publican en espanol.
- English: titles, instructions, catalogs, and display names are published in English.
- Los identificadores técnicos (`id`, rutas y etiquetas) permanecen estables y no se traducen.

Cada skill contiene sus versiónes en `locales/es/SKILL.md` y `locales/en/SKILL.md`. Los catálogos se generan por separado en `catalog/es/` y `catalog/en/`.

## Categorías

| ID técnico | Espanol | English |
| --- | --- | --- |
| `web-development` | Desarrollo web | Web Development |
| `devops-cloud` | DevOps y cloud | DevOps and Cloud |
| `hosting-support` | Alojamiento y soporte | Hosting and Support |
| `digital-marketing` | Marketing digital | Digital Marketing |
| `management-quality` | Gestión y calidad | Management and Quality |

## Uso rapido

```bash
npm install
npm run check
npm run build
```

Los artefactos para agentes se generan en `dist/<adaptador>/<idioma>/`.

## Estructura de una skill

```text
skills/<categoría>/<skill-id>/
|- skill.yaml
|- locales/
|  |- es/SKILL.md
|  `- en/SKILL.md
|- examples/      # opcional
|- references/    # opcional
|- scripts/       # opcional
`- assets/        # opcional
```

Consulta `docs/es/primeros-pasos.md` y `CONTRIBUTING.md` para crear o actualizar una skill.

## Licencia

Apache-2.0. Consulta `LICENSE`.

[Read in English](README.en.md)
