# Isolated environments, functional seeds and DEV autologin

## Purpose

Prepare a project to test real functions and permissions with fictional, functional seed data persisted in its database. Development, Preview and production are independent destinations, not three names for one database. User or role autologin belongs only to DEV.

Add this skill to a project when needed. It describes a procedure; installation does not authorize writes, infrastructure, spending or permission changes.

## When to Use

- Preparing an application with login and several roles for integrated development.
- Adding a feature, API, relationship or permission requiring persisted cases.
- Checking whether a demonstration works or only displays simulated responses.
- Preparing Preview's own test data without enabling DEV autologin there.

## When Not to Use

- Seeding production, copying real customers or weakening production controls.
- As permission to restart, delete, migrate, grant roles or send data externally.
- As a replacement for isolated unit tests. Test doubles and fixtures can help there; they do not prove integration or constitute product implementation.

## Required Information

- Current owner instructions and later clarifications, with their scope.
- Branch and SHA, concurrent work, current schema and ledger, real services and roles.
- Verified identity of each database, server and environment; separate users, secrets and volumes.
- Existing authentication and authorization, sandbox network access and external-effect providers.
- Backup and recovery appropriate to the risk before changing a destination with data.

## Procedure

### 1. Establish the environment matrix

Record for DEV, Preview and production: project, server, database, application role, migration role if any, secret reference, volume, web origin and permitted effects. Do not include secret values.

- DEV has its own database, users and passwords. It keeps fictional functional seeds to test the working branch.
- Preview has its own database, users and passwords. It uses its own fictional seeds when needed and stays protected from public access. Payments use test mode, never live.
- Production contains real data, without test seeds or DEV access.
- Do not share credentials, cookies, sessions, signing keys or access across environments. A name containing `dev` does not prove isolation.

Read live state before creating resources. Verify owners, consumers and volume mounts, networks, ports and effective destination. On collision, do not adopt or delete another resource. A declared port does not prove a listener; TCP connectivity does not prove authentication or persistence.

### 2. Separate schema, seeds and effects

Inspect what each command actually executes and what first application access triggers. A login can apply migrations automatically. Do not use it as a simple probe without authority for that effect.

Proceed through gates: connectivity and metadata; authorized schema; authorized seeds; authentication; functional and role tests. Keep the application role without superuser, database creation, role creation or RLS bypass. Do not grant ownership or DDL rights merely to make a migrator work.

Rehearse migrations in isolated DEV, from scratch and from the previous version, checking ledger, integrity, second pass and recovery. Code promotion or migrations in Preview or production retain their own gates and approvals.

### 3. Create persisted functional seeds

Invent coherent test records clearly separated from real people. They must use the product's real validation, services and persistence: a user authenticates, a relationship exists, an allowed action saves and a forbidden action is denied.

- Cover every effective role and required module relationships, including tenant separation where applicable.
- Use stable identifiers and ownership markers. Re-running must not duplicate or alter foreign rows. Validate all collisions before writing; make changes atomic when possible.
- Generate random passwords per environment through the secure channel. No fixed or public passwords, or passwords in Git, API responses or the browser.
- Update seeds and coverage with each feature or schema change. Check reads after reconnecting or recreating the process, not only page memory.
- Never invent live events, charges, deliveries, signatures, personal consent, calls or provider confirmations. A test row does not prove an external effect occurred.
- Block real email, SMS, charges and other effects. Use a sandbox or an owned capture destination when authorized; state which integration remains untested.
- Preview's profile has its own accounts and secrets. Do not run the DEV seed there merely by changing a URL.
- Production rejects every test seed command or profile, even with conflicting flags.

Do not use UI mocks, hardcoded responses or simulated services to pretend a flow is implemented. Distinguish unit tests with doubles, integration with persisted data and real external effects.

### 4. Implement DEV-only autologin

Reuse real session authentication and authorization. The selector in login or dashboard lists only owned seed identities and existing roles; it must not accept arbitrary users, impersonate real accounts or elevate permissions.

Require an explicit DEV identity, an explicit autologin flag and verified DEV destination together on the server. Add a private perimeter or equivalent sandbox access control: an obscure URL or a client-supplied variable is not protection. Verify allowed origins, CSRF, methods, cookies and sessions. Never deliver the password to the client.

`NODE_ENV !== production`, a hostname, database suffix or single flag is insufficient. The variable states intent; independent controls must prevent a mistaken configuration from enabling access outside DEV. Missing, conflicting, unknown or unverified values fail closed.

In Preview and production the selector is absent and the endpoint issues no sessions, even if DEV flags are copied or the route is called directly. Add build or deployment gates for incompatible configuration; hiding UI does not remove a route. Document removal and safe reconnection after sandbox recreation.

### 5. Test and deliver by gates

Keep evidence of SHA, destination, role and result without secrets. Verify at least:

- Each role logs in through real authentication and can perform only permitted operations; test direct API access, foreign accounts and other tenants.
- Persisted seeds and idempotent second execution; foreign collisions abort without partial changes.
- DEV without flag, flag without DEV, unknown values, Preview and production with DEV flags: autologin absent or rejected, without a session.
- Arbitrary user, disallowed origin, CSRF and direct calls without the required perimeter: rejected.
- Limited application role cannot create roles or databases, alter foreign structure or connect to other destinations. Check inherited `PUBLIC` access; do not change global permissions without authority.
- No secret reaches bundles, logs, URLs, process arguments or the repository. No real external effect is triggered by seeding or login.
- External URL, redirects and login belong to the current sandbox; visually inspect login, selector and each role's dashboard.

## Validation

Record each gate as confirmed, pending or blocked: destination and isolation; authenticated connection; schema; seeds; autologin; permissions; persistence; external effects; visual review; recovery. An offline test, a created resource or PGlite login does not prove connection to the intended PostgreSQL instance.

## Expected Result

Secret-free environment matrix, documented commands and profiles, role and feature coverage, negative tests, backup and removal references, and a precise list of remaining work. State where the guide lives and what was actually applied. Infrastructure alone does not make the project functional.

## Safety

High risk: authentication, credentials, permissions and persisted data. Retain prior review for sensitive mutations and spending. Never infer permission to copy production personal data. Do not reset a database containing data or revoke global permissions to pass tests. If a secret appears in output, stop the affected operation, check what landed and replace the affected new value within authorized scope; never reproduce it in reports.
