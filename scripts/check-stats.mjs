import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const skillsDir = join(rootDir, "skills");
const readmePath = join(rootDir, "README.md");

const categories = (await readdir(skillsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

let total = 0;
const rows = [];

for (const category of categories) {
  const files = (await readdir(join(skillsDir, category), { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"));
  total += files.length;
  rows.push({ category, count: files.length });
}

const activeCategoryCount = rows.filter((row) => row.count > 0).length;
const readme = await readFile(readmePath, "utf8");
const totalMatches = [...readme.matchAll(/Total%20Skills-(\d+)|技能总数-(\d+)/g)].map((match) => Number(match[1] || match[2]));
const categoryMatches = [...readme.matchAll(/Categories-(\d+)|分类-(\d+)/g)].map((match) => Number(match[1] || match[2]));

const expectedTotals = new Set(totalMatches);
const expectedCategories = new Set(categoryMatches);
let failed = false;

if (expectedTotals.size && !expectedTotals.has(total)) {
  console.error(`README total skill count is stale. Actual: ${total}, README: ${[...expectedTotals].join(", ")}`);
  failed = true;
}

if (expectedCategories.size && !expectedCategories.has(activeCategoryCount)) {
  console.error(`README category count is stale. Actual non-empty categories: ${activeCategoryCount}, README: ${[...expectedCategories].join(", ")}`);
  failed = true;
}

console.table(rows);
console.log(`Total skills: ${total}`);
console.log(`Non-empty categories: ${activeCategoryCount}`);

if (failed) process.exit(1);
