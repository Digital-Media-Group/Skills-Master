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
  const es = locale === "es";
  const clean = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
  const intro = es
    ? "## Directorio por tipos de trabajo\n\nAbre el [catálogo con fichas, requisitos, resultados y vistas por plataforma](catalog/es/README.md). El estado declarado y la fecha de revisión no sustituyen evidencia de pruebas ni conceden permiso para ejecutar cambios."
    : "## Directory by work type\n\nOpen the [catalog with skill cards, requirements, results and platform views](catalog/en/README.md). Declared status and review dates do not replace test evidence or grant permission to execute changes.";
  const sections = [...taxonomy.values()].map((category) => {
    const selected = skills.filter(({ metadata }) => metadata.category === category.id);
    const rows = selected.map(({ metadata }) => `| [${clean(metadata.name[locale])}](${skillUrl(metadata)}) | ${clean(metadata.summary[locale])} | \`${metadata.id}\` |`).join("\n");
    return `### ${category.titles[locale]} (${selected.length})\n\n${category.description[locale]}\n\n| Skill | ${es ? "Para qué sirve" : "Purpose"} | ID |\n| --- | --- | --- |\n${rows}`;
  });
  return [intro, ...sections].join("\n\n");
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
