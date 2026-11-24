import path from "node:path";
import { readFile } from "node:fs/promises";
import { loadSkills } from "./lib.mjs";

export async function loadDirectorySkills() {
  const skills = await loadSkills();
  for (const skill of skills) {
    skill.whenToUse = {};
    for (const locale of ["es", "en"]) {
      const document = await readFile(path.join(skill.directory, "locales", locale, "SKILL.md"), "utf8");
      const heading = locale === "es" ? "Cuándo utilizarla" : "When to Use";
      const section = document.split(`## ${heading}`)[1]?.split(/\n## /)[0]?.trim();
      if (!section) throw new Error(`${skill.metadata.id}: missing ${heading}`);
      skill.whenToUse[locale] = section;
    }
  }
  return skills;
}

export const platforms = [
  { id: "ideavo", name: "Ideavo", tags: ["ideavo", "opencode"] },
  { id: "atlas-openship", name: "Atlas / OpenShip", tags: ["atlas", "openship"] },
  { id: "dokploy", name: "Dokploy", tags: ["dokploy"] },
  { id: "azure", name: "Azure", tags: ["azure", "azure-container-apps"] }
];

export function platformIds(metadata) {
  return platforms.filter((platform) => platform.tags.some((tag) => metadata.tags.includes(tag))).map(({ id }) => id);
}

export function cell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

export function sourcePath(metadata, locale) {
  return path.posix.join("../../skills", metadata.category, metadata.id, "locales", locale, "SKILL.md");
}

export function buildCatalog(skills, taxonomy, locale) {
  return {
    schemaVersion: 1,
    locale,
    generatedAt: `${skills.map(({ metadata }) => metadata.lastReviewed).sort().at(-1)}T00:00:00.000Z`,
    categories: [...taxonomy.values()].map((category) => ({
      id: category.id,
      title: category.titles[locale],
      description: category.description[locale],
      skills: skills.filter(({ metadata }) => metadata.category === category.id).map(({ metadata, whenToUse }) => ({
        id: metadata.id,
        name: metadata.name[locale],
        summary: metadata.summary[locale],
        whenToUse: whenToUse[locale],
        version: metadata.version,
        status: metadata.status,
        riskLevel: metadata.riskLevel,
        tags: metadata.tags,
        source: sourcePath(metadata, locale),
        inputs: metadata.inputs[locale],
        outputs: metadata.outputs[locale],
        dependencies: metadata.dependencies,
        lastReviewed: metadata.lastReviewed,
        platforms: platformIds(metadata),
        ...(metadata.replacedBy ? { replacedBy: metadata.replacedBy } : {})
      }))
    }))
  };
}

export function renderCatalog(catalog) {
  const es = catalog.locale === "es";
  const all = catalog.categories.flatMap(({ skills }) => skills);
  const intro = es
    ? "Directorio generado desde los metadatos de cada skill. Las rutas y los IDs se conservan.\n\nEl estado es el declarado por sus autores. Una fecha de revisión o el estado stable no acreditan una prueba operativa: consulta las evidencias y condiciones de la skill antes de usarla. Este catálogo no concede permisos para ejecutar cambios.\n\nLas vistas por plataforma usan etiquetas explícitas; no certifican compatibilidad. Las skills sin esas etiquetas siguen disponibles por tipo. Las particularidades de cada proyecto deben conservarse en sus instrucciones, sin copiar secretos al catálogo."
    : "Directory generated from each skill's metadata. Paths and IDs are preserved.\n\nStatus is author-declared. A review date or stable status is not evidence of an operational test: check the skill's evidence and conditions before use. This catalog does not grant permission to execute changes.\n\nPlatform views use explicit tags; they do not certify compatibility. Skills without these tags remain available by type. Keep project-specific limits in project instructions, without copying secrets into the catalog.";
  const platformSections = platforms.map((platform) => {
    const matches = all.filter((skill) => skill.platforms.includes(platform.id));
    const links = matches.map((skill) => `- [${skill.name}](#${skill.id})`).join("\n");
    const empty = platform.id === "azure"
      ? (es ? "Sin skill catalogada. El procedimiento Azure Container Apps con escalado automático está pendiente de desplegarse y probarse; no se presenta como una integración Atlas/OpenShip." : "No cataloged skill. The Azure Container Apps autoscaling procedure is pending deployment and testing; it is not presented as an Atlas/OpenShip integration.")
      : (es ? "Sin skills con esta etiqueta." : "No skills with this tag.");
    return `### ${platform.name}\n\n${links || empty}`;
  }).join("\n\n");
  const sections = catalog.categories.map((category) => {
    const rows = category.skills.map((skill) => `| [${cell(skill.name)}](#${skill.id}) | ${cell(skill.summary)} | ${skill.status} | ${skill.riskLevel} |`).join("\n");
    const cards = category.skills.map((skill) => {
      const names = skill.platforms.map((id) => platforms.find((p) => p.id === id).name);
      const list = (values) => values.map((value) => `- ${value}`).join("\n");
      const dependencies = skill.dependencies.length ? skill.dependencies.map((id) => `\`${id}\``).join(", ") : (es ? "Ninguna declarada" : "None declared");
      return `<a id="${skill.id}"></a>\n\n### ${skill.name}\n\n${skill.summary}\n\n- ID: \`${skill.id}\` · ${es ? "Versión" : "Version"}: ${skill.version}\n- ${es ? "Estado declarado" : "Declared status"}: ${skill.status} · ${es ? "Riesgo" : "Risk"}: ${skill.riskLevel}\n- ${es ? "Última revisión declarada" : "Declared last review"}: ${skill.lastReviewed}\n- ${es ? "Plataformas etiquetadas" : "Tagged platforms"}: ${names.join(", ") || (es ? "Sin etiqueta específica" : "No specific tag")}\n- ${es ? "Dependencias" : "Dependencies"}: ${dependencies}${skill.replacedBy ? `\n- ${es ? "Sustituida por" : "Replaced by"}: \`${skill.replacedBy}\`` : ""}\n\n**${es ? "Cuándo utilizarla" : "When to use"}**\n\n${skill.whenToUse}\n\n**${es ? "Requisitos" : "Requirements"}**\n\n${list(skill.inputs)}\n\n**${es ? "Resultado esperado" : "Expected result"}**\n\n${list(skill.outputs)}\n\n[${es ? "Abrir procedimiento: cuándo usarlo, pasos, validación y seguridad" : "Open procedure: when to use, steps, validation and safety"}](${skill.source})`;
    }).join("\n\n");
    return `<a id="type-${category.id}"></a>\n\n## ${category.title}\n\n${category.description}\n\n| Skill | ${es ? "Descripción" : "Description"} | ${es ? "Estado declarado" : "Declared status"} | ${es ? "Riesgo" : "Risk"} |\n| --- | --- | --- | --- |\n${rows}\n\n${cards}`;
  }).join("\n\n");
  const navigation = catalog.categories.map((c) => `- [${c.title}](#type-${c.id}) (${c.skills.length})`).join("\n");
  return `# ${es ? "Catálogo de skills" : "Skills Catalog"}\n\n${intro}\n\n## ${es ? "Por tipo de trabajo" : "By work type"}\n\n${navigation}\n\n## ${es ? "Por plataforma" : "By platform"}\n\n${platformSections}\n\n${sections}\n`;
}
