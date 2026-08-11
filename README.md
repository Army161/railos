# RailOS

RailOS is an institutional control-plane prototype for policy-governed tokenized collateral and settlement. V1 is non-custodial and XRPL-testnet-only.

## Evidence status

| Capability    | Status                   | Meaning                                                                                                    |
| ------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| XRPL          | `TESTNET — UNCONFIGURED` | The adapter contract exists; live testnet status requires a verified connection and validated transaction. |
| Kaleido       | `CONNECTOR READY`        | Contract/design only; no live tenant connectivity is claimed.                                              |
| BNY / custody | `PRODUCTION DISABLED`    | Generic custody contract only; no BNY access or production integration is claimed.                         |

The authoritative product, build, workflow, security, and demo requirements are in [`docs/`](docs/).

## Milestone

Milestone 0 establishes the repository, tooling, application shells, CI, governance, and evidence controls. It does not move funds or activate production integrations.
