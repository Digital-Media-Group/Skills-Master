# Restricted Previews in Ideavo

## Purpose

Every preview lives at `preview.<project-domain>` and is always access-restricted. The `*.apps.mypanelhost.com` wildcard is only for apps on Dokploy, never for previews.

## Restriction options

### 1. OpenShip native protection (standard, no code)

- "Password protection" button per domain in the project's Domains & Routes tab (UI only, not exposed in the API).
- Protects the WHOLE hostname, including incoming webhooks (Stripe fails). Use it when there are no webhooks or callbacks.

### 2. Middleware with Basic Auth (when route exceptions exist)

- `PREVIEW_BASIC_AUTH` environment variable (credentials in the vault, never in repo or chat).
- The gate excludes `/api/` so webhooks keep working.
- If the project uses `src/`, the middleware goes in `src/middleware.ts` (Next ignores it at the root).
- Add the `X-Robots-Tag: noindex, nofollow` header.

### 3. Cloudflare Access

- Restriction at the DNS proxy layer without touching code. Useful when the zone is already on Cloudflare and centralized access management is wanted.

## When to Use

- When creating or moving a preview environment of an Ideavo project.

## When Not to Use

- Production environments (public access) and internal apps already protected by another mechanism.

## Required Information

- Project main domain, its registrar/DNS, and the real hosting server.

## Procedure

1. Create the A record for `preview.<domain>` pointing to the real hosting server (verify it via DNS first).
2. Point the service to the new domain.
3. Apply the chosen restriction option.
4. Verify: 401 from an external client without credentials, 200 with credentials, webhook ungated if applicable, noindex present.
5. Only then delete old preview DNS records.
6. Ask for human verification before calling the preview ready.

## Validation

- 401 without credentials and 200 with them, checked from outside.
- Webhooks respond without the gate (e.g. 405 to GET, not 401).
- Old DNS removed and zone intact (apex, MX, NS).

## Expected Result

A private preview, indexable by no one, functional for the team.

## Safety

Risk level: **medium**. DNS and access-protection changes; human verification is mandatory.
