# Dokploy Swarm Stack Deployment

## Purpose

Operate Dokploy/Swarm stacks across Development, Preview, and Production with fail-closed promotion, independent site/app maintenance, and verifiable diagnosis. The procedure supports a single node but never presents local storage as high availability.

## When to Use

- The application must be deployed as a Dokploy Stack on Docker Swarm.

## When Not to Use

- The destination is not Dokploy/Swarm or there is no verifiable persistence and rollback strategy.

## Required Information

- Repository, Compose file, domains, protected variables, registry, and authorized access.

## Procedure

## Access and secrets

- Use Dokploy REST API with protected local environment variables; never accept tokens, PATs, or private keys pasted into chat.
- SSH is optional and requires an authorized secure channel. Dokploy Git integration does not prove GitHub or GHCR push permissions.
- Never print full Dokploy objects: `env` may contain secrets. Record only allowlisted IDs, states, names, sizes, and hashes.

## Build and image identity

A Stack does not build `build:`. For published source, use images with a verified manifest digest. When GitHub/GHCR is unavailable and an explicitly authorized snapshot is allowed:

```text
allowlisted ZIP -> temporary Dokploy Application (sourceType=drop, Dockerfile, replicas=0)
                 -> image built on the Dokploy Engine
                 -> raw Stack with --resolve-image never and placement on the builder node
```

The ZIP must exclude `.git`, real `.env*` files, keys, certificates, dumps, backups, `node_modules`, `.next`, logs, and browser evidence. Reject symlinks, absolute paths, `..` traversal, duplicate paths, and unexpected files. Record ZIP/manifest SHA-256, Dockerfile hashes, informative source commit, builder, and image ID.

A local `sha256:...` image ID is not a manifest digest. `RepoDigests=[]` means the image is not published. A local `latest` tag is not immutable. Never use `repo@sha256:<image-config-id>`.

## Single-node update strategy

On a single-node Swarm with `max_replicas_per_node: 1`, `update_config.order: start-first` cannot replace an existing task and leaves `no suitable node`, commonly producing `502`. Use `stop-first` until additional capacity exists, together with `freshVolumes=false`, active maintenance, and a verified rollback. Revisit `start-first` only after validating multi-node capacity and placement.

## Backup and persistence

Before mutating Preview or Production:

1. Verify backup configuration, destination, scope, retention, encryption, and capacity.
2. For PostgreSQL/Compose, run the configured manual backup and wait for completion evidence.
3. For Compose volumes, Dokploy native Volume Backups are valid; record backup ID, volume, `turnOff=true`, and service state.
4. Verify the remote artifact or perform an approved restore rehearsal. A `200` or queued task does not prove a restorable backup.
5. If no verifiable native/remote backup exists, stop the stateful deployment.

Keep `freshVolumes=false`. Do not delete stacks, volumes, or data to fix an image pull, image error, or failed deployment.

## Maintenance and promotion

- Set `GESCODI_SITE_URL` and `GESCODI_APP_URL` independently; do not use `NEXT_PUBLIC_*` for server-side routing.
- Keep Basic Auth on Development and Preview; keep Production in maintenance until approval.
- Production is migrations-only and never receives seed/fixtures.
- Promote the exact candidate that passed: Development -> Preview -> Production.
- Before removing force-on variables, persist and read back maintenance flags in the target database and verify the real administrative recovery path.

## Domain bindings and Traefik

Each dashboard environment needs two hosts pointing to the same Web service:

| Environment | Site | App | Protection |
|---|---|---|---|
| Development | `dev.example.com` | `dev-app.example.com` | Basic Auth |
| Preview | `preview.example.com` | `preview-app.example.com` | Basic Auth |
| Production | `www.example.com` | `app.example.com` | maintenance/app auth |

With `sourceType=raw`, the binding must use the complete Swarm name `<stack>_web`, never the Compose alias `web`. Use the real internal port, usually `4000`, HTTPS, and the correct edge network. If Dokploy stores the domain but creates no router, add a controlled file-provider route to `<stack>_web:4000`; remove duplicate routers before testing.

## Diagnosis

- Check `composeStatus`, latest deployment, every service task, node, state, error, and bootstrap.
- Dokploy `done` does not guarantee healthy tasks; inspect replicas and the latest task.
- `compose.readLogs` requires both `composeId` and `containerId`. Historical tasks may return `No such container`; do not infer an application cause from a generic `Error:`. Use a current task or centralized logs.
- For timeouts, compare IPv4/IPv6, DNS, Cloudflare, TLS, Traefik, binding, and backend before redeploying. A timeout on one host while its sibling returns `307` may be ingress/routing, not Next.js.
- Always verify HTTP->HTTPS, TLS, expected `401/403`, maintenance/app behavior, and authorized health.

## Expected Result

Isolated, verifiable, and promotable Dokploy/Swarm stacks with documented backups, domains, diagnosis, and rollback.

## Validation

```bash
curl -I https://dev.example.com/
curl -I https://dev-app.example.com/
curl -I https://preview.example.com/
curl -I https://preview-app.example.com/
curl -I https://www.example.com/
curl -I https://app.example.com/
```

Validate Compose, typecheck, tests, Swarm tasks, images/digests, backups, both hosts per environment, and rollback. Do not declare HA with one node or a local data volume.

## Safety

Risk level: **high**. Never store secrets in Git, Compose, dumps, images, logs, or chat. Do not confuse a configured integration with publication permissions. Do not remove Basic Auth, maintenance, killswitches, or provider disablement as part of domain setup.
