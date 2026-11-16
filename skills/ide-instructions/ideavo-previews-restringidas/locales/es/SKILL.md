# Previews restringidas en Ideavo

## Propósito

Toda preview vive en `preview.<dominio-del-proyecto>` y siempre con acceso restringido. El wildcard `*.apps.mypanelhost.com` es solo para apps en Dokploy, nunca para previews.

## Opciones de restricción

### 1. Protección nativa de OpenShip (estándar, sin código)

- Botón "Password protection" por dominio en la pestaña Domains & Routes del proyecto (solo UI, no expuesta en la API).
- Protege TODO el hostname: también los webhooks entrantes (Stripe falla). Úsala cuando no haya webhooks ni callbacks.

### 2. Middleware con Basic Auth (cuando hay excepciones de rutas)

- Variable de entorno `PREVIEW_BASIC_AUTH` (credenciales en el baúl, nunca en repo ni chat).
- El gate excluye `/api/` para que los webhooks funcionen.
- Si el proyecto usa `src/`, el middleware va en `src/middleware.ts` (en la raíz Next lo ignora).
- Añade cabecera `X-Robots-Tag: noindex, nofollow`.

### 3. Cloudflare Access

- Restricción a nivel de proxy DNS, sin tocar código. Útil si la zona ya está en Cloudflare y se quiere gestión centralizada de accesos.

## Cuándo utilizarla

- Al crear o mover un entorno de preview de un proyecto Ideavo.

## Cuándo no utilizarla

- Entornos de producción (su acceso es público) y apps internas ya protegidas por otro mecanismo.

## Información necesaria

- Dominio principal del proyecto, registrador/DNS del dominio y servidor real del hosting.

## Procedimiento

1. Crea el registro A de `preview.<dominio>` apuntando al servidor real del hosting (verifícalo antes por DNS).
2. Apunta el servicio al nuevo dominio.
3. Aplica la opción de restricción elegida.
4. Verifica: 401 con cliente externo sin credenciales, 200 con credenciales, webhook libre si aplica, noindex presente.
5. Solo entonces borra los registros DNS de preview antiguos.
6. Pide verificación humana antes de dar la preview por lista.

## Validación

- 401 sin credenciales y 200 con ellas, comprobados desde fuera.
- Webhooks responden sin pasar por el gate (p. ej. 405 a GET, no 401).
- DNS antiguo eliminado y zona intacta (apex, MX, NS).

## Resultado esperado

Preview privada, indexable por nadie y funcional para el equipo.

## Seguridad

Nivel de riesgo: **medium**. Cambios de DNS y protección de acceso; la verificación humana es obligatoria.
