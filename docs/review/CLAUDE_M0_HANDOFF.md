# Claude CHIEF_REVIEWER — Milestone 0 Handoff

Review branch: `agent/codex-foundation`

## Scope

Review only the repository foundation, application shells, shared adapter/evidence contracts, CI, local runtime, and governance artifacts. Later milestone behavior is deliberately absent.

## Required review lenses

1. Architecture and dependency direction.
2. Secret exposure and frontend/backend trust boundaries.
3. Integration-claim accuracy for XRPL, Kaleido, and BNY/custody.
4. Financial-state-machine preconditions and precision constraints.
5. Idempotency and restart/recovery requirements preserved for future milestones.
6. CI reproducibility and unsafe dependency/build behavior.
7. Regulatory wording drift from prototype/non-custodial assumptions.

## Severity output

Return findings as P0, P1, P2, or P3 with file path, evidence, impact, and exact acceptance condition. Do not refactor for style. Milestone 0 cannot advance while any P0 or P1 remains open.

## Expected verification

```text
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Confirm that neither UI nor API reports an external integration as live without execution evidence.
