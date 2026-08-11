# BUZZ TEAM WORKFLOW

## Purpose

Buzz is the shared coordination layer. GitHub is the source of truth.

## Agent roles

### Founder / Product Owner — Jeremy

Owns:

- product decisions
- scope decisions
- pricing decisions
- investor story
- approval for merge to main
- approval for production credentials
- approval for production blockchain/custody actions

### Codex — TECH_LEAD

Owns:

- repository architecture
- task decomposition
- implementation
- tests
- CI/CD
- integration
- release candidates

### Claude Code — CHIEF_REVIEWER

Owns:

- architecture review
- security review
- concurrency review
- financial state-machine review
- trust-boundary review
- failure/recovery review

Claude does not refactor merely for style.

### Kimi — SPEC_GUARDIAN

Owns:

- XRPL/Kaleido/BNY documentation matrix
- specification drift detection
- external requirements mapping
- requirement-to-test matrix
- research notes

Kimi should not be a blocking runtime dependency for V1.

## Suggested Buzz channels

```text
#00-founder-command
#01-architecture
#02-xrpl
#03-policy-engine
#04-collateral
#05-settlement-router
#06-kaleido
#07-custody-bny
#08-security
#09-frontend
#10-testing
#11-investor-demo
#12-research
#13-build-status
```

## Git strategy

Protected:

- `main`

Integration:

- `develop`

Agent branches:

```text
agent/codex-foundation
agent/codex-xrpl
agent/codex-policy
agent/codex-collateral
agent/codex-settlement
agent/codex-dashboard
agent/claude-review-*
```

## Required workflow

```text
TASK
  |
  v
CODEX BUILD
  |
  v
AUTOMATED TESTS
  |
  v
CLAUDE REVIEW
  |
  +---- FAIL ----> CODEX FIX
  |
 PASS
  |
  v
INTEGRATION TEST
  |
  v
HUMAN APPROVAL
  |
  v
MERGE
```

## Review severity

- P0 — funds/security/custody catastrophic defect; block merge
- P1 — serious settlement/integrity defect; block merge
- P2 — material reliability/operability defect; normally block
- P3 — improvement; may merge with tracked issue

## Human approval gates

Mandatory for:

- merge to main
- production deployment
- production XRPL signing
- secret changes
- schema destructive migrations
- custody integration activation
- BNY/Kaleido production credentials
- authorization-policy changes affecting live customers
- money-moving logic changes

## Buzz first message

Paste into `#00-founder-command`:

> RailOS is an institutional collateral and settlement control plane. GitHub is the source of truth and Buzz is the coordination layer. Read README.md, docs/00_MASTER_BLUEPRINT.md, docs/01_BUILD_V1.md, docs/02_BUZZ_TEAM_WORKFLOW.md and docs/03_SECURITY_AND_GUARDRAILS.md before editing code. Codex is TECH_LEAD. Claude Code is CHIEF_REVIEWER. Kimi is SPEC_GUARDIAN. Begin with Milestone 0 only. Do not advance milestones until CI is green and review findings P0/P1 are zero.
