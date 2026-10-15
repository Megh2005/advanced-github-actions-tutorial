# Workflows Guide

This repository demonstrates practical advanced GitHub Actions patterns.

## Workflow map

- `ci.yml` — main validation pipeline for push/PR/merge-group. Uses reusable workflow + static checks, artifacts, summaries, concurrency.
- `ci-security-lab.yml` — manual-only static guardrail checks for disabled CI security lab examples.
- `reusable-validate.yml` — reusable validation via `workflow_call`, with inputs, outputs, optional secrets, matrix strategy, and cache.
- `security.yml` — dependency review, npm audit, local secret-pattern scan, and CodeQL analysis.
- `deploy-pages.yml` — validates and deploys static site to GitHub Pages on `main`.
- `release.yml` — tag/manual release, validation, packaging, auto release notes.
- `scheduled-maintenance.yml` — weekly quality/security checks and issue auto-update only when failures exist.
- `pr-automation.yml` — safe `pull_request_target` labeling and metadata comment without untrusted code execution.
- `pr-governance.yml` — branch name, PR title, changed-file policy, commit message checks.

## CI security anti-patterns lab (intentionally inert)

This repository includes disabled CI anti-pattern examples for training in `.github/labs/`.
These files use inert extensions (`.yml.disabled` / `.yaml.example`) so they are **not** executed by GitHub Actions.

- Lab guide: [docs/CI_SECURITY_LAB.md](docs/CI_SECURITY_LAB.md)
- Disabled examples:
  - `.github/labs/pull-request-target-checkout.yml.disabled`
  - `.github/labs/untrusted-shell-input.yml.disabled`
  - `.github/labs/excessive-permissions.yml.disabled`
  - `.github/labs/unpinned-action.yml.disabled`
  - `.github/labs/remote-script-execution.yml.disabled`
  - `.github/labs/unsafe-artifact.yml.disabled`

> ⚠️ Public safety warning: this public repository intentionally does **not** include live vulnerable workflows.
> Never copy lab anti-patterns into active workflows without full security review in a private/disposable environment.

### Safe testing checklist (private/disposable only)

- [ ] Use a private fork or disposable local runner.
- [ ] Keep all lab examples disabled by default.
- [ ] Use fake/demo credentials only; do not use real secrets.
- [ ] Keep permissions least-privilege (read-only unless explicitly required).
- [ ] Do not run untrusted pull-request code in privileged `pull_request_target` context.
- [ ] Remove temporary credentials and cleanup test environments after training.

## Advanced concepts illustrated

- Matrix jobs and cache reuse (`actions/setup-node` with npm cache).
- Reusable workflows with typed inputs/outputs.
- Concurrency controls to cancel stale runs where appropriate.
- Artifact upload for validation and release handoff.
- Job summaries for human-readable pipeline outcomes.
- `merge_group` event support for merge queue compatibility.
- Least-privilege permissions and explicit security boundaries.

## Notes

- Branch protection and merge queue are configured in repository settings; file-based templates only document policy.
- Pages deployment requires GitHub Pages enabled in repository settings.
