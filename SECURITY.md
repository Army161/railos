# RailOS Security Policy

RailOS V1 is a non-custodial, XRPL-testnet-only software prototype. Do not use it with production funds, production credentials, or confidential customer data.

## Report a vulnerability

Do not open a public issue for a suspected vulnerability. Use GitHub's private vulnerability reporting for `Army161/railos` when enabled, or contact the repository owner privately.

Include the affected commit, reproducible steps, impact, and any evidence with secrets removed. Never include seeds, private keys, authorization headers, or customer data.

## Hard controls

- No XRPL mainnet signing in V1.
- Testnet secrets are environment-injected and never persisted in application tables.
- Money-moving endpoints require idempotency and organization-scoped authorization before implementation can be accepted.
- Audit events are append-only and contain safe metadata only.
- Kaleido and custody/BNY adapters default to disabled or unconfigured.
- Production activation, secrets, destructive migrations, and merges to `main` require founder approval.

See [`docs/03_SECURITY_AND_GUARDRAILS.md`](docs/03_SECURITY_AND_GUARDRAILS.md) for the authoritative specification.
