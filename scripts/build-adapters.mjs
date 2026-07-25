import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadSkills, normalizeMarkdown } from "./lib.mjs";

const skills = await loadSkills();
await rm("dist", { recursive: true, force: true });

for (const locale of ["es", "en"]) {
  const codexEntries = [];
  for (const { directory, metadata } of skills) {
    const content = normalizeMarkdown(await readFile(path.join(directory, "locales", locale, "SKILL.md"), "utf8"));
    if (metadata.compatibility.includes("universal") || metadata.compatibility.includes("claude-code")) {
      const claudeDirectory = path.join("dist", "claude-code", locale, metadata.id);
      await mkdir(claudeDirectory, { recursive: true });
      const frontmatter = [
        "---",
        `name: ${metadata.id}`,
        `description: ${JSON.stringify(metadata.summary[locale])}`,
        `version: ${metadata.version}`,
        `category: ${metadata.category}`,
        `risk-level: ${metadata.riskLevel}`,
        "---",
        ""
      ].join("\n");
      await writeFile(path.join(claudeDirectory, "SKILL.md"), `${frontmatter}${content}`, "utf8");
    }
    if (metadata.compatibility.includes("universal") || metadata.compatibility.includes("openai-codex")) {
      codexEntries.push(`## ${metadata.name[locale]}\n\nTechnical ID: \`${metadata.id}\`  \nCategory: \`${metadata.category}\`  \nRisk: \`${metadata.riskLevel}\`\n\n${content}`);
    }
  }
  const codexDirectory = path.join("dist", "openai-codex", locale);
  await mkdir(codexDirectory, { recursive: true });
  const heading = locale === "es" ? "Directorio de skills para Codex" : "Codex Skills Directory";
  const instructions = locale === "es"
    ? "Selecciona la skill mas especifica para la tarea, lee su fuente completa y respeta sus precondiciones, validaciones y reglas de seguridad. No traduzcas IDs tecnicos."
    : "Select the most specific skill for the task, read its complete source, and follow its preconditions, validation, and safety rules. Do not translate technical IDs.";
  await writeFile(path.join(codexDirectory, "AGENTS.md"), `# ${heading}\n\n${instructions}\n\n${codexEntries.join("\n---\n\n")}\n`, "utf8");
}

console.log(`Built Claude Code and OpenAI Codex adapters for ${skills.length} skills.`);
