# ADR 0002: Fail-Closed Integration Evidence Status

- Status: Accepted
- Date: 2026-08-11
- Decision owner: Codex TECH_LEAD within approved Milestone 0 scope

## Context

Public product claims can outrun executable evidence. RailOS must distinguish an implemented interface, configured connectivity, successful health checks, and validated financial execution.

## Decision

Integration status is code-backed and defaults to:

- XRPL: `UNCONFIGURED`
- Kaleido: `CONNECTOR_READY`
- BNY/custody: `PRODUCTION_DISABLED`

An integration can advance only when the evidence matrix's stated gate is satisfied. Marketing copy and demo badges consume the same status contract wherever practical.

## Consequences

The UI may appear less advanced before testing, but investor claims stay defensible. A future XRPL `LIVE_TESTNET` status requires a successful network health check and validated-ledger transaction evidence, not merely transaction submission.
