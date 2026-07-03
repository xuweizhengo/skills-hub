import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const skillsDir = join(rootDir, "skills");
const pluginsDir = join(rootDir, "plugins");
const marketplaceDir = join(rootDir, ".agents", "plugins");

const pluginDefinitions = [
  {
    name: "openai-skills",
    displayName: "OpenAI Skills",
    category: "OpenAI",
    description: "Codex and OpenAI API compatible skill workflows for authoring, packaging, distribution, and evaluation.",
    defaultPrompt: [
      "Author and package a Codex-compatible skill.",
      "Prepare a skill for plugin distribution.",
      "Design a lightweight eval for a reusable skill."
    ],
    capabilities: ["skills", "documentation", "evaluation"],
    skillCategories: ["openai"]
  },
  {
    name: "developer-skills",
    displayName: "Developer Skills",
    category: "Development",
    description: "General software delivery skills for API design, REST implementation, cleanup, specs, tests, DevOps, and Supabase.",
    defaultPrompt: [
      "Draft an API contract and implementation plan.",
      "Generate focused tests for this codebase.",
      "Review this service for cleanup opportunities."
    ],
    capabilities: ["skills", "development", "testing"],
    skillCategories: ["development", "devops", "testing", "supabase"]
  },
  {
    name: "writing-skills",
    displayName: "Writing Skills",
    category: "Writing",
    description: "Writing and content workflow skills for API docs, SEO posts, editorial planning, and prose cleanup.",
    defaultPrompt: [
      "Turn these notes into polished documentation.",
      "Plan an SEO article from this topic.",
      "Make this draft sound more natural."
    ],
    capabilities: ["skills", "writing", "documentation"],
    skillCategories: ["writing", "productivity"]
  },
  {
    name: "security-skills",
    displayName: "Security Skills",
    category: "Security",
    description: "Security auditing, recon, web testing, reporting, and assessment skills for authorized security work.",
    defaultPrompt: [
      "Review this app for common web security risks.",
      "Summarize these findings for an executive report.",
      "Check this dependency list for vulnerable packages."
    ],
    capabilities: ["skills", "security", "reporting"],
    skillCategories: ["security"]
  },
  {
    name: "design-skills",
    displayName: "Design Skills",
    category: "Design",
    description: "Frontend UI design, review, design system, dashboard, mobile, and design brief workflow skills.",
    defaultPrompt: [
      "Design a polished frontend interface for this app.",
      "Review this UI for polish and usability issues.",
      "Create a DESIGN.md for this product."
    ],
    capabilities: ["skills", "design", "frontend"],
    skillCategories: ["design"]
  },
  {
    name: "chinese-creator-skills",
    displayName: "Chinese Creator Skills",
    category: "Chinese",
    description: "Chinese writing, web novel, browser automation, and presentation workflow skills.",
    defaultPrompt: [
      "帮我梳理这部小说的主线和爽点。",
      "生成一份中文演示文稿大纲。",
      "用浏览器自动化检查这个页面。"
    ],
    capabilities: ["skills", "writing", "presentations"],
    skillCategories: ["chinese"]
  }
];

const allSkillRows = await readSkillRows();

await mkdir(pluginsDir, { recursive: true });
await mkdir(marketplaceDir, { recursive: true });

for (const plugin of pluginDefinitions) {
  await writePlugin(plugin, allSkillRows.filter((skill) => plugin.skillCategories.includes(skill.category)));
}

await writeMarketplace();
console.log(`Generated ${pluginDefinitions.length} plugins and marketplace index.`);

async function readSkillRows() {
  const categories = (await readdir(skillsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const rows = [];
  for (const category of categories) {
    const files = (await readdir(join(skillsDir, category), { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name)
      .sort();

    for (const file of files) {
      const filePath = join(skillsDir, category, file);
      const content = await readFile(filePath, "utf8");
      rows.push({
        category,
        file,
        name: frontmatterValue(content, "name") || file.replace(/\.md$/, ""),
        description: frontmatterValue(content, "description") || "",
        absolutePath: filePath,
        relativePath: `../../skills/${category}/${file}`
      });
    }
  }
  return rows;
}

async function writePlugin(plugin, skills) {
  const pluginDir = join(pluginsDir, plugin.name);
  const metaDir = join(pluginDir, ".codex-plugin");
  const pluginSkillsDir = join(pluginDir, "skills");
  await mkdir(metaDir, { recursive: true });
  await rm(pluginSkillsDir, { recursive: true, force: true });
  await mkdir(pluginSkillsDir, { recursive: true });

  const manifest = {
    name: plugin.name,
    version: "1.0.0",
    description: plugin.description,
    author: {
      name: "xuweizhengo"
    },
    license: "MIT",
    homepage: "https://github.com/xuweizhengo/skills-hub",
    repository: "https://github.com/xuweizhengo/skills-hub",
    skills: "./skills/",
    interface: {
      displayName: plugin.displayName,
      shortDescription: plugin.description,
      longDescription: plugin.description,
      developerName: "xuweizhengo",
      category: plugin.category,
      defaultPrompt: plugin.defaultPrompt,
      capabilities: plugin.capabilities
    }
  };

  for (const skill of skills) {
    await copyFile(skill.absolutePath, join(pluginSkillsDir, skill.file));
  }

  await writeJson(join(metaDir, "plugin.json"), manifest);
  await writeFile(join(pluginDir, "README.md"), pluginReadme(plugin, skills), "utf8");
}

async function writeMarketplace() {
  const marketplace = {
    name: "skills-hub",
    interface: {
      displayName: "Skills Hub"
    },
    plugins: pluginDefinitions.map((plugin) => ({
      name: plugin.name,
      source: {
        source: "local",
        path: `./plugins/${plugin.name}`
      },
      policy: {
        installation: "AVAILABLE",
        authentication: "ON_INSTALL"
      },
      category: plugin.category
    }))
  };

  await writeJson(join(marketplaceDir, "marketplace.json"), marketplace);
}

function pluginReadme(plugin, skills) {
  const rows = skills
    .map((skill) => `| [${skill.name}](./skills/${skill.file}) | ${skill.category} | ${tableCell(skill.description)} |`)
    .join("\n");

  return `# ${plugin.displayName}

${plugin.description}

## Included Skills

| Skill | Category | Description |
|---|---|---|
${rows}

## Install

This plugin is listed in the repo marketplace at:

\`\`\`text
.agents/plugins/marketplace.json
\`\`\`

Add this marketplace to Codex from the repository root, then install \`${plugin.name}\` from the Codex app.
`;
}

function frontmatterValue(content, key) {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) return "";

  const lines = frontmatter[1].split(/\r?\n/);
  const keyPrefix = `${key}:`;
  const startIndex = lines.findIndex((line) => line.startsWith(keyPrefix));
  if (startIndex === -1) return "";

  const firstValue = lines[startIndex].slice(keyPrefix.length).trim();
  const isBlockScalar = firstValue === "|" || firstValue === ">" || firstValue.startsWith("|") || firstValue.startsWith(">");
  const values = isBlockScalar ? [] : [firstValue];

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^[A-Za-z0-9_-]+:\s*/.test(line)) break;
    if (!line.startsWith(" ") && line.trim()) break;
    values.push(line.trim());
  }

  return values
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/''/g, "'");
}

function singleLine(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function tableCell(value) {
  const text = singleLine(value)
    .replace(/\\\s*/g, " ")
    .replace(/\|/g, "\\|");
  if (text.length <= 220) return text;
  return `${text.slice(0, 217).trimEnd()}...`;
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
