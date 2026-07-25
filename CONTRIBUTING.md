# Como contribuir

## Principios

- Mantener una unica fuente neutral respecto al agente.
- Publicar cada titulo y contenido visible en espanol e ingles.
- No traducir IDs, rutas, etiquetas ni nombres de herramientas.
- Documentar riesgos, precondiciones, validaciónes y criterios de parada.
- No incluir secretos, datos de clientes ni instrucciones destructivas sin proteccion.

## Crear una skill

1. Copia `templates/skill/` en `skills/<categoría>/<skill-id>/`.
2. Usa un `skill-id` estable en kebab-case.
3. Completa `skill.yaml` con nombres y resumenes para `es` y `en`.
4. Escribe `locales/es/SKILL.md` con titulos en espanol.
5. Escribe `locales/en/SKILL.md` con titles in English.
6. Ejecuta `npm run check`.
7. Genera catálogos y adaptadores con `npm run build`.

## Calidad minima

La skill debe ser accionable, verificable, segura, portable y tener el mismo alcance funciónal en ambos idiomas. Consulta `docs/es/lista-de-revisión.md`.
