# INVESTOR PROTOTYPE

## Goal

Prove in under 90 seconds that RailOS can control an institutional-style collateral + settlement workflow and execute a real XRPL testnet transaction.

## Demo story

### 1. Open RailOS

Show:

- network: XRPL TESTNET — LIVE
- policy engine: HEALTHY
- collateral engine: HEALTHY
- settlement router: HEALTHY

### 2. Select organization

Use a clearly labeled demonstration organization created inside the app.

Show:

- active status
- jurisdiction
- connected XRPL test account
- credential/reference status

### 3. Select asset/collateral

Show:

- asset
- valuation timestamp
- gross value
- haircut
- eligible collateral value

### 4. Request settlement

Enter amount.

System returns policy checks:

- organization active
- jurisdiction allowed
- asset eligible
- amount within limit
- collateral sufficient
- XRPL route approved

### 5. Route selection

Show:

- XRPL TESTNET — AVAILABLE
- Kaleido — CONNECTOR READY
- BNY — CONNECTOR READY

RailOS selects XRPL_TESTNET.

### 6. Execute

System:

1. reserves/idempotently locks request
2. submits XRPL transaction
3. waits for validation
4. stores tx hash + ledger index
5. reconciles
6. marks COMPLETE

### 7. Prove auditability

Open audit timeline.

Show every policy and settlement event with trace IDs.

## Investor positioning

Do not pitch XRP price.

Pitch:

> RailOS is the control plane that determines whether an institutional transaction is permitted, how collateral is treated, and which approved financial rail executes it.

## Prototype proof points

- real blockchain transaction
- deterministic policy
- deterministic collateral calculation
- explicit settlement state machine
- idempotency
- reconciliation
- full audit trail
- clean adapter architecture for enterprise/custody systems

## What the prototype does not claim

- production bank connectivity
- production BNY connectivity
- custody
- clearing
- brokerage
- guaranteed transaction volume
- guaranteed regulatory outcome
