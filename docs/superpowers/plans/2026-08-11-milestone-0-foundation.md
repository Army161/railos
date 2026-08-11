# RailOS Milestone 0 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish an auditable, investor-prototype-ready repository foundation without representing any institutional integration as live.

**Architecture:** Use a pnpm/Turborepo TypeScript monorepo with isolated Next.js and Fastify application shells plus shared domain contracts. A small evidence-status module is the first tested behavior and is consumed by the API so integration claims are machine-readable and fail closed.

**Tech Stack:** Node.js 24, pnpm 11, TypeScript 6, Turborepo 2, Next.js 16, React 19, Fastify 5, Zod 4, Vitest 4, ESLint 10, Prettier 3, PostgreSQL 17, Docker Compose, GitHub Actions.

## Global Constraints

- V1 is a non-custodial software prototype.
- XRPL is testnet only; no production mainnet private keys.
- Kaleido is `CONNECTOR READY` until verified tenant connectivity exists.
- BNY/custody is `PRODUCTION DISABLED` until real client access and credentials exist.
- Never use binary floating point for money.
- Never commit or log secrets.
- `main` requires Jeremy's approval; this plan does not merge to `main`.
- Do not advance beyond Milestone 0 until CI is green and review findings P0/P1 are zero.

---

### Task 1: Seed the controlled repository

**Files:**

- Create: `README.md`
- Create: `.gitignore`
- Preserve: `docs/00_MASTER_BLUEPRINT.md`
- Preserve: `docs/01_BUILD_V1.md`
- Preserve: `docs/02_BUZZ_TEAM_WORKFLOW.md`
- Preserve: `docs/03_SECURITY_AND_GUARDRAILS.md`
- Preserve: `docs/04_INVESTOR_PROTOTYPE.md`

**Interfaces:**

- Consumes: the five authoritative project documents.
- Produces: the common baseline for `main`, `develop`, and `agent/codex-foundation`.

- [ ] **Step 1: Verify the authoritative files are present and non-empty**

Run: `test -s docs/00_MASTER_BLUEPRINT.md && test -s docs/01_BUILD_V1.md && test -s docs/02_BUZZ_TEAM_WORKFLOW.md && test -s docs/03_SECURITY_AND_GUARDRAILS.md && test -s docs/04_INVESTOR_PROTOTYPE.md`

Expected: exit 0.

- [ ] **Step 2: Commit the repository seed**

Run: `git add README.md .gitignore docs && git commit -m "chore: seed RailOS control baseline"`

Expected: one root commit on `clawdbot-permanent`.

- [ ] **Step 3: Create controlled branches**

Run: `git branch main && git branch develop && git switch -c agent/codex-foundation`

Expected: work continues only on `agent/codex-foundation`.

### Task 2: Establish monorepo tooling and failing evidence-contract test

**Files:**

- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `tsconfig.base.json`
- Create: `eslint.config.mjs`
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Create: `packages/contracts/package.json`
- Create: `packages/contracts/tsconfig.json`
- Create: `packages/contracts/src/integration-status.test.ts`

**Interfaces:**

- Consumes: evidence labels required by the master blueprint and security specification.
- Produces: `getIntegrationStatuses(): IntegrationStatus[]` from `@railos/contracts`.

- [ ] **Step 1: Add workspace configuration and the test first**

The test imports `getIntegrationStatuses()` and asserts exact fail-closed statuses: XRPL `UNCONFIGURED`, Kaleido `CONNECTOR_READY`, custody `PRODUCTION_DISABLED`.

- [ ] **Step 2: Install dependencies**

Run: `pnpm install --frozen-lockfile=false`

Expected: `pnpm-lock.yaml` is created.

- [ ] **Step 3: Run the test and verify RED**

Run: `pnpm --filter @railos/contracts test`

Expected: failure because `src/integration-status.ts` does not exist.

### Task 3: Implement shared integration and adapter contracts

**Files:**

- Create: `packages/contracts/src/integration-status.ts`
- Create: `packages/contracts/src/adapters.ts`
- Create: `packages/contracts/src/index.ts`

**Interfaces:**

- Produces: `IntegrationKind`, `EvidenceStatus`, `IntegrationStatus`, `HealthStatus`, `EnterpriseOrchestrationAdapter`, and `CustodyAdapter`.
- Safety rule: no adapter implementation may default to a connected or production-enabled state.

