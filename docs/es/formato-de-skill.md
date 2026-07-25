# Formato de una skill

Una skill combina metadatos neutrales en `skill.yaml` con documentos localizados en `locales/es/` y `locales/en/`.

## Separacion entre identidad e idioma

- `id`, `category`, `tags` y dependencias son identificadores técnicos estables.
- `name` y `summary` contienen valores para `es` y `en`.
- Cada documento localizado usa titulos naturales del idioma correspondiente.
- Los catálogos y adaptadores se generan por idioma.

## Secciones obligatorias en espanol

`Propósito`, `Cuándo utilizarla`, `Cuándo no utilizarla`, `Información necesaria`, `Procedimiento`, `Validación`, `Resultado esperado` y `Seguridad`.
