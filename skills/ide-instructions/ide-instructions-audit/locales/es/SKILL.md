# Auditoría de instrucciones de IDE

## Propósito

Revisar archivos de instrucciones existentes para detectar reglas obsoletas, contradictorias o inseguras antes de que degraden el trabajo del agente.

## Cuándo utilizarla

- El agente incumple convenciones que ya están documentadas.
- El repositorio cambió de stack, comandos o estructura.
- Se sospecha que hay secretos o permisos excesivos en las instrucciones.

## Cuándo no utilizarla

- No existe ningún archivo de instrucciones que auditar.
- El objetivo es crear instrucciones nuevas en lugar de revisar las existentes.

## Información necesaria

- Archivos de instrucciones vigentes, estado real del repositorio y incidencias reportadas por el equipo.
- Comandos actuales de build, pruebas y linting.
- Política vigente de aprobaciones y accesos.

## Procedimiento

1. Inventaría todos los archivos de instrucciones y su agente asociado.
2. Contrasta cada regla con el estado real del repositorio y marca las obsoletas.
3. Detecta contradicciones entre archivos y reglas imposibles de verificar.
4. Busca credenciales, rutas sensibles y permisos más amplios de lo necesario.
5. Clasifica los hallazgos por impacto sobre corrección, seguridad y mantenimiento.
6. Aplica las correcciones acordadas y registra las que requieran decisión del equipo.

## Validación

- Cada comando documentado se ejecuta correctamente tras la corrección.
- No queda ninguna contradicción sin resolver o sin decisión registrada.
- La revisión de secretos no arroja coincidencias en los archivos auditados.

## Resultado esperado

Informe de hallazgos priorizados con correcciones aplicadas o propuestas.

## Seguridad

Nivel de riesgo: **medium**. Si detectas secretos expuestos, trátalos como comprometidos y solicita su rotación. No amplíes permisos ni relajes aprobaciones sin autorización explícita del equipo.