- [ ] **Step 1: Implement the minimum evidence-status behavior**

Return literal immutable status records with non-claiming descriptions.

- [ ] **Step 2: Run the contract test and verify GREEN**

Run: `pnpm --filter @railos/contracts test`

Expected: all contract tests pass.

- [ ] **Step 3: Run the mutation check**

Change one returned status locally, verify the test fails, restore it, and verify the test passes.

### Task 4: Add Fastify and Next.js application shells

**Files:**

- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/src/app.test.ts`
- Create: `apps/api/src/app.ts`
- Create: `apps/api/src/server.ts`
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next-env.d.ts`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/page.tsx`
- Create: `apps/web/app/globals.css`

**Interfaces:**

- Consumes: `getIntegrationStatuses()`.
- Produces: `GET /health` and `GET /v1/integrations/status`; a buildable investor-facing status shell.

- [ ] **Step 1: Write API tests first**

Assert `/health` reports `healthy` and `/v1/integrations/status` returns the exact fail-closed evidence states.

- [ ] **Step 2: Run API tests and verify RED**

Run: `pnpm --filter @railos/api test`

Expected: failure because `buildApp()` does not exist.

- [ ] **Step 3: Implement the minimum Fastify app and Next.js shell**

The UI must call the product a prototype and display only the truthful status labels.

- [ ] **Step 4: Run API tests and verify GREEN**

Run: `pnpm --filter @railos/api test`

Expected: all API tests pass.

### Task 5: Add runtime, CI, governance, and project-control artifacts

**Files:**

- Create: `docker-compose.yml`
- Create: `.env.example`
- Create: `.github/workflows/ci.yml`
- Create: `.github/CODEOWNERS`
- Create: `SECURITY.md`
- Create: `docs/governance/BRANCH_PROTECTION.md`
- Create: `docs/architecture/adr/0001-monorepo-and-boundaries.md`
- Create: `docs/architecture/adr/0002-integration-evidence-status.md`
- Create: `docs/coordination/REQUIREMENTS_MATRIX.md`
- Create: `docs/coordination/INTEGRATION_EVIDENCE_MATRIX.md`
- Create: `docs/coordination/REGULATORY_ASSUMPTIONS.md`
- Create: `docs/coordination/RISK_REGISTER.md`
- Create: `docs/coordination/DECISION_LOG.md`
- Create: `docs/coordination/MILESTONE_STATUS.md`
- Create: `docs/review/CLAUDE_M0_HANDOFF.md`

**Interfaces:**

- Produces: reproducible local PostgreSQL configuration, required CI gates, and auditable product/research controls.

- [ ] **Step 1: Add local runtime and CI**

Use PostgreSQL 17 with a health check. CI runs install, format check, lint, typecheck, test, and build on Node.js 24 with no production secrets.

- [ ] **Step 2: Add governance and evidence registers**

Every institutional capability must have a status, evidence requirement, owner, and next verification action.

- [ ] **Step 3: Add reviewer handoff**

Request P0/P1 review of architecture, secrets, trust boundaries, financial-state-machine preconditions, recovery, and claims accuracy.

### Task 6: Verify and commit Milestone 0

**Files:**

- Modify: `docs/coordination/MILESTONE_STATUS.md`
- Modify: `docs/coordination/DECISION_LOG.md`

**Interfaces:**

- Produces: a reviewable `agent/codex-foundation` commit; no merge to `main`.

- [ ] **Step 1: Run the complete gate**

Run: `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build`

Expected: all commands exit 0.

- [ ] **Step 2: Validate repository safety**

Run: `git grep -nE '(sEd|seed|secret|private[_ -]?key)[[:space:]]*[:=][[:space:]]*[^<]' -- ':!pnpm-lock.yaml' || true`

Expected: no committed credential values.

- [ ] **Step 3: Review the requirements matrix**

Confirm every Milestone 0 deliverable and exit command has evidence; do not mark later milestones complete.

- [ ] **Step 4: Commit the foundation**

Run: `git add -A && git commit -m "chore: establish Milestone 0 foundation"`

Expected: the agent branch contains only the approved Milestone 0 scope.
