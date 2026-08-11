# ADR 0001: TypeScript Monorepo and Domain Boundaries

- Status: Accepted
- Date: 2026-08-11
- Decision owner: Codex TECH_LEAD within approved Milestone 0 scope

## Context

RailOS needs one testable control plane spanning an investor UI, an API, deterministic financial-domain modules, and external adapters without coupling the domain to a rail or custodian.

## Decision

Use pnpm and Turborepo with:

- `apps/web`: Next.js investor and operator interface.
- `apps/api`: Fastify API boundary.
- `packages/contracts`: shared domain and adapter contracts.
- later focused packages for policy, collateral, settlement, persistence, and XRPL.

Core modules consume interfaces. External providers implement adapters. Monetary values use integers or arbitrary-precision decimals, never JavaScript `number` for financial amounts.

## Consequences

The workspace adds tooling overhead but creates explicit ownership, dependency direction, and independent test gates. Institutional provider SDKs cannot leak into deterministic core modules.
