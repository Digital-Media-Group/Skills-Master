import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadSkills, fail } from "./lib.mjs";

const required = {
  es: ["Propósito", "Cuándo utilizarla", "Cuándo no utilizarla", "Información necesaria", "Procedimiento", "Validación", "Resultado esperado", "Seguridad"],
  en: ["Purpose", "When to Use", "When Not to Use", "Required Information", "Procedure", "Validation", "Expected Result", "Safety"]
};
const foreignHeadings = {
  es: required.en,
  en: required.es
};
const errors = [];
const skills = await loadSkills();

for (const { directory, metadata } of skills) {
  for (const locale of ["es", "en"]) {
    const file = path.join(directory, "locales", locale, "SKILL.md");
    let content;
    try {
      content = await readFile(file, "utf8");
    } catch {
      errors.push(`${file}: missing localized document.`);
      continue;
    }
    const title = content.match(/^# (.+)$/m)?.[1];
    if (title !== metadata.name[locale]) errors.push(`${file}: title must equal metadata name '${metadata.name[locale]}'.`);
    for (const heading of required[locale]) {
      if (!content.includes(`## ${heading}`)) errors.push(`${file}: missing heading '${heading}'.`);
    }
    for (const heading of foreignHeadings[locale]) {
      if (content.includes(`## ${heading}`)) errors.push(`${file}: contains a heading from the wrong locale '${heading}'.`);
    }
  }
}

if (errors.length) {
  fail(errors);
} else {
  console.log(`Validated Spanish and English documents for ${skills.length} skills.`);
}
