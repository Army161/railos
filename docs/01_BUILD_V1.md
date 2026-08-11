# BUILD V1 — Execution Specification

## Build objective

Deliver a working investor-grade prototype of RailOS with a real XRPL testnet transaction and a deterministic collateral/policy/settlement lifecycle.

## Technical defaults

- Monorepo: pnpm + Turborepo
- Language: TypeScript
- Web: Next.js
- API: Fastify
- Validation: Zod
- Database: PostgreSQL
- ORM/query layer: Drizzle
- XRPL: official JavaScript XRPL client library
- Tests: Vitest + Playwright
- Containers: Docker Compose
- CI: GitHub Actions
- Structured logs: Pino
- API docs: OpenAPI
- Runtime secrets: environment/secret manager only

## Milestone 0 — Repository foundation

Deliver:

- monorepo initialization
- lint/format/typecheck
- unit test harness
- Docker Compose with Postgres
- `.env.example`
- GitHub Actions
- CODEOWNERS
- branch protection documentation
- architecture decision records directory

Exit criteria:

```text
pnpm install
pnpm lint
pnpm typecheck
pnpm test
```

all succeed.

## Milestone 1 — Shared domain model

Implement:

- organization
- user/roles
- asset
- collateral position
- collateral pledge
- policy decision
- settlement request
- settlement execution
- ledger transaction
- audit event
- idempotency record

Requirements:

- no floats for money
- store money as integer minor units or precise decimal
- all state changes occur inside transactions
- UUID/ULID identifiers
- timestamps UTC
- immutable audit events

## Milestone 2 — Policy engine

Implement versioned deterministic rules.

Initial rule types:

- organization active
- jurisdiction allowed
- credential status
- asset allowed
- asset issuer allowed
- maximum transaction amount
- collateral ratio
- concentration threshold
- approved settlement rail

Return:

- ALLOW / DENY
- reason codes
- requirements evaluated
- rule-set version
- trace ID

Tests:

- allow path
- each deny path
- rule-version reproducibility
- deterministic repeated evaluation

## Milestone 3 — Collateral engine

Implement:

- position registration
- price observation
- gross value
- haircut
- eligible collateral value
- required collateral
- collateral ratio
- pledge
- release
- substitution

No liquidation automation in V1.

Tests:

- decimal precision
- stale valuation rejection
- insufficient collateral
- haircut changes
- concentration limit

## Milestone 4 — XRPL testnet

Implement:

- client connection
- health check
- configured testnet accounts
- transaction submission
- validation confirmation
- transaction lookup
- ledger metadata persistence
- retry behavior
- websocket/poll fallback if appropriate

Rules:

- no production mainnet private keys
- testnet clearly labeled in UI
- secrets never committed
- transaction hash stored once
- duplicate execute request must not duplicate chain submission

## Milestone 5 — Settlement router

Implement route model.

Initial route:

- XRPL_TESTNET

Future adapter states:

- KALEIDO_CONNECTOR_READY
- BNY_CONNECTOR_READY

Router steps:

1. receive request
2. idempotency check
3. policy evaluation
4. build eligible routes
5. select route
6. execute
7. wait for confirmation
8. reconcile
9. finalize

Tests:

- duplicate request
- policy denial
- chain failure
- timeout
- successful confirmation
- restart/recovery after submission

## Milestone 6 — Audit + reconciliation

Every operation must emit audit events:

- request.created
- policy.evaluated
- collateral.checked
- route.selected
- transaction.signed
- transaction.submitted
- transaction.confirmed
- reconciliation.completed
- settlement.completed

Reconciliation must compare:

- requested amount
- executed amount
- network transaction
- final status

## Milestone 7 — Dashboard

Screens:

### Command Center

- active organizations
- collateral value
- open pledges
- settlements today
- confirmed settlements
- failed settlements
- network status

### Organization

- organization profile
- XRPL accounts
- credential references
- policy eligibility

### Collateral

- positions
- haircut
- eligible collateral value
- pledge status

### Policy

- decision summary
- requirements
- rule-set version
- reason codes
- trace ID

### Settlement Router

- requested amount
- available routes
- route eligibility
- selected route
- execution state

### Transaction detail

- RailOS settlement ID
- XRPL transaction hash
- ledger index
- timestamps
- confirmation
- reconciliation

### Audit

Ordered event timeline.

## Milestone 8 — Kaleido adapter boundary

Create adapter interface and status UI.

Do not claim production connection if credentials do not exist.

Minimum contract:

```ts
interface EnterpriseOrchestrationAdapter {
  health(): Promise<HealthStatus>;
  submitWorkflow(input: WorkflowInput): Promise<WorkflowReference>;
  getWorkflow(id: string): Promise<WorkflowStatus>;
}
```

## Milestone 9 — BNY/custody adapter boundary

Create generic custody interface first.

```ts
interface CustodyAdapter {
  health(): Promise<HealthStatus>;
  listAccounts(): Promise<CustodyAccount[]>;
  getPositions(accountId: string): Promise<CustodyPosition[]>;
  createPledge(input: PledgeInstruction): Promise<InstructionRef>;
  releasePledge(input: ReleaseInstruction): Promise<InstructionRef>;
  createSettlementInstruction(input: SettlementInstruction): Promise<InstructionRef>;
}
```

BNY implementation remains disabled until actual access exists.

## Milestone 10 — Investor demo

Demo transaction:

1. Open organization.
2. Show eligible asset.
3. Register/choose collateral.
4. Create $-denominated settlement request.
5. Policy engine evaluates.
6. Collateral engine applies haircut.
7. Router selects XRPL testnet.
8. Execute.
9. XRPL confirms.
10. Show transaction hash.
11. Show reconciliation.
12. Show audit trail.

## Done definition

- CI green
- no TypeScript errors
- no failing tests
- no secrets in repo
- no fake production integrations
- real XRPL testnet transaction verified
- idempotency proven by test
- recovery path tested
- investor demo rehearsable from fresh environment
