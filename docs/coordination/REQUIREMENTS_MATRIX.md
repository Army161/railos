# Requirements-to-Milestone Matrix

| ID    | Requirement                             | Source             | Milestone | Acceptance evidence                                            | Status                               |
| ----- | --------------------------------------- | ------------------ | --------- | -------------------------------------------------------------- | ------------------------------------ |
| M0-01 | pnpm/Turborepo monorepo                 | BUILD V1           | 0         | workspace files, frozen lockfile, local full gate              | Locally verified 2026-08-11          |
| M0-02 | Next.js web shell                       | Approved M0 design | 0         | production build                                               | Locally verified 2026-08-11          |
| M0-03 | Fastify API shell                       | Approved M0 design | 0         | API injection tests and build                                  | Locally verified 2026-08-11          |
| M0-04 | lint/format/typecheck                   | BUILD V1           | 0         | root commands exit 0                                           | Locally verified 2026-08-11          |
| M0-05 | unit-test harness                       | BUILD V1           | 0         | 3 source tests pass                                            | Locally verified 2026-08-11          |
| M0-06 | PostgreSQL Compose                      | BUILD V1           | 0         | YAML parse; runtime check requires Docker-enabled environment  | Config verified; runtime pending     |
| M0-07 | environment template                    | BUILD V1/security  | 0         | template, credential-pattern scan, dependency audit            | Locally verified 2026-08-11          |
| M0-08 | GitHub Actions CI                       | BUILD V1           | 0         | workflow plus remote run                                       | Implemented; remote run pending      |
| M0-09 | CODEOWNERS and protection guide         | BUILD V1/workflow  | 0         | files present; ruleset inspection pending                      | Implemented, external action pending |
| M0-10 | ADR directory                           | BUILD V1           | 0         | ADR 0001 and 0002                                              | Locally verified 2026-08-11          |
| V1-01 | Deterministic policy ALLOW/DENY         | Blueprint          | 2         | reproducibility and deny-path tests                            | Not started                          |
| V1-02 | Precision-safe collateral/haircut       | Blueprint          | 3         | calculation and stale-price tests                              | Not started                          |
| V1-03 | Real validated XRPL testnet transaction | Blueprint          | 4         | tx hash, ledger index, `tesSUCCESS`, validated ledger evidence | Not started                          |
| V1-04 | Idempotent settlement route             | Blueprint/security | 5         | duplicate-key integration tests                                | Not started                          |
| V1-05 | Reconciliation and audit reconstruction | Blueprint          | 6         | end-to-end trace test                                          | Not started                          |
| V1-06 | Investor demo without DB edits          | Investor prototype | 10        | fresh-environment rehearsal                                    | Not started                          |
