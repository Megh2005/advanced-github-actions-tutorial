# CI Security Anti-Patterns Lab (Training Only)

> **Educational safety notice:** This lab is intentionally non-production and is provided only for secure training and review practice.
> The public repository does **not** ship live vulnerable workflows.
> All examples are disabled and must stay disabled unless reviewed in a private, isolated test environment.

## Why this lab exists

CI pipelines are high-privilege automation surfaces. Small workflow mistakes can expose secrets, allow unauthorized writes, or run untrusted code with sensitive permissions. This lab shows common anti-patterns and the secure replacement for each pattern.

## Anti-patterns and secure replacements

| Anti-pattern | Why it is risky | Secure replacement |
| --- | --- | --- |
| `pull_request_target` + checkout of attacker-controlled refs | `pull_request_target` runs in base-repo context. Checking out `github.event.pull_request.head.sha` executes untrusted code with base-repo token/secrets. | Avoid checking out PR head in `pull_request_target`. Use `pull_request` for untrusted code, or restrict `pull_request_target` to metadata-only API actions. |
| Shell injection from untrusted issue/PR metadata | Titles, bodies, labels, and branch names can contain shell metacharacters. Direct interpolation in `run:` can execute unintended commands. | Treat all user-controlled metadata as untrusted. Pass through safe arguments, validate/escape inputs, and prefer actions/API clients over shell interpolation. |
| Excessive `GITHUB_TOKEN` permissions | Broad write scopes increase blast radius if any step is compromised. | Set least privilege globally (`permissions: { contents: read }`) and grant write scopes only per-job when strictly required. |
| Unpinned third-party actions | Moving tags can introduce unexpected or malicious behavior. | Pin third-party actions to trusted full-length commit SHAs and periodically review/update pins. |
| Downloading and executing remote scripts | Runtime-fetched scripts are mutable supply-chain input and bypass repository review. | Commit reviewed scripts in-repo, or verify checksums/signatures and provenance before execution. |
| Unsafe artifact handling | Artifacts can be tampered with, replaced, or include executable content that is trusted too early. | Validate artifact origin, integrity, and expected file set before use; avoid auto-executing artifact contents. |
| Cache poisoning | Shared or overly broad cache keys let untrusted runs influence trusted builds. | Scope cache keys to trusted context (branch/event/dependencies), avoid restoring privileged caches from untrusted contexts, and use immutable keys where possible. |
| Secret exposure in logs | Echoing or serializing secrets leaks credentials in workflow logs and artifacts. | Never print secrets; use masking, minimal logging, and redaction-aware tooling. |
| Missing concurrency protections | Parallel runs can race and deploy stale or conflicting outputs. | Use `concurrency` groups with appropriate cancellation semantics for critical workflows. |
| Missing environment protections | Deploy jobs without protected environments can run without approvals or guardrails. | Use GitHub Environments with reviewers, wait timers, and environment-scoped secrets for deployments. |

## Repository implementation model

- Disabled training examples live in `.github/labs/` with inert extensions:
  - `.yml.disabled`
  - `.yaml.example`
- A manual workflow (`.github/workflows/ci-security-lab.yml`) performs static checks only.
- The validator fails if lab files are converted into active `.yml`/`.yaml` workflows.

## Safe testing checklist (private/disposable only)

- [ ] Use a private fork or disposable local runner.
- [ ] Keep all lab examples disabled by default.
- [ ] Use fake/demo credentials only; never use production secrets.
- [ ] Restrict token permissions to read-only unless a specific test requires more.
- [ ] Do not execute untrusted PR code in `pull_request_target` context.
- [ ] Review all workflow changes before enabling any experiment.
- [ ] Delete temporary credentials and teardown test environments after exercises.

## Non-goals

This lab does **not** provide exploit automation, persistence techniques, destructive payloads, credential exfiltration, or malware behavior.
