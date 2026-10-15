# Workflows Guide

This repository demonstrates practical advanced GitHub Actions patterns.

## Workflow map

- `ci.yml` — main validation pipeline for push/PR/merge-group. Uses reusable workflow + static checks, artifacts, summaries, concurrency.
- `reusable-validate.yml` — reusable validation via `workflow_call`, with inputs, outputs, optional secrets, matrix strategy, and cache.
- `security.yml` — dependency review, npm audit, local secret-pattern scan, and CodeQL analysis.
- `deploy-pages.yml` — validates and deploys static site to GitHub Pages on `main`.
- `release.yml` — tag/manual release, validation, packaging, auto release notes.
- `scheduled-maintenance.yml` — weekly quality/security checks and issue auto-update only when failures exist.
- `pr-automation.yml` — safe `pull_request_target` labeling and metadata comment without untrusted code execution.
- `pr-governance.yml` — branch name, PR title, changed-file policy, commit message checks.

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
