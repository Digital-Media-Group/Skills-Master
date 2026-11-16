# Builds npm/Node en OpenShip

## Propósito

Evitar los fallos de build y los bundles rotos que produce bun en OpenShip/Atlas con proyectos Next.js, y saber diagnosticar el bootstrap gestionado.

## Por qué nunca bun en OpenShip

Con buildImage `oven/bun` y `bun run build`, Next compila bajo el runtime bun y genera bundles edge/SSR rotos:

- El middleware cuelga las rutas de página (la web no carga).
- "SyntaxError: Unexpected token ','" al recolectar page-data.

## Configuración correcta

1. `packageManager` en package.json como npm@X.Y.Z EXACTO (p. ej. `npm@10.9.9`). El bootstrap gestionado aborta si declara bun o un formato inválido: "The build uses npm; set packageManager to an exact npm@X.Y.Z".
2. Servicio: packageManager npm, installCommand `npm ci --legacy-peer-deps`, buildCommand y startCommand con npm, buildImage `node:22`.
3. `package-lock.json` commiteado aunque esté en .gitignore (`git add -f`); `npm ci` lo exige.
4. Fija versiones exactas cuando bun.lock y package-lock difieran (caso real: stripe fijado a la versión de bun.lock para que los tipos cuadren).
5. Si el proyecto usa `src/`, el middleware va en `src/middleware.ts` (en la raíz Next lo ignora).

## Diagnóstico

- El stream de logs de despliegue NO muestra el stdout de npm: busca los errores del bootstrap (`[eval]`, "Error: The build uses ...") entre los pasos de Docker.
- El PATCH de variables de entorno FUSIONA: no hace falta reenviar todas.
- 409 al lanzar deploy = ya hay uno en curso.

## Validación

- Deploy en verde y la app respondiendo (comprobado con petición externa).
- Middleware y webhooks comportándose según lo previsto.

## Resultado esperado

Build reproducible en Node sin los fallos opacos del runtime bun.

## Seguridad

Nivel de riesgo: **medium**. Cambia la toolchain de build de producción; valida en preview primero.

## Cuándo utilizarla

- Cuando un build de OpenShip/Atlas falla de forma opaca o un despliegue Next.js se comporta roto (middleware colgado, errores de sintaxis en page-data).

## Cuándo no utilizarla

- Servicios que ya construyen bien con su toolchain actual y proyectos no Next.js sin bundle edge.

## Información necesaria

- Servicio OpenShip/Atlas, package.json del proyecto y lockfiles presentes.

## Procedimiento

1. Sigue las reglas de la skill paso a paso.
2. Verifica cada hito antes de continuar.
