# Proceso estándar de desarrollo con Ideavo

## Propósito

Ejecutar cualquier trabajo de ingeniería con Ideavo de forma ordenada, verificable y gobernada: plan por fases, desarrollo por bloques con PR y CI verde, QA real en preview y ventanas de producción con copia verificada y vuelta atrás ensayada. Es el estándar vigente para todos los proyectos actuales y futuros, fijado a partir de cómo se llevó GESCODI.

## Cuándo utilizarla

- Cualquier desarrollo ejecutado con Ideavo: productos nuevos, fases de productos existentes y correcciones con ruta a producción.
- Planificar, seguir o auditar el avance de un proyecto por fases.
- Preparar, ejecutar o cerrar una ventana de producción propia.

## Cuándo no utilizarla

- Tareas puramente documentales o de investigación sin cambios de código ni despliegue.
- Experimentos de laboratorio aislados sin ruta a producción.
- Cuando una instrucción expresa del propietario sea incompatible: prevalece la instrucción y se documenta el conflicto.

## Información necesaria

- Plan por fases con alcance claro por fase, mantenido como documento vivo en `docs/project/` del repositorio.
- Repositorio con ramas master, preview y production, y CI propio con runner en Atlas/Dokploy.
- Un único chat de Ideavo por proyecto y el modelo fijo elegido para ese proyecto.
- Límites de autonomía aprobados por el propietario (sección Seguridad).

## Procedimiento

1. **Plan por fases**: parte el trabajo en fases numeradas con alcance claro (ej. Fase 1 Agenda, Fase 2 Notificaciones). El plan vive en un documento del repo (`docs/project/`).
2. **Documento vivo**: cada fase cerrada, bloque mergeado o cambio de alcance se refleja en el documento el mismo día.
3. **Desarrollo por bloques**: Ideavo trabaja bloque a bloque, cada bloque en su rama `feat/` desde el master vigente, con push frecuente como seguro contra cortes del sandbox.
4. **PR + CI verde**: cada bloque termina en un PR abierto contra master. El CI (runner propio en Atlas/Dokploy, nunca GitHub-hosted Actions) debe dar verde en la rama.
5. **Revisión y merge del operador**: el operador revisa el diff (aditivo, sin secretos, tests nuevos) y mergea. Ideavo NUNCA mergea ni empuja a master, preview ni production.
6. **QA real en preview**: promoción a preview, despliegue y smokes reales con datos de prueba (login, páginas y APIs tocadas). Lo que falla en preview no llega a producción.
7. **Ventana de producción**: con backup fresco verificado, migraciones aditivas aplicadas a mano, despliegue, smokes y vuelta atrás ensayada. Se avisa al abrir y al cerrar.
8. **Cierre y limpieza**: reporte de cierre con horas y evidencia, y limpieza de recursos temporales (contenedores de ensayo, dumps con datos reales).

## Reglas permanentes

- **Un solo canal con Ideavo**: un chat por proyecto; las instrucciones se dan por escrito, en español correcto, y se lee cada respuesta entera.
- **Modelo fijo**: no se cambia de modelo salvo orden expresa.
- **Empuje continuo**: vigilancia cada 15 minutos; si la sesión se para, se reanuda sin esperar; el trabajo no para hasta que todo esté en producción.
- **Push frecuente**: commit y push tras cada paso completado; GitHub es la fuente de verdad del progreso.
- **Migraciones**: solo aditivas, con pins regenerados y marcado en el PR; los `ADD VALUE` de enum son irreversibles y se declaran como tales.
- **Tests**: salida a fichero con resumen, nunca volcado entero en el chat; cada bloque añade sus pruebas.
- **CI/CD**: solo en Atlas/Dokploy con runner propio. Nunca GitHub-hosted Actions.
- **Estados con % real**: cada estado indica porcentaje por fase, bloque actual, CI de master y si algo está parado, sin inflar.
- **Cookies, tokens y secretos**: siempre a fichero, nunca mostrados en chat ni en logs.

## Plantillas operativas

### Estado

```
[Hora] — Proyecto
1. Fases: F1 X% (estado), F2 X%, F3 X%...
2. Bloque actual: qué se está construyendo y en qué rama/PR.
3. CI de master: verde/rojo (run), y si algo está parado.
4. Siguiente paso y estimación si la hay.
```

### Ventana de producción

```
VENTANA [fase] — [fecha hora]
1. Backup fresco: id del run, sha256 verificado contra el manifiesto.
2. Ensayo de restauración: limpio (tablas, policies, migraciones).
3. Ensayo forward: migraciones de la ventana aplicadas sobre la restauración, sin errores. Irreversibles declaradas.
4. CI de master verde en el SHA candidato.
5. Promoción: PR a production mergeado por el operador; despliegue lanzado.
6. Migraciones aplicadas a mano (el bootstrap no las corre en el despliegue).
7. Smokes post-despliegue: login, páginas y APIs tocadas, todo 200.
8. Cierre: hora de fin, estado final, rollback disponible (backup + redeploy del release anterior).
9. Limpieza de temporales.
```

## Validación

- CI verde en la rama de cada bloque antes del PR y en master tras cada merge.
- Smokes reales en preview (login, páginas y APIs tocadas) antes de abrir cualquier ventana de producción.
- Backup fresco con sha256 verificado y ensayo de restauración limpio antes de producción; smokes post-despliegue en 200.

## Resultado esperado

Fases entregadas en producción con trazabilidad completa: documento vivo al día, PRs revisados y mergeados por el operador, CI verde, ventanas documentadas con horas y evidencia, y recursos temporales limpiados al cierre.

## Seguridad

Se decide y se sube cada fase sin pedir OK numerado, cumpliendo las condiciones de siempre (CI verde, QA real, copia verificada, vuelta atrás ensayada) y avisando de lo que sube. FUERA de esa autonomía, siempre OK expreso primero:

1. **Pagos y recargas** (Telnyx, VoIP.ms y cualquier gasto).
2. **Catálogo de EmprenRed en producción**.
3. **Envíos a terceros** (mensajes, emails o invitaciones fuera de los entornos de prueba).
4. **Marca Indeed, Mooola y web marketing**.
5. **Secretos por chat**: nunca; siempre por el baúl.
6. **Servidores en solo lectura**, salvo lo expresamente autorizado.
7. **Variables de entorno de producción** (ej. MARKETING_MAINTENANCE) no se tocan: su cambio es decisión de producto.

## Cuando algo se tuerce

- Fallo de CI: leer el log del job, dar a Ideavo el fallo exacto, no mergear.
- Sandbox de Ideavo reclamado con trabajo local: recuperar del worktree (git status/stash) o rehacer; GitHub manda.
- Smoke de preview en rojo: arreglo en rama `feat/` o `fix/` con su migración aditiva si hace falta, y la ventana espera.
- CI atascado: cancelar el run colgado y dejar avanzar la cola; nunca mergear sin verde.
