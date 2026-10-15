import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

if (!css.trim()) {
  console.error("CSS validation failed: styles.css is empty.");
  process.exit(1);
}

const openBraces = (css.match(/\{/g) || []).length;
const closeBraces = (css.match(/\}/g) || []).length;
if (openBraces !== closeBraces) {
  console.error("CSS validation failed: unbalanced braces detected.");
  process.exit(1);
}

if (!css.includes("@media")) {
  console.error("CSS validation failed: expected responsive @media query is missing.");
  process.exit(1);
}

console.log("CSS validation passed.");
