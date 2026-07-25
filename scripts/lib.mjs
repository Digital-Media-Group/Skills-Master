import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

export const locales = ["es", "en"];

export async function readYaml(filePath) {
  return YAML.parse(await readFile(filePath, "utf8"));
}

export async function loadTaxonomy() {
  const data = await readYaml(path.join("taxonomy", "categories.yaml"));
  return new Map(data.categories.map((category) => [category.id, category]));
}

export async function findSkillDirectories(root = "skills") {
  const result = [];
  let categories = [];
  try {
    categories = await readdir(root, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return result;
    throw error;
  }
  for (const category of categories.filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const categoryPath = path.join(root, category.name);
    const entries = await readdir(categoryPath, { withFileTypes: true });
    for (const entry of entries.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
      result.push(path.join(categoryPath, entry.name));
    }
  }
  return result;
}

export async function loadSkills() {
  const directories = await findSkillDirectories();
  return Promise.all(directories.map(async (directory) => ({
    directory,
    metadata: await readYaml(path.join(directory, "skill.yaml"))
  })));
}

export function normalizeMarkdown(markdown) {
  return markdown.replace(/\r\n/g, "\n").trimEnd() + "\n";
}

export function fail(messages) {
  for (const message of messages) console.error(`- ${message}`);
  process.exitCode = 1;
}
