# MASTER BLUEPRINT — RailOS

## 1. Product thesis

RailOS is an institutional control plane for tokenized collateral and settlement.

It sits above blockchains, custodians and enterprise middleware and answers four questions before money moves:

1. **Who is allowed to transact?**
2. **Which asset/collateral is eligible?**
3. **What constraints must be satisfied?**
4. **Which approved settlement rail should execute the transaction?**

The initial network is XRPL. Kaleido is the enterprise-orchestration layer. BNY is an institutional custody/collateral integration target, not a dependency for prototype completion.

## 2. V1 customer

Primary design-partner targets:

- tokenization platforms
- stablecoin infrastructure companies
- digital-asset custodians
- institutional fintechs
- RWA issuers
- asset managers experimenting with tokenized Treasury/MMF collateral

## 3. V1 problem

Institutions must currently integrate identity/KYB, chain access, asset rules, custody, collateral policy, settlement and reconciliation separately.

RailOS collapses those into a single policy-controlled API and dashboard.

## 4. Control-plane architecture

```text
Institution / Fintech / Asset Manager
                |
                v
        RailOS API Gateway
                |
     +----------+-----------+
     |          |           |
     v          v           v
 Identity    Policy      Collateral
     |          |           |
     +----------+-----------+
                |
                v
        Settlement Router
                |
     +----------+-----------+
     |          |           |
     v          v           v
    XRPL      Kaleido     Custody
                          Adapters
```

## 5. Ownership layers

RailOS should own/control:

- customer API
- policy engine
- permission graphs
- institution profiles
- asset eligibility rules
- collateral eligibility and haircut logic
- settlement state machine
- route-selection logic
- reconciliation
- immutable-style audit records
- custodian/rail adapters
- usage metering
- customer integration history
- operational telemetry

RailOS does not own:

- XRPL
- Kaleido
- BNY
- Ripple
- RLUSD
- regulated custody functions performed by third parties

## 6. Primary workflows

### 6.1 Institution onboarding

1. Create organization.
2. Assign admins/users.
3. Connect XRPL account.
4. Store external KYB/KYC reference.
5. Associate credentials.
6. Evaluate access policy.
7. Approve organization for specific domains/assets.

### 6.2 Asset onboarding

1. Register asset.
2. Identify issuer.
3. Identify network.
4. Define asset type.
5. Configure eligibility policy.
6. Configure valuation source.
7. Configure haircut.
8. Configure concentration limits.
9. Enable/disable settlement use.

### 6.3 Collateral pledge

1. Institution requests pledge.
2. Policy engine evaluates institution + asset.
3. Collateral engine values position.
4. Haircut applied.
5. Sufficiency checked.
6. Pledge state created.
7. Blockchain transaction initiated if required.
8. XRPL confirmation recorded.
9. Audit event written.
10. Position reconciled.

### 6.4 Settlement

1. Institution requests settlement.
2. Request receives idempotency key.
3. Policy evaluation.
4. Available routes generated.
5. Route scoring.
6. Approved route selected.
7. Execution submitted.
8. Chain confirmation observed.
9. Settlement finalized.
10. Audit/reconciliation written.

## 7. V1 state machines

### Settlement

```text
CREATED
 -> POLICY_PENDING
 -> POLICY_APPROVED
 -> ROUTE_SELECTED
 -> SIGNING_PENDING
 -> SUBMITTED
 -> CONFIRMED
 -> RECONCILED
 -> COMPLETE
```

Failure states:

```text
POLICY_REJECTED
SIGNING_FAILED
SUBMISSION_FAILED
EXPIRED
RECONCILIATION_FAILED
CANCELLED
```

### Collateral pledge

```text
DRAFT
 -> ELIGIBILITY_PENDING
 -> ELIGIBLE
 -> PLEDGE_PENDING
 -> PLEDGED
 -> ACTIVE
 -> RELEASE_PENDING
 -> RELEASED
```

Optional later:

```text
MARGIN_REQUIRED
LIQUIDATION_PENDING
LIQUIDATED
```

## 8. API surface

### Organizations

- `POST /v1/organizations`
- `GET /v1/organizations/:id`
- `POST /v1/organizations/:id/members`
- `POST /v1/organizations/:id/xrpl-accounts`

### Policy

