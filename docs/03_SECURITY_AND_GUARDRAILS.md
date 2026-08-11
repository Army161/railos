# SECURITY AND GUARDRAILS

## 1. Prototype classification

RailOS V1 is a **non-custodial software prototype**.

It must not represent itself as:

- a bank
- a broker-dealer
- an exchange
- a clearing agency
- a qualified custodian
- a transfer agent
- a lender
- a BNY production client/integration unless true

## 2. Key management

Prototype:

- XRPL testnet only
- environment-injected testnet secrets
- never persist private keys in application tables
- never log secrets
- never expose secrets to frontend

Production design:

- external KMS/HSM/custody signer
- signing service separated from application API
- scoped signing policies

## 3. Idempotency

All money-moving endpoints require an idempotency key.

Duplicate request behavior:

- same key + same payload => return original result
- same key + different payload => reject
- never submit duplicate chain transaction

## 4. Authorization

Minimum RBAC:

- OWNER
- ADMIN
- OPERATOR
- AUDITOR
- VIEWER

Sensitive actions require organization scope.

## 5. Audit

Audit events are append-only.

Each event stores:

- event ID
- timestamp
- actor
- organization
- resource
- action
- trace ID
- request ID
- outcome
- selected safe metadata
- previous/current state where appropriate

No secrets.

## 6. Financial precision

Never use binary floating point for monetary calculation.

Use integer minor units or arbitrary precision decimals.

Every asset records:

- currency/asset identifier
- decimals
- source
- valuation timestamp

## 7. State-machine integrity

No state skipping.

Invalid transition => error + audit event.

Network confirmation is required before final settlement states.

## 8. External integrations

Each external adapter must implement:

- timeout
- retry policy
- circuit breaker behavior
- health status
- typed errors
- correlation ID
- safe logging
- disabled/unconfigured state

## 9. Failure recovery

System must survive:

- process restart after transaction submission
- duplicate webhook/event
- provider timeout
- network disconnect
- XRPL delayed confirmation
- database retry
- stale price observation

## 10. Demo honesty

UI badges:

- `XRPL TESTNET — LIVE`
- `KALEIDO — CONNECTOR READY` until real connected
- `BNY — CONNECTOR READY` until real connected

Never fabricate customer names, AUM, settlement volume or production integrations as factual claims.
