import { readFile } from "node:fs/promises";

const filesToScan = [
  "index.html",
  "styles.css",
  "script.js",
  "package.json",
  "README.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "SUPPORT.md",
  "docs/WORKFLOWS.md",
  "docs/BRANCHING.md",
  "docs/SECURITY.md",
  "docs/TROUBLESHOOTING.md",
  ".github/workflows/ci.yml",
  ".github/workflows/security.yml",
  ".github/workflows/deploy-pages.yml",
  ".github/workflows/release.yml",
  ".github/workflows/reusable-validate.yml",
  ".github/workflows/scheduled-maintenance.yml",
  ".github/workflows/pr-automation.yml",
  ".github/workflows/pr-governance.yml",
];

const patterns = [
  /ghp_[A-Za-z0-9]{36}/g,
  /github_pat_[A-Za-z0-9_]{20,}/g,
  /AKIA[0-9A-Z]{16}/g,
  /-----BEGIN (RSA|EC|OPENSSH|DSA|PRIVATE KEY)-----/g,
  /xox[baprs]-[A-Za-z0-9-]{10,}/g,
  /AIza[0-9A-Za-z\-_]{35}/g,
  /(?<![A-Za-z])sk_live_[A-Za-z0-9]{20,}/g,
];

let findings = 0;
for (const file of filesToScan) {
  const text = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      findings += matches.length;
      console.error(`${file}: potential secret pattern matched ${matches.length} time(s).`);
    }
  }
}

if (findings > 0) {
  console.error("Secret scan failed. Remove sensitive values before committing.");
  process.exit(1);
}

console.log("Secret scan passed.");
