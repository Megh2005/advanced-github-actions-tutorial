# Contributing

Thanks for improving this advanced GitHub Actions tutorial.

## Setup

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Run checks:
   ```bash
   npm run check
   npm run validate:secrets
   ```

## Branch and commit standards

- Branch naming: `type/short-description` where `type` is one of `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`, `hotfix`.
- Commit messages follow Conventional Commits (examples in [docs/BRANCHING.md](docs/BRANCHING.md)).
- Merge and revert commits are allowed by policy.

To use the provided commit template:

```bash
git config commit.template .gitmessage.txt
```

## Pull request process

1. Keep PRs focused and include tests/docs updates when required.
2. Fill out the PR template completely.
3. Ensure CI, PR Governance, and Security checks pass.
4. If you change `.github/workflows/*`, update [docs/WORKFLOWS.md](docs/WORKFLOWS.md).

## Security and secrets

- Do not commit secrets.
- Run `npm run validate:secrets` before pushing.
- Report vulnerabilities using [SECURITY.md](SECURITY.md).
