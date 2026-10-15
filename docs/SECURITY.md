# Security Deep Dive

## Workflow security model

- Default token permissions are read-only unless write is required.
- `pull_request_target` workflows are used only for metadata operations and never execute PR head code.
- Secret-oriented scanning uses local pattern checks that report only file-level findings.
- Dependency and static analysis are automated with Dependency Review, npm audit, and CodeQL.

## OIDC and deployment

`deploy-pages.yml` uses `id-token: write` for GitHub Pages deployment through official actions. No long-lived cloud credentials are stored in the repository.

## Manual repository settings checklist

1. Enable branch protection using `.github/branch-protection.yml` as policy reference.
2. Enable GitHub Pages for deployment source: GitHub Actions.
3. Enable CodeQL and private vulnerability reporting in repository security settings.
4. Optionally enforce merge queue and signed commits.

## Secure workflow authoring reminders

- Avoid checking out untrusted code in `pull_request_target` context.
- Avoid unsafe shell interpolation with untrusted PR metadata.
- Keep action versions pinned to stable major versions.
