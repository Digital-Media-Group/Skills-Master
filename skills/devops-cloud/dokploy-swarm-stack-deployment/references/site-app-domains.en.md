# Site and app surfaces per environment

When a project has a dashboard, every environment must expose two hostnames to the same Web service:

| Environment | Site | Dashboard/app | Protection |
|---|---|---|---|
| Development | `dev.example.com` | `dev-app.example.com` | Basic Auth and maintenance |
| Preview | `preview.example.com` | `preview-app.example.com` | Basic Auth and maintenance |
| Production | `www.example.com` | `app.example.com` | Public site; authenticated app |

## Mandatory rules

- Create both DNS records per environment pointing to the ingress/VPS.
- Create both Dokploy domains with the same `composeId`.
- Bind both to `serviceName=<stack>_web`, never the short `web` alias.
- Use the actual internal container port, for example `4000`.
- Enable Let’s Encrypt HTTPS.
- Smoke-test both hostnames: HTTP redirect, TLS, unauthenticated response, and authenticated response.
- Keep Production in maintenance until human approval.
- Do not change `www` or the apex while existing marketing still runs on another provider; perform a controlled cutover.

## Validation

```bash
curl -I https://dev.example.com/
curl -I https://dev-app.example.com/
curl -I https://preview.example.com/
curl -I https://preview-app.example.com/
curl -I https://www.example.com/
curl -I https://app.example.com/
```

A `401` on Development/Preview can be correct when Basic Auth is enabled. A `307` to maintenance can be correct in Production. A `404` usually means Traefik has no matching rule; a `502` requires checking the full service name, Traefik network, and active backends.
