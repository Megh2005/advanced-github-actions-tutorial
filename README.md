# advanced-github-actions-tutorial

A self-contained static HTML/CSS/JavaScript app plus a complete advanced GitHub Actions tutorial setup for CI/CD, governance, security, release management, and GitHub Pages.

## Architecture

- **Frontend:** `index.html`, `styles.css`, `script.js`
  - Cryptographically secure random-string generation using `crypto.getRandomValues`
  - Manual generation + interval auto-refresh
  - Accessible status updates (`aria-live`), copy and download controls
  - Responsive CSS without external frameworks
- **Validation scripts:** `scripts/*.mjs`
  - HTML/CSS structural checks
  - Format checks
  - Local markdown link checks
  - Secret-pattern scanning
- **Tests:** `tests/random.test.js` using Node's built-in test runner (`node:test`)
- **No external runtime dependencies** for the application itself

## Local usage

```bash
npm ci
npm run check
npm run build
```

Open `index.html` directly in a browser for local demo usage.

### Useful scripts

- `npm run check` — format + lint + tests
- `npm run validate:secrets` — secret-pattern check
- `npm run check:links` — local markdown link validation
- `npm run build` — creates `dist/`

## Workflow map

See [docs/WORKFLOWS.md](docs/WORKFLOWS.md) for details.

- `ci.yml`
- `ci-security-lab.yml` (manual static checks for disabled training examples)
- `reusable-validate.yml`
- `security.yml`
- `deploy-pages.yml`
- `release.yml`
- `scheduled-maintenance.yml`
- `pr-automation.yml`
- `pr-governance.yml`

## CI security anti-patterns lab (safe training only)

This repository includes a **non-production training lab** for CI security review practice:

- Lab guide: [docs/CI_SECURITY_LAB.md](docs/CI_SECURITY_LAB.md)
- Disabled examples: `.github/labs/*.yml.disabled`
- Guardrail workflow: `.github/workflows/ci-security-lab.yml` (`workflow_dispatch` only)

> ⚠️ Public safety warning: this public repository intentionally does **not** include live vulnerable workflows.
> Lab examples are intentionally disabled and must remain disabled unless reviewed in a private, isolated test setup.

### Safe testing checklist (private/disposable only)

- [ ] Use a private fork or disposable local runner.
- [ ] Keep lab workflows disabled by default.
- [ ] Use fake/demo credentials only (never real or production secrets).
- [ ] Keep token permissions read-only unless strictly required for a controlled test.
- [ ] Do not run untrusted PR code under `pull_request_target` with write permissions.
- [ ] Tear down temporary credentials and test infrastructure after exercises.

## Security model

- Least-privilege workflow permissions by default
- `pull_request_target` used only for safe metadata tasks
- Dependency review + npm audit + CodeQL
- Secret-pattern scanning that avoids leaking sensitive values

See [SECURITY.md](SECURITY.md) and [docs/SECURITY.md](docs/SECURITY.md).

## Branch strategy

- Main integration branch: `main`
- Topic branches: `type/short-description` (e.g., `feat/add-pages-deploy`)
- Enforced in PR governance workflow

Details: [docs/BRANCHING.md](docs/BRANCHING.md)

## Commit convention

Conventional Commits are required for PR commits:

- `feat(scope): add reusable workflow`
- `fix(ci): tighten workflow permissions`
- `docs(readme): document release process`

Merge and revert commits are accepted exceptions.

### Commit template

This repository includes `.gitmessage.txt`. Configure it locally:

```bash
git config commit.template .gitmessage.txt
```

## Issue and pull request process

- Use issue templates in `.github/ISSUE_TEMPLATE/`
- Use `.github/pull_request_template.md` for every PR
- If workflow behavior changes, update `docs/WORKFLOWS.md`

## GitHub Pages setup

1. In repository settings, open **Pages**.
2. Set source to **GitHub Actions**.
3. Merge changes to `main` and let `deploy-pages.yml` publish the site.

## Repository settings checklist (manual)

Some controls cannot be fully activated by repository files alone:

- Branch protection (`main`) using `.github/branch-protection.yml` as policy template
- Required status checks and review rules
- Conversation resolution and linear history
- Restrict force push/deletion
- Signed commits
- Merge queue (optional, with `merge_group`-aware workflows)
- Enable CodeQL and private vulnerability reporting

## Tutorial: advanced GitHub Actions features in this repository

### Matrix jobs

`reusable-validate.yml` runs Node validation across a matrix (`18`, `20`) for compatibility.

### Reusable workflows

`workflow_call` inputs/outputs/secrets demonstrate modular pipeline design.

### Artifacts

CI and release workflows upload `dist/` and packaged archives for downstream jobs.

### Environments

`deploy-pages.yml` deploys to the `github-pages` environment and publishes deployment URLs.

### OIDC and security

Pages deployment uses `id-token: write` for trusted authentication without long-lived secrets.

### Concurrency control

CI, Pages, security, and release workflows define concurrency groups to avoid stale or conflicting runs.

### Job summaries

CI appends a concise markdown summary to `$GITHUB_STEP_SUMMARY`.

### Caching

Node dependency caching is enabled through `actions/setup-node` with `cache: npm`.

### Scheduled jobs

`schedule` triggers in `security.yml` and `scheduled-maintenance.yml` demonstrate periodic automation.

### Release automation

`release.yml` supports tag-triggered and manual release execution, artifact packaging, and generated release notes.

### `pull_request_target` risks and safe usage

`pr-automation.yml` and `pr-governance.yml` run in base-repo context and intentionally avoid checking out PR code. They only perform metadata checks and API-driven validation.

## Additional docs

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SUPPORT.md](SUPPORT.md)
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
