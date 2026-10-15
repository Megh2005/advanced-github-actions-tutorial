# Security Policy

## Supported Versions

This tutorial tracks the latest `main` branch for fixes and workflow hardening.

## Reporting a Vulnerability

Please use GitHub private vulnerability reporting:

- Repository Security tab: **Report a vulnerability**

Do not disclose vulnerabilities publicly until maintainers confirm remediation.

## Security model highlights

- Workflows default to least-privilege token permissions.
- `pull_request_target` workflows never check out untrusted PR code.
- Secret scanning checks are pattern-based and do not print secret values.
- Branch protection is documented in `.github/branch-protection.yml` and must be enabled in repository settings.
