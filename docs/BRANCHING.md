# Branching and Commit Strategy

## Branch naming

Use:

```
<type>/<short-description>
```

Allowed `type` values:

- `feat`
- `fix`
- `docs`
- `chore`
- `refactor`
- `test`
- `ci`
- `hotfix`

Examples:

- `feat/add-release-workflow`
- `fix/secret-scan-false-positive`
- `docs/update-workflow-map`

## Commit messages

Conventional Commits are required for non-merge commits:

```
<type>(optional-scope): <subject>
```

Examples:

- `feat(ui): add auto-refresh interval control`
- `fix(ci): pin Node.js major version`
- `docs(readme): document merge queue requirements`

Allowed exceptions:

- Merge commits (`Merge ...`)
- Revert commits (`revert: ...`)

## Recommended branch protection for `main`

Documented in `.github/branch-protection.yml`:

- Required status checks
- Required PR reviews and stale review dismissal
- Conversation resolution before merge
- Linear history
- No force push or deletion
- Signed commits
- Merge queue enabled where available
