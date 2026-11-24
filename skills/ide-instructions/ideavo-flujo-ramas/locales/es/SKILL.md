# Flujo de ramas en Ideavo

## Propósito

Mantener un flujo de ramas predecible: el sandbox de Ideavo carga la rama de trabajo `desarrollo` en los proyectos que adoptan este flujo, el entorno de preview carga la rama `preview` y producción carga la rama `production`.

## Regla de ramas

- El trabajo se hace en `desarrollo` (o en ramas de feature que se fusionan en `desarrollo`).
- Promoción: `desarrollo` - `preview` - `production`, siempre por PR.
- Preview se despliega desde la rama `preview`, con su CI/CD y sus migraciones en el hosting (Atlas/OpenShip). Nunca se despliega `desarrollo` directamente en Preview.
- Los errores o cambios que salgan de Preview vuelven a `desarrollo` y se promueven de nuevo por el mismo circuito.
- `production` solo recibe lo ya validado en Preview, con la autorización del propietario del proyecto para esa versión.
- `master` no es un paso obligatorio de esta cadena. Si existe, se conserva; no se sobrescribe ni se borra sin OK explícito.
- Si `desarrollo` no existe, identifica la base vigente (`main`, `master` u otra) y prepara su creación desde el SHA acordado, solo con autoridad para cambiar ramas. No asumir que `master` contiene todo el trabajo.

## Comprobar antes de promover

- Rama configurada, SHA desplegado y último deploy de cada entorno, en vivo en Atlas.
- Ledger de migraciones pendientes y copia de la base de datos del entorno (ver `openship-project-environments`).
- El despliegue automático de un entorno solo apunta a su rama estable (`preview` o `production`), nunca a una rama de trabajo.
- Un documento del repositorio no concede autorización de despliegue.

## Ramas de historia disjunta

No presupongas historias disjuntas por usar Ideavo. Comprueba primero `git merge-base` entre las ramas exactas y conserva sus SHA. Una fecha antigua no prueba que el contenido esté integrado ni que una rama sea obsoleta.

1. Compara commits y contenido con `git log` y `git diff`; revisa también cambios sin publicar antes de mover trabajo.
2. Si hay ancestro común, usa el flujo normal de PR e integración con sus verificaciones.
3. Si no hay ancestro común, inventaría los cambios únicos y prepara una aplicación revisada de esos cambios a `desarrollo`. No fuerces historias no relacionadas ni pierdas trabajo para hacer pasar el merge.
4. Solo propón una rama como obsoleta tras comprobar que su trabajo está integrado, sustituido o descartado expresamente. Propón cualquier borrado con nombre, SHA, fecha, motivo y comprobación de cobertura, y espera aprobación.

## Cuándo utilizarla

- Al crear, promover, integrar o limpiar ramas en un proyecto Ideavo cuya rama de trabajo es `desarrollo`.

## Cuándo no utilizarla

- Repos sin despliegue por ramas o proyectos que no siguen el flujo desarrollo - preview - production.

## Información necesaria

- URL del repo, ramas existentes (`git ls-remote`) y qué rama carga cada entorno.

## Procedimiento

1. Clona o actualiza el repo, comprueba el refspec real y recupera las referencias necesarias. No presupongas que solo se descarga `master`.
2. Verifica el estado con evidencia: `git ls-remote`, `git log --oneline`.
3. Aplica la regla de ramas; trata historias disjuntas solo si la comprobación confirma que lo son.
4. Push solo de las ramas autorizadas.

## Validación

- `git ls-remote` muestra `desarrollo` al día con el trabajo integrado.
- Ningún trabajo vigente se pierde; las obsoletas quedan listadas para decisión.

## Resultado esperado

Flujo desarrollo - preview - production funcionando, sin ramas ambiguas.

## Seguridad

Nivel de riesgo: **medium**. Nada de force-push a `master` ni borrados sin aprobación.
