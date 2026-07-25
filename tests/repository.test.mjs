import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadSkills, loadTaxonomy } from "../scripts/lib.mjs";

test("repository includes the initial localized categories", async () => {
  const categories = await loadTaxonomy();
  assert.ok(categories.size >= 5);
  for (const category of categories.values()) {
    assert.ok(category.titles.es);
    assert.ok(category.titles.en);
  }
});

test("catalog includes at least the initial bilingual skills", async () => {
  const skills = await loadSkills();
  assert.ok(skills.length >= 15);
  for (const { directory, metadata } of skills) {
    const es = await readFile(path.join(directory, "locales", "es", "SKILL.md"), "utf8");
    const en = await readFile(path.join(directory, "locales", "en", "SKILL.md"), "utf8");
    assert.match(es, new RegExp(`^# ${metadata.name.es.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m"));
    assert.match(en, new RegExp(`^# ${metadata.name.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m"));
  }
});

test("every primary category contains skills", async () => {
  const skills = await loadSkills();
  const counts = new Map();
  for (const { metadata } of skills) counts.set(metadata.category, (counts.get(metadata.category) ?? 0) + 1);
  for (const count of counts.values()) assert.ok(count >= 1);
});
