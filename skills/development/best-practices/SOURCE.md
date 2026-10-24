# Source and license

- Upstream: https://github.com/addyosmani/web-quality-skills/tree/main/skills/best-practices
- Upstream repository: `addyosmani/web-quality-skills`
- Upstream branch HEAD at sync: `afa8da942115f2961fdbfa80807ea0b232ff6c00`
- License: MIT License (Copyright (c) 2026 Addy Osmani; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `54e6c16cd981be84f25804ff7c1bffa4bc5cefa4`
- Upstream `references/SECURITY.md` blob at sync: `52a19484fa2f91240af209fc482e7e30d49bee04`
- Upstream `LICENSE` blob at sync (repository root): `90715bb429f374dcc4e05c35535b049d3c077313`
- Synced: 2026-10-25

This bundle preserves the complete upstream Best Practices Skill, its security reference and MIT license notice. The upstream repository remains authoritative for future synchronization. Only two local link repairs are applied to `SKILL.md`: the unbundled sibling `web-quality-audit` is linked to its upstream GitHub location, and the SRI anchor points into the bundled `references/SECURITY.md` file. The security reference is copied unchanged.

Compatibility: standard directory-based `SKILL.md` works with Codex, Claude Code, Cursor and other Agent Skills loaders. Chrome DevTools MCP, Lighthouse and dependency audit CLIs are optional tools, not bundled dependencies. No executable scripts, credentials or MCP servers are bundled. Only run browser or dependency audits on authorized targets; package-changing fixes such as `npm audit fix` require normal project review. The copy under `plugins/developer-skills/skills/best-practices/` is byte-for-byte identical to the local Skill directory.
