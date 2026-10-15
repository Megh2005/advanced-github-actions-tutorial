import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

const requiredSnippets = [
  "<!doctype html>",
  "<html lang=\"en\">",
  "id=\"generate-btn\"",
  "id=\"toggle-btn\"",
  "id=\"copy-btn\"",
  "id=\"download-btn\"",
  "id=\"random-output\"",
  "aria-live=\"polite\"",
  "<script type=\"module\" src=\"script.js\"></script>",
];

const missing = requiredSnippets.filter((snippet) => !html.includes(snippet));

if (missing.length > 0) {
  console.error("HTML validation failed. Missing required snippet(s):");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("HTML validation passed.");
