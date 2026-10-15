import assert from "node:assert/strict";
import test from "node:test";

import { constants, generateRandomString } from "../script.js";

test("generateRandomString creates expected length output", () => {
  const value = generateRandomString(48);
  assert.equal(value.length, 48);
  assert.match(value, /^[A-Za-z0-9_-]+$/);
});

test("generateRandomString clamps to configured boundaries", () => {
  const tooSmall = generateRandomString(2);
  const tooLarge = generateRandomString(1000);

  assert.equal(tooSmall.length, constants.MIN_LENGTH);
  assert.equal(tooLarge.length, constants.MAX_LENGTH);
});

test("generateRandomString produces varied values", () => {
  const runs = Array.from({ length: 20 }, () => generateRandomString(32));
  const unique = new Set(runs);

  assert.ok(unique.size > 1, "Expected at least two unique generated strings.");
});
