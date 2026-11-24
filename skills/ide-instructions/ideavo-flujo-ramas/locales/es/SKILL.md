# Flujo de ramas en Ideavo

## Propósito

Mantener un flujo de ramas predecible: el sandbox de Ideavo carga siempre `desarrollo`, el entorno de preview carga la rama de preview y producción carga la de producción.

## Regla de ramas

- El trabajo se hace en ramas de feature y se fusiona en `desarrollo`.
- Promoción: trabajo - `desarrollo` - rama preview - rama producción.
- Si `desarrollo` no existe, créala desde `master`.
- `master` se conserva; no es obligatoria en la cadena y no se borra ni se sobrescribe sin OK explícito.
- Preview carga la rama `preview` con su CI/CD y migraciones en el hosting (Atlas/OpenShip). Los fallos o cambios que salgan de Preview vuelven a `desarrollo` y se promueven de nuevo.

## Compuerta de producción

- Producción solo recibe una versión con OK numerado de Carlos para esa versión exacta (criterio registrado el 7/11/2026).
- Antes de ese OK se prepara y comprueba copia de la base de datos y vuelta atrás (práctica de las promociones anteriores, por ejemplo V24-B; confirmar con Carlos si la quiere como regla fija).
- Un documento de repositorio o una página de sesión no sustituye ese OK.

## Ramas de historia disjunta

Ideavo crea cada rama con su propia raíz: no hay merge-base entre ellas y un merge normal falla o arrastra conflictos artificiales.

1. Compara cada rama suelta con `git log` y `git diff` contra `master` y `desarrollo`.
2. Integra el trabajo vigente en `desarrollo` aplicando los cambios, no fusionando historias.
3. Las ramas disjuntas más antiguas que `master` se marcan como obsoletas.
4. Propón su borrado con una lista exacta (nombre, fecha del último commit, motivo) y espera el OK.

## Cuándo utilizarla

- Al crear, promover, integrar o limpiar ramas en un proyecto Ideavo.

## Cuándo no utilizarla

- Repos sin despliegue por ramas o proyectos que no siguen el flujo desarrollo - preview - producción.

## Información necesaria

- URL del repo, ramas existentes (`git ls-remote`) y qué rama carga cada entorno.

## Procedimiento

1. Clona o actualiza el repo y haz fetch explícito de cada rama (el refspec por defecto solo trae master).
2. Verifica el estado con evidencia: `git ls-remote`, `git log --oneline`.
3. Aplica la regla de ramas; resuelve las disjuntas como se indica arriba.
4. Push solo de las ramas autorizadas.

## Validación

- `git ls-remote` muestra `desarrollo` al día con el trabajo integrado.
- Ningún trabajo vigente se pierde; las obsoletas quedan listadas para decisión.

## Resultado esperado

Flujo desarrollo - preview - producción funcionando, sin ramas ambiguas.

## Seguridad

Nivel de riesgo: **medium**. Origen: contenido de la PR #16 (Skills-Master) con la compuerta de producción añadida; pendiente de revisión y fusión por el operador. Nada de force-push a master ni borrados sin aprobación.

