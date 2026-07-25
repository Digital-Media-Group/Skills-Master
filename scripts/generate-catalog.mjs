import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadSkills, loadTaxonomy } from "./lib.mjs";

const skills = await loadSkills();
const taxonomy = await loadTaxonomy();
const generatedAt = `${skills.map(({ metadata }) => metadata.lastReviewed).sort().at(-1)}T00:00:00.000Z`;
await rm("catalog", { recursive: true, force: true });

for (const locale of ["es", "en"]) {
  const output = path.join("catalog", locale);
  await mkdir(output, { recursive: true });
  const categoryGroups = [...taxonomy.values()].map((category) => ({
    id: category.id,
    title: category.titles[locale],
    description: category.description[locale],
    skills: skills
      .filter(({ metadata }) => metadata.category === category.id)
      .map(({ metadata }) => ({
        id: metadata.id,
        name: metadata.name[locale],
        summary: metadata.summary[locale],
        version: metadata.version,
        status: metadata.status,
        riskLevel: metadata.riskLevel,
        tags: metadata.tags,
        source: `../../skills/${metadata.category}/${metadata.id}/locales/${locale}/SKILL.md`
      }))
  }));
  const catalog = { schemaVersion: 1, locale, generatedAt, categories: categoryGroups };
  await writeFile(path.join(output, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  const title = locale === "es" ? "Catálogo de skills" : "Skills Catalog";
  const intro = locale === "es"
    ? "Los títulos se muestran en español; los IDs técnicos permanecen sin traducir."
    : "Titles are shown in English; technical IDs remain untranslated.";
  const sections = categoryGroups.map((category) => {
    const escapeCell = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
    const rows = category.skills.map((skill) => `| [${escapeCell(skill.name)}](${skill.source}) | \`${skill.id}\` | ${escapeCell(skill.summary)} | ${skill.status} | ${skill.riskLevel} |`).join("\n");
    const headers = locale === "es"
      ? "| Skill | ID | Resumen | Estado | Riesgo |\n| --- | --- | --- | --- | --- |"
      : "| Skill | ID | Summary | Status | Risk |\n| --- | --- | --- | --- | --- |";
    return `## ${category.title}\n\n${category.description}\n\n${headers}\n${rows || (locale === "es" ? "| Sin skills | - | - | - | - |" : "| No skills | - | - | - | - |")}`;
  }).join("\n\n");
  await writeFile(path.join(output, "README.md"), `# ${title}\n\n${intro}\n\n${sections}\n`, "utf8");
}

console.log(`Generated localized catalogs for ${skills.length} skills.`);