- `POST /v1/policy/evaluate`
- `GET /v1/policy/decisions/:id`
- `POST /v1/policy/rules`
- `PATCH /v1/policy/rules/:id`

### Assets

- `POST /v1/assets`
- `GET /v1/assets/:id`
- `POST /v1/assets/:id/eligibility`

### Collateral

- `POST /v1/collateral/positions`
- `POST /v1/collateral/pledges`
- `POST /v1/collateral/pledges/:id/release`
- `POST /v1/collateral/pledges/:id/substitute`
- `GET /v1/collateral/exposure`

### Settlement

- `POST /v1/settlements/quote`
- `POST /v1/settlements`
- `POST /v1/settlements/:id/execute`
- `GET /v1/settlements/:id`
- `GET /v1/settlements/:id/audit`

### Integrations

- `GET /v1/integrations/xrpl/status`
- `GET /v1/integrations/kaleido/status`
- `GET /v1/integrations/custody/status`

## 9. Core data model

Minimum entities:

- Organization
- User
- Role
- XrplAccount
- CredentialReference
- PermissionDomainReference
- Asset
- AssetPolicy
- PriceObservation
- CollateralPosition
- CollateralPledge
- PolicyRule
- PolicyDecision
- SettlementRequest
- SettlementRoute
- SettlementExecution
- LedgerTransaction
- ReconciliationRecord
- IntegrationConnection
- AuditEvent
- IdempotencyRecord

## 10. Policy engine

Policy evaluation must be deterministic.

Example inputs:

- organization
- jurisdiction
- credential status
- asset
- issuer
- custodian
- amount
- haircut
- settlement rail
- concentration exposure
- transaction type

Example output:

```json
{
  "decision": "ALLOW",
  "ruleSetVersion": "2026-08-v1",
  "reasons": [],
  "requirements": [
    "credential.active",
    "jurisdiction.allowed",
    "asset.eligible",
    "collateral.ratio >= 1.05"
  ]
}
```

Every decision stores:

- input hash
- rule-set version
- result
- reasons
- timestamp
- actor
- trace ID

## 11. Settlement router

The router does not optimize solely for cost.

Score dimensions:

- policy eligibility
- rail availability
- expected finality
- estimated cost
- liquidity
- asset compatibility
- counterparty compatibility
- operational risk
- custody constraints

Policy eligibility is a hard gate.

## 12. XRPL module

Prototype requirements:

- connect to XRPL testnet
- create/fund test accounts where appropriate
- submit signed transaction
- poll/subscribe for validation
- store transaction hash
- store ledger index
- store outcome
- expose network health
- map chain result to settlement state machine

Advanced XRPL institutional primitives can be added incrementally only where they are available and stable enough for the prototype.

## 13. Kaleido adapter

Adapter contract:

- connection configuration
- health/status
- submit workflow/event
- receive workflow/event
- map RailOS transaction IDs to Kaleido/FireFly IDs
- retry and dead-letter behavior

V1 may run without Kaleido production connectivity, but the adapter contract must be real and testable.

## 14. BNY/custodian adapter

Build an interface, not a fake integration.

Interface should support:

- list accounts
- list eligible assets
- fetch positions
- pledge instruction
- release instruction
- settlement instruction
- status
- reconciliation import

Production BNY connectivity remains disabled until valid client access and credentials exist.

## 15. UX

Investor demo screens:

1. Command Center
2. Organizations
3. Assets
4. Collateral
5. Policy Decision
6. Settlement Router
7. Transaction Detail
8. Audit Trail
9. Integration Health

The demo must clearly distinguish:

- LIVE TESTNET
- CONNECTOR READY
- PRODUCTION DISABLED

## 16. Monetization

Prototype pricing hypothesis:

- Design partner: $15k–$30k implementation
- Platform: $7.5k–$15k/month
- Enterprise: $25k–$75k+/month
- Later: API usage + premium compliance/collateral modules

These are pricing hypotheses, not revenue forecasts.

## 17. V1 success criteria

V1 is complete when:

- a real XRPL testnet settlement can be initiated from the RailOS UI
- policy engine approves/rejects based on stored versioned rules
- collateral value + haircut is computed deterministically
- settlement is idempotent
- XRPL confirmation advances the state machine
- audit trail can reconstruct the complete decision/execution path
- reconciliation succeeds
- the demo can run end-to-end without manually editing the database
- BNY/Kaleido boundaries are accurately labeled
