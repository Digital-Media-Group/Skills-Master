import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { loadSkills, loadTaxonomy } from "./lib.mjs";

const execFileAsync = promisify(execFile);

const REPOSITORY = "https://github.com/Digital-Media-Group/Skills-Master";

function skillUrl(metadata) {
  return `${REPOSITORY}/tree/main/skills/${metadata.category}/${metadata.id}`;
}

function buildIndex(locale, skills, taxonomy) {
  const headers = locale === "es"
    ? ["## Índice de skills", "", "Copia el nombre técnico o la URL completa para indicarle a un agente qué skill instalar: `instala la skill <id> desde <url>`.", "", "| Skill | ID técnico | Categoría | URL |", "| --- | --- | --- | --- |"]
    : ["## Skills Index", "", "Copy the technical ID or the full URL to tell an agent which skill to install: `install skill <id> from <url>`.", "", "| Skill | Technical ID | Category | URL |", "| --- | --- | --- | --- |"];
  const rows = [];
  for (const [categoryId, category] of [...taxonomy.entries()].sort((a, b) => a[1].titles.en.localeCompare(b[1].titles.en))) {
    const categorySkills = skills
      .filter(({ metadata }) => metadata.category === categoryId)
      .sort((a, b) => a.metadata.id.localeCompare(b.metadata.id));
    for (const { metadata } of categorySkills) {
      const name = String(metadata.name[locale]).replaceAll("|", "\\|").replaceAll("\n", " ");
      const categoryTitle = String(category.titles[locale]).replaceAll("|", "\\|");
      rows.push(`| ${name} | \`${metadata.id}\` | ${categoryTitle} | ${skillUrl(metadata)} |`);
    }
  }
  return [...headers, ...rows].join("\n");
}

async function updateReadme(file, index) {
  const content = await readFile(file, "utf8");
  const pattern = /(<!-- BEGIN GENERATED SKILLS INDEX -->)[\s\S]*?(<!-- END GENERATED SKILLS INDEX -->)/;
  if (!pattern.test(content)) throw new Error(`${file}: generated skills index markers are missing.`);
  await writeFile(file, content.replace(pattern, `$1\n\n${index}\n\n$2`), "utf8");
}

const skills = await loadSkills();
const taxonomy = await loadTaxonomy();
await updateReadme("README.md", buildIndex("es", skills, taxonomy));
await updateReadme("README.en.md", buildIndex("en", skills, taxonomy));
console.log(`Updated the generated skills index in both README files for ${skills.length} skills.`);
