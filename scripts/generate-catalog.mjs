import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadTaxonomy } from "./lib.mjs";
import { buildCatalog, renderCatalog, loadDirectorySkills } from "./directory.mjs";

const skills = await loadDirectorySkills();
const taxonomy = await loadTaxonomy();
await rm("catalog", { recursive: true, force: true });
for (const locale of ["es", "en"]) {
  const output = path.join("catalog", locale);
  await mkdir(output, { recursive: true });
  const catalog = buildCatalog(skills, taxonomy, locale);
  await writeFile(path.join(output, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  await writeFile(path.join(output, "README.md"), renderCatalog(catalog), "utf8");
}
console.log(`Generated localized directories for ${skills.length} skills.`);
