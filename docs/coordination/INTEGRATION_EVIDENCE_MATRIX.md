# Integration Evidence Matrix

Evidence review date: 2026-08-11

| Integration   | Product status           | Verified public capability                                                                       | RailOS-specific evidence                                                                               | Gate to advance status                                                                                                             | Owner                                         |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| XRPL          | `TESTNET — UNCONFIGURED` | Official XRPL JavaScript guidance documents `submitAndWait()` for a final validated result.      | No configured account, connection result, or validated RailOS transaction yet.                         | Testnet health succeeds; one signed transaction returns final `tesSUCCESS`; tx hash and ledger index are persisted and reconciled. | Codex                                         |
| Kaleido       | `CONNECTOR READY`        | Kaleido publishes platform architecture and enterprise orchestration documentation.              | No tenant URL, credentials, contract test, or successful RailOS workflow submission.                   | Credentials approved; health and submit/status contract tests pass against an authorized tenant.                                   | Kimi research / Codex implementation          |
| BNY / custody | `PRODUCTION DISABLED`    | BNY publicly describes digital-asset custody, collateral, payments, and a developer marketplace. | No RailOS client agreement, project, subscription, API entitlement, credential, or successful request. | Founder approves access; entitlement and credentials are verified; legal/security review completes; sandbox contract tests pass.   | Jeremy / Kimi research / Codex implementation |

## Primary sources

- XRPL, [Send XRP](https://xrpl.org/docs/tutorials/payments/send-xrp)
- Kaleido, [Architecture reference](https://docs.kaleido.io/kaleido-platform/architecture-reference/)
- BNY, [Digital Assets Solutions](https://www.bny.com/corporate/global/en/solutions/platforms/digital-assets.html)
- BNY, [Developer Marketplace](https://developer.bny.com/app/open/home)

Public provider capability is not proof that RailOS has access. Status changes require RailOS-specific execution evidence.
