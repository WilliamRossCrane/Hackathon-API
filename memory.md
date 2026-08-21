# Memory — Arcjet NestJS Setup

Last updated: 2026-08-21

## What was built

Created the Arcjet site `Hackathon` and configured the NestJS app to use `@arcjet/nest` with a global `ArcjetGuard`. Global live rules are Shield and a token bucket with capacity 30, refilling 10 tokens every 60 seconds. The site key is stored only in the ignored `.env` file.

## Decisions made

Use Arcjet's official NestJS adapter instead of the previous custom `@arcjet/node` service and guard. Register the adapter through `ArcjetModule.forRoot` and `APP_GUARD`.

## Current state

`npm run build` passes. The Arcjet CLI lists the new `Hackathon` site. The old custom Arcjet files and direct `@arcjet/node` dependency were removed. Jest currently exits with no tests found because the only test covered the removed custom adapter.

## Next session starts with

Add a focused test for `AppModule`/global Arcjet behavior or an e2e request test, then run the application with the local `.env` key.

## Open questions

Whether the live rules should remain enabled immediately or be changed to `DRY_RUN` while thresholds are tuned.
