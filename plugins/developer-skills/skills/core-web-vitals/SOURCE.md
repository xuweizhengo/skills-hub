# Source and license

- Upstream: https://github.com/addyosmani/web-quality-skills/tree/main/skills/core-web-vitals
- Upstream repository: `addyosmani/web-quality-skills`
- Upstream branch HEAD at sync: `afa8da942115f2961fdbfa80807ea0b232ff6c00`
- License: MIT License (Copyright (c) 2026 Addy Osmani; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `60343a52d1832f89eb0ebf6722f4d150fe806777`
- Upstream `references/LCP.md` blob at sync: `c6e88376b030281cf051d0e6b634a400b4574e47`
- Upstream `references/INP.md` blob at sync: `29a72e18a4d47b06270ddfffec1175c9b71a67b9`
- Upstream `references/CLS.md` blob at sync: `dff8ce27b20642ff01014dcef1228340dd6ec58d`
- Upstream `LICENSE` blob at sync (repository root): `90715bb429f374dcc4e05c35535b049d3c077313`
- Synced: 2026-10-15

This bundle preserves the upstream Core Web Vitals Skill, all three reference documents, and the MIT license notice. The upstream repository remains authoritative for future synchronization. The only changes to `SKILL.md` are three relative links pointing to the unbundled sibling `performance` Skill and its MEASUREMENT/RUM references; these are replaced with absolute upstream GitHub links. All other content is unchanged.

Compatibility: standard directory-based `SKILL.md` works with Codex, Claude Code, Cursor and other Agent Skills loaders. Chrome DevTools MCP, CrUX, Lighthouse and first-party RUM are optional measurement integrations; no executable scripts, credentials or MCP servers are bundled. Use only with authorized sites, browser sessions and telemetry. The mirror under `plugins/developer-skills/skills/core-web-vitals/` is byte-for-byte identical to the local Skill directory.
