import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { fail } from "./lib.mjs";

const schema = JSON.parse(await readFile(path.join("schema", "catalog.schema.json"), "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);
const errors = [];

for (const locale of ["es", "en"]) {
  const file = path.join("catalog", locale, "catalog.json");
  const catalog = JSON.parse(await readFile(file, "utf8"));
  if (!validate(catalog)) {
    for (const issue of validate.errors) errors.push(`${file}${issue.instancePath}: ${issue.message}`);
  }
  if (catalog.locale !== locale) errors.push(`${file}: locale must be ${locale}.`);
}

if (errors.length) fail(errors);
else console.log("Validated Spanish and English catalog artifacts.");
