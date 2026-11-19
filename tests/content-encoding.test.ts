import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

test("portfolio copy contains no replacement characters or corrupted apostrophes", () => {
  function check(directory: string) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) { check(path); continue; }
      if (!/\.(tsx|ts)$/.test(entry.name)) continue;
      const text = readFileSync(path, "utf8").replace(/\b(?:https?:\/\/|mailto:)[^\s"'`]+/g, "");
      assert.doesNotMatch(text, /\uFFFD|\b(?:I\?m|I\?ve|I\?d|Let\?s|Bachelor\?s|r\?sum\?)\b|[a-z]\?[a-z]/i, path);
    }
  }
  check("app");
});
