import { access, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const skillsDir = join(rootDir, "skills");
const pluginsDir = join(rootDir, "plugins");
const marketplacePath = join(rootDir, ".agents", "plugins", "marketplace.json");
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

await validateMarketplace();

if (failed) process.exit(1);

async function validateMarketplace() {
  try {
    await access(marketplacePath);
  } catch {
    console.log("Marketplace: not generated yet");
    return;
  }

  const marketplace = JSON.parse(await readFile(marketplacePath, "utf8"));
  const plugins = marketplace.plugins || [];
  const seen = new Set();

  for (const plugin of plugins) {
    if (!plugin.name || seen.has(plugin.name)) {
      console.error(`Invalid or duplicate marketplace plugin: ${plugin.name || "(missing name)"}`);
      failed = true;
      continue;
    }
    seen.add(plugin.name);

    if (!plugin.source?.path || !plugin.policy?.installation || !plugin.policy?.authentication || !plugin.category) {
      console.error(`Marketplace entry is missing required fields: ${plugin.name}`);
      failed = true;
    }

    const manifestPath = join(pluginsDir, plugin.name, ".codex-plugin", "plugin.json");
    try {
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      if (manifest.name !== plugin.name) {
        console.error(`Plugin manifest name mismatch: ${plugin.name} -> ${manifest.name}`);
        failed = true;
      }
      if (!manifest.description || !manifest.version || !manifest.interface?.displayName) {
        console.error(`Plugin manifest is missing display metadata: ${plugin.name}`);
        failed = true;
      }
    } catch {
      console.error(`Missing or invalid plugin manifest: ${plugin.name}`);
      failed = true;
    }
  }

  console.log(`Marketplace plugins: ${plugins.length}`);
}
