import { access, readFile } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";

const markdownFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "SUPPORT.md",
  "docs/WORKFLOWS.md",
  "docs/BRANCHING.md",
  "docs/SECURITY.md",
  "docs/TROUBLESHOOTING.md",
];

const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
const missing = [];

for (const file of markdownFiles) {
  const content = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  const links = Array.from(content.matchAll(linkRegex), (match) => match[1]);

  for (const link of links) {
    if (
      link.startsWith("http://") ||
      link.startsWith("https://") ||
      link.startsWith("mailto:") ||
      link.startsWith("#")
    ) {
      continue;
    }

    const normalized = link.split("#")[0];
    const targetPath = new URL(`../${normalized}`, import.meta.url);

    try {
      await access(targetPath, fsConstants.F_OK);
    } catch {
      missing.push(`${file} -> ${link}`);
    }
  }
}

if (missing.length > 0) {
  console.error("Broken local documentation links detected:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Link checks passed.");
