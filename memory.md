# Memory — Arcjet MCP Connector

Last updated: 2026-08-20

## What was built

No source changes. Verified the existing `.vscode/mcp.json` Arcjet server configuration.

## Decisions made

The configured Arcjet MCP endpoint is `https://api.arcjet.com/mcp`.

## Problems solved

Confirmed the configuration is valid JSON and the endpoint matches exactly. A direct unauthenticated MCP initialize request returned HTTP 401 with OAuth resource metadata.

## Current state

The connector URL is configured, but authentication has not succeeded. The exposed agent tools cannot operate VS Code's connector remove/re-add UI or invoke the Arcjet MCP server directly.

## Next session starts with

In VS Code, remove the Arcjet connector and add it again using exactly `https://api.arcjet.com/mcp`, complete authentication, then ask: `List my Arcjet teams.`

## Open questions

Whether the VS Code connector OAuth flow succeeds after re-adding.
