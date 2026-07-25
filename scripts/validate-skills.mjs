import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { findSkillDirectories, loadTaxonomy, readYaml, fail } from "./lib.mjs";

const schema = JSON.parse(await readFile(path.join("schema", "skill.schema.json"), "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);
const taxonomy = await loadTaxonomy();
const directories = await findSkillDirectories();
const errors = [];
const ids = new Set();
const metadataById = new Map();

if (directories.length === 0) errors.push("No skills were found.");

for (const directory of directories) {
  const file = path.join(directory, "skill.yaml");
  let metadata;
  try {
    metadata = await readYaml(file);
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
    continue;
  }
  if (!validate(metadata)) {
    for (const issue of validate.errors) errors.push(`${file}${issue.instancePath}: ${issue.message}`);
  }
  const parts = directory.split(path.sep);
  const pathCategory = parts.at(-2);
  const pathId = parts.at(-1);
  if (metadata.category !== pathCategory) errors.push(`${file}: category must match directory ${pathCategory}.`);
  if (metadata.id !== pathId) errors.push(`${file}: id must match directory ${pathId}.`);
  if (!taxonomy.has(metadata.category)) errors.push(`${file}: unknown category ${metadata.category}.`);
  if (ids.has(metadata.id)) errors.push(`${file}: duplicate id ${metadata.id}.`);
  ids.add(metadata.id);
  metadataById.set(metadata.id, metadata);
}

for (const [id, metadata] of metadataById) {
  for (const dependency of metadata.dependencies ?? []) {
    if (dependency === id) errors.push(`${id}: a skill cannot depend on itself.`);
    if (!metadataById.has(dependency)) errors.push(`${id}: dependency ${dependency} does not exist.`);
  }
  if (metadata.replacedBy && !metadataById.has(metadata.replacedBy)) errors.push(`${id}: replacement ${metadata.replacedBy} does not exist.`);
  if (metadata.replacedBy === id) errors.push(`${id}: a skill cannot replace itself.`);
  if (metadata.status === "deprecated" && !metadata.replacedBy) errors.push(`${id}: deprecated skills must declare replacedBy.`);
}

if (errors.length) {
  fail(errors);
} else {
  console.log(`Validated ${directories.length} skill metadata files.`);
}
