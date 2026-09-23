# Verified Dokploy deployment lessons - 2026-09-23

- On the single `atlas` node, `start-first` with `max_replicas_per_node=1` left the new task pending with `no suitable node`; `stop-first` converged without deleting volumes.
- Dokploy native Volume Backups are a valid gate for Compose volumes, but `200`/queued does not prove restorability: retain the ID and verify the artifact or run an approved restore rehearsal.
- A raw Stack binding must not use the short `web` alias. The correct service is `<stack>_web`; the validated Web internal port was `4000`.
- The API-only build uses a temporary Application with zero replicas. Its local image can be consumed only on the builder node with `--resolve-image never`; `RepoDigests=[]` is not publication.
- `compose.readLogs` requires both `composeId` and `containerId`. Historical tasks can remain in Dokploy after removal from the daemon and return `No such container`.
- A `done` deployment does not replace task, health, DNS, IPv4/IPv6, Traefik, and two-host verification.
- In this run, `www.gescodi.com` failed over IPv6 while IPv4 returned maintenance; compare address families before redeploying.
