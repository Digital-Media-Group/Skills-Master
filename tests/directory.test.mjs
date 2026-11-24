import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { loadTaxonomy } from "../scripts/lib.mjs";
import { buildCatalog, renderCatalog, platformIds, loadDirectorySkills } from "../scripts/directory.mjs";

test("directory preserves metadata and gives every skill a unique card", async () => {
  const skills = await loadDirectorySkills();
  const taxonomy = await loadTaxonomy();
  for (const locale of ["es", "en"]) {
    const catalog = buildCatalog(skills, taxonomy, locale);
    const markdown = renderCatalog(catalog);
    const entries = catalog.categories.flatMap(({ skills }) => skills);
    assert.equal(entries.length, skills.length);
    for (const { metadata } of skills) {
      const entry = entries.find(({ id }) => id === metadata.id);
      assert.deepEqual(entry.inputs, metadata.inputs[locale]);
      assert.deepEqual(entry.outputs, metadata.outputs[locale]);
      assert.equal(entry.status, metadata.status);
      assert.equal(entry.lastReviewed, metadata.lastReviewed);
      assert.equal(markdown.split(`<a id="${metadata.id}"></a>`).length - 1, 1);
      await access(path.resolve("catalog", locale, entry.source));
    }
    assert.equal(renderCatalog(buildCatalog(skills, taxonomy, locale)), markdown);
  }
});

test("platform views require exact tags, not names or inferred compatibility", () => {
  assert.deepEqual(platformIds({ tags: ["openship", "atlas"] }), ["atlas-openship"]);
  assert.deepEqual(platformIds({ tags: ["docker-compose"] }), []);
  assert.deepEqual(platformIds({ tags: ["azure-container-apps"] }), ["azure"]);
  assert.deepEqual(platformIds({ tags: ["not-azure", "dokploy-like"] }), []);
});

test("Azure view is explicitly pending, not a fabricated deployment skill", async () => {
  const skills = (await loadDirectorySkills()).filter(({ metadata }) => !platformIds(metadata).includes("azure"));
  const taxonomy = await loadTaxonomy();
  const es = renderCatalog(buildCatalog(skills, taxonomy, "es"));
  assert.match(es, /pendiente de desplegarse y probarse/);
  assert.match(es, /no concede permisos/);
  const en = renderCatalog(buildCatalog(skills, taxonomy, "en"));
  assert.match(en, /pending deployment and testing/);
  assert.match(en, /does not grant permission/);
});

test("AI discovery resolves complete bilingual sources and dependency IDs without catalog-only execution", async () => {
  const skills = await loadDirectorySkills();
  const taxonomy = await loadTaxonomy();
  const ids = new Set(skills.map(({ metadata }) => metadata.id));
  assert.equal(ids.size, skills.length);
  for (const locale of ["es", "en"]) {
    const catalog = buildCatalog(skills, taxonomy, locale);
    for (const entry of catalog.categories.flatMap(({ skills }) => skills)) {
      assert.ok(entry.whenToUse.trim());
      assert.ok(entry.inputs.length && entry.inputs.every((v) => v.trim()));
      assert.ok(entry.outputs.length && entry.outputs.every((v) => v.trim()));
      assert.ok(entry.dependencies.every((id) => ids.has(id)));
      const resolved = path.resolve("catalog", locale, entry.source);
      assert.ok(resolved.startsWith(path.resolve("skills") + path.sep));
      const document = await readFile(resolved, "utf8");
      assert.ok(document.includes(locale === "es" ? "## Cuándo utilizarla" : "## When to Use"));
      assert.ok(document.includes(entry.whenToUse));
      assert.ok(!document.includes("\uFFFD"));
    }
  }
});
