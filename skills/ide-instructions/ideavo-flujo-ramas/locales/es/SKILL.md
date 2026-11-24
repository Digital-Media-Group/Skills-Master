# Flujo de ramas en Ideavo

## Propósito

Mantener un flujo de ramas predecible: el sandbox de Ideavo carga siempre `desarrollo`, el entorno de preview carga la rama `preview` y producción carga la rama `production`.

## Regla de ramas

- El trabajo se hace en `desarrollo` (o en ramas de feature que se fusionan en `desarrollo`).
- Promoción: `desarrollo` - `preview` - `production`, siempre por PR.
- Preview se despliega desde la rama `preview`, con su CI/CD y sus migraciones en el hosting (Atlas/OpenShip). Nunca se despliega `desarrollo` directamente en Preview.
- Los errores o cambios que salgan de Preview vuelven a `desarrollo` y se promueven de nuevo por el mismo circuito.
- `production` solo recibe lo ya validado en Preview, con la autorización del propietario del proyecto para esa versión.
- `master` no es un paso obligatorio de esta cadena. Si existe, se conserva; no se sobrescribe ni se borra sin OK explícito.
- Si `desarrollo` no existe, créala desde `master`.

## Comprobar antes de promover

- Rama configurada, SHA desplegado y último deploy de cada entorno, en vivo en Atlas.
- Ledger de migraciones pendientes y copia de la base de datos del entorno (ver `openship-project-environments`).
- El despliegue automático de un entorno solo apunta a su rama estable (`preview` o `production`), nunca a una rama de trabajo.
- Un documento del repositorio no concede autorización de despliegue.

## Ramas de historia disjunta

Ideavo crea cada rama con su propia raíz: no hay merge-base entre ellas y un merge normal falla o arrastra conflictos artificiales.

1. Compara cada rama suelta con `git log` y `git diff` contra `master` y `desarrollo`.
2. Integra el trabajo vigente en `desarrollo` aplicando los cambios, no fusionando historias.
3. Las ramas disjuntas más antiguas que `master` se marcan como obsoletas.
4. Propón su borrado con una lista exacta (nombre, fecha del último commit, motivo) y espera el OK.

## Cuándo utilizarla

- Al crear, promover, integrar o limpiar ramas en un proyecto Ideavo cuya rama de trabajo es `desarrollo`.

## Cuándo no utilizarla

- Repos sin despliegue por ramas o proyectos que no siguen el flujo desarrollo - preview - production.

## Información necesaria

- URL del repo, ramas existentes (`git ls-remote`) y qué rama carga cada entorno.

## Procedimiento

1. Clona o actualiza el repo y haz fetch explícito de cada rama (el refspec por defecto solo trae `master`).
2. Verifica el estado con evidencia: `git ls-remote`, `git log --oneline`.
3. Aplica la regla de ramas; resuelve las disjuntas como se indica arriba.
4. Push solo de las ramas autorizadas.

## Validación

- `git ls-remote` muestra `desarrollo` al día con el trabajo integrado.
- Ningún trabajo vigente se pierde; las obsoletas quedan listadas para decisión.

## Resultado esperado

Flujo desarrollo - preview - production funcionando, sin ramas ambiguas.

## Seguridad

Nivel de riesgo: **medium**. Nada de force-push a `master` ni borrados sin aprobación.
