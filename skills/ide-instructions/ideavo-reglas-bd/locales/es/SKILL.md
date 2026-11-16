# Reglas de base de datos en Ideavo

## Propósito

Evitar daños irreversibles en las bases de datos gestionadas por Ideavo y definir dónde vive la base de datos de cada despliegue.

## Reglas

1. El Neon de Ideavo es gestionado por la plataforma: solo lectura. PROHIBIDO reclamarlo (claim), modificarlo o borrar ramas marcadas como protegidas (snapshots de seguridad).
2. Cada app desplegada tiene su propia base de datos en Atlas o Dokploy (Postgres/Redis propios, nunca compartidos entre apps).
3. La base de datos de despliegue nace vacía y se puebla con migraciones al arrancar (p. ej. `prisma migrate deploy`, `drizzle-kit migrate`).
4. Neon solo se usa como respaldo DESDE Atlas (snapshot o rama de seguridad antes de migraciones), nunca como base de datos de un despliegue.
5. Las cadenas de conexión van en el gestor de secretos del hosting; nunca en repo, chat ni logs.

## Cuándo utilizarla

- Al crear, migrar, respaldar o conectar bases de datos de un proyecto Ideavo.

## Cuándo no utilizarla

- Bases de datos de proyectos ajenos a Ideavo ya gestionadas con otro runbook.

## Información necesaria

- Proyecto Ideavo, hosting de despliegue y ORM del proyecto (Prisma, Drizzle).

## Procedimiento

1. Crea la BD vacía en el hosting y anota su cadena de conexión en los secretos del servicio.
2. Asegura las migraciones en el comando de arranque o de release.
3. Antes de migraciones destructivas, crea snapshot de respaldo y anota su identificador.
4. Verifica con una consulta de solo lectura que el esquema quedó aplicado.

## Validación

- La app arranca y aplica migraciones sin errores.
- Neon de Ideavo sin cambios (comprobado por lectura).
- Snapshot de respaldo existe y está identificado.

## Resultado esperado

Base de datos de despliegue autónoma, con respaldo y sin tocar el Neon de la plataforma.

## Seguridad

Nivel de riesgo: **high**. Cualquier escritura en Neon o borrado de respaldos exige OK explícito.
