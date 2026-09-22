# Superficies site y app por entorno

Cuando el proyecto tiene dashboard, cada entorno debe tener dos hostnames separados hacia el mismo servicio Web:

| Entorno | Sitio | Dashboard/app | Protección |
|---|---|---|---|
| Development | `dev.example.com` | `dev-app.example.com` | Basic Auth y mantenimiento |
| Preview | `preview.example.com` | `preview-app.example.com` | Basic Auth y mantenimiento |
| Production | `www.example.com` | `app.example.com` | Sitio público; app autenticada |

## Reglas obligatorias

- Crear ambos DNS records por entorno apuntando al ingress/VPS.
- Crear ambos dominios en Dokploy con el mismo `composeId`.
- Enlazar ambos a `serviceName=<stack>_web`, nunca al alias corto `web`.
- Usar el puerto interno real del contenedor, por ejemplo `4000`.
- Activar HTTPS Let’s Encrypt.
- Ejecutar smoke de ambos hostnames: HTTP redirect, TLS, respuesta sin credenciales y respuesta autenticada.
- Mantener Production en mantenimiento hasta aprobación humana.
- No cambiar `www` ni el apex si el marketing existente todavía debe seguir en otro proveedor; hacer un corte controlado.

## Validación

```bash
curl -I https://dev.example.com/
curl -I https://dev-app.example.com/
curl -I https://preview.example.com/
curl -I https://preview-app.example.com/
curl -I https://www.example.com/
curl -I https://app.example.com/
```

Una respuesta `401` en Development/Preview puede ser correcta si Basic Auth está activo. Una respuesta `307` a mantenimiento puede ser correcta en Production. Un `404` suele indicar que Traefik no tiene regla; un `502` exige revisar el nombre completo del servicio, la red Traefik y los backends activos.
