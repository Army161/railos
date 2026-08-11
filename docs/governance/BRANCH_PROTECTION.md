# Branch Protection Runbook

## Required branches

- `main`: protected release branch; Jeremy approval required.
- `develop`: integration branch.
- `agent/*`: implementation branches.

## GitHub ruleset for `main`

Create a branch ruleset targeting `main` with:

1. Block deletion and force pushes.
2. Require pull requests before merging.
3. Require at least one approving review.
4. Dismiss stale approvals when new commits are pushed.
5. Require review from CODEOWNERS.
6. Require the `verify` status check from `.github/workflows/ci.yml`.
7. Require branches to be up to date before merging.
8. Require conversation resolution.
9. Restrict bypass permission to the repository owner.

## Integration rule

Agent branches target `develop` first. Promotion from `develop` to `main` requires green CI, zero open P0/P1 findings, recorded review evidence, and explicit founder approval. This document configures intent; protection is not considered active until the GitHub ruleset is inspected and recorded in the decision log.
