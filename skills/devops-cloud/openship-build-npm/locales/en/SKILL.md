# npm/Node Builds in OpenShip

## Purpose

Avoid the build failures and broken bundles bun produces on OpenShip/Atlas with Next.js projects, and know how to diagnose the managed bootstrap.

## Why never bun on OpenShip

With buildImage `oven/bun` and `bun run build`, Next compiles under the bun runtime and generates broken edge/SSR bundles:

- The middleware hangs page routes (the site never loads).
- "SyntaxError: Unexpected token ','" while collecting page data.

## Correct configuration

1. `packageManager` in package.json as an EXACT npm@X.Y.Z (e.g. `npm@10.9.9`). The managed bootstrap aborts if it declares bun or an invalid format: "The build uses npm; set packageManager to an exact npm@X.Y.Z".
2. Service: packageManager npm, installCommand `npm ci --legacy-peer-deps`, npm build/start commands, buildImage `node:22`.
3. Commit `package-lock.json` even if gitignored (`git add -f`); `npm ci` requires it.
4. Pin exact versions when bun.lock and package-lock disagree (real case: stripe pinned to the bun.lock version so types match).
5. If the project uses `src/`, middleware goes in `src/middleware.ts` (Next ignores it at the root).

## Diagnostics

- The deploy log stream does NOT show npm stdout: look for bootstrap errors (`[eval]`, "Error: The build uses ...") between the Docker steps.
- Environment variable PATCH MERGES: no need to resend all variables.
- 409 when launching a deploy = one is already running.

## When to Use

- When an OpenShip/Atlas build fails opaquely or a Next.js deploy behaves broken (hung middleware, page-data syntax errors).

## When Not to Use

- Services already building fine with their current toolchain and non-Next.js projects without edge bundles.

## Required Information

- OpenShip/Atlas service, project package.json, and present lockfiles.

## Validation

- Green deploy and the app responding (checked with an external request).
- Middleware and webhooks behaving as expected.

## Expected Result

Reproducible Node builds without bun's opaque runtime failures.

## Safety

Risk level: **medium**. Changes the production build toolchain; validate in preview first.

## Procedure

1. Follow the skill rules step by step.
2. Verify each milestone before continuing.
