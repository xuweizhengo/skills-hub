# Source and license

- Upstream: https://github.com/addyosmani/web-quality-skills/tree/main/skills/performance
- Upstream repository: `addyosmani/web-quality-skills`
- Upstream branch HEAD at sync: `afa8da942115f2961fdbfa80807ea0b232ff6c00`
- License: MIT License (Copyright (c) 2026 Addy Osmani; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `913a36c6ad869d530053f20fd05698804cb24e3e`
- Upstream `references/MEASUREMENT.md` blob at sync: `1b15702d186016b9f0cf8e77cdff2c2d836e2313`
- Upstream `references/RUM.md` blob at sync: `909f5d2c98ed506020b1860d69b1d2aa5674799c`
- Upstream `LICENSE` blob at sync (repository root): `90715bb429f374dcc4e05c35535b049d3c077313`
- Synced: 2026-10-26

This bundle preserves the complete upstream Performance Skill, both reference documents and the original MIT license notice without modifying upstream content. Upstream remains authoritative for future synchronization. Its relative link to the already-bundled `core-web-vitals` Skill works in both Skills Hub's main directory and Developer Skills plugin.

Compatibility: standard directory-based `SKILL.md` for Codex, Claude Code, Cursor and other Agent Skills loaders. Chrome DevTools MCP, Lighthouse, CrUX and first-party RUM are optional external tools, not bundled dependencies. No executable scripts, MCP server or credentials are bundled. Performance changes, cache/service-worker changes and RUM telemetry should only be made on authorized projects with the usual privacy and deployment review. The plugin mirror under `plugins/developer-skills/skills/performance/` is byte-for-byte identical to the main directory.
