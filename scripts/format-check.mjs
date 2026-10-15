import { readFile } from "node:fs/promises";
import { EOL } from "node:os";

const files = [
  "index.html",
  "styles.css",
  "script.js",
  "README.md",
  "tests/random.test.js",
  "package.json",
];

let failures = 0;
for (const file of files) {
  const content = await readFile(new URL(`../${file}`, import.meta.url), "utf8");

  if (content.includes("\t")) {
    console.error(`${file}: contains tab characters; use spaces.`);
    failures += 1;
  }

  if (!content.endsWith(EOL)) {
    console.error(`${file}: file should end with a newline.`);
    failures += 1;
  }
}

if (failures > 0) {
  process.exit(1);
}

console.log("Format checks passed.");
