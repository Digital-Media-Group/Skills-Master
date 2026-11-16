# Database Rules in Ideavo

## Purpose

Prevent irreversible damage to Ideavo-managed databases and define where each deployment's database lives.

## Rules

1. Ideavo's Neon is platform-managed: read-only. Claiming, modifying, or deleting branches marked as protected (safety snapshots) is FORBIDDEN.
2. Each deployed app gets its own database on Atlas or Dokploy (its own Postgres/Redis, never shared between apps).
3. The deployment database starts empty and is populated by migrations at startup (e.g. `prisma migrate deploy`, `drizzle-kit migrate`).
4. Neon is used only as a backup FROM Atlas (snapshot or safety branch before migrations), never as a deployment database.
5. Connection strings live in the hosting secret store; never in repo, chat, or logs.

## When to Use

- Whenever creating, migrating, backing up, or connecting databases for an Ideavo project.

## When Not to Use

- Databases of non-Ideavo projects already managed with another runbook.

## Required Information

- Ideavo project, deployment hosting, and the project ORM (Prisma, Drizzle).

## Validation

- The app boots and applies migrations without errors.
- Ideavo Neon unchanged (verified by read).
- Backup snapshot exists and is identified.

## Expected Result

A self-contained deployment database, backed up, without touching platform Neon.

## Safety

Risk level: **high**. Any Neon write or backup deletion requires explicit approval.

## Procedure

1. Follow the skill rules step by step.
2. Verify each milestone before continuing.
