# Troubleshooting

## `npm ci` fails in CI

- Confirm `package-lock.json` is committed and synchronized with `package.json`.
- Re-run locally with `npm ci` and commit lockfile changes.

## Commit message checks fail

- Ensure commit titles follow Conventional Commits.
- Allowed examples: `feat: ...`, `fix(scope): ...`, `docs: ...`.
- Merge and revert commits are accepted by policy.

## PR governance check fails on workflows/docs policy

If your PR changes `.github/workflows/*`, update `docs/WORKFLOWS.md` with the relevant behavior changes.

## Pages deploy does not run

- Deployment is gated to `main`.
- Ensure GitHub Pages is enabled in repository settings with GitHub Actions as source.

## Security workflow failures

- `dependency-review`: only runs on pull requests.
- `npm audit`: fix or document vulnerable dependencies.
- `validate:secrets`: remove potential secrets from changed files.

## Scheduled maintenance issue keeps reopening

The maintenance workflow opens or updates an issue only when a quality, links, or audit check fails. Resolve the underlying failure and rerun the workflow.
