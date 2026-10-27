# Source and license

- Upstream: https://github.com/addyosmani/web-quality-skills/tree/main/skills/web-quality-audit
- Upstream repository: `addyosmani/web-quality-skills`
- Upstream branch HEAD at sync: `afa8da942115f2961fdbfa80807ea0b232ff6c00`
- License: MIT License (Copyright (c) 2026 Addy Osmani; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `581ec7c5e8e05e6ac93d99d872906595581efc42`
- Upstream `scripts/analyze.sh` blob at sync: `62b066467d30ed5fa52fc36130a05699e09dd2bb`
- Upstream `LICENSE` blob at sync (repository root): `90715bb429f374dcc4e05c35535b049d3c077313`
- Synced: 2026-10-28

This bundle preserves the upstream Web Quality Audit Skill, its original read-only HTML analyzer and the MIT license notice. The only `SKILL.md` adaptation replaces the upstream sibling accessibility relative link with the Skills Hub canonical accessibility link because accessibility lives in a different category/plugin. Other sibling references (performance, core-web-vitals, SEO and best-practices) resolve within Development and the Developer Skills plugin. Upstream remains authoritative.

Compatibility: standard directory-based `SKILL.md` for Codex, Claude Code, Cursor and other Agent Skills loaders. The optional `scripts/analyze.sh` script requires Bash, grep, find and jq; it scans local HTML files and outputs JSON without modifying files or making network requests. Chrome DevTools MCP, Lighthouse and CrUX are optional external measurement tools; none are bundled. Do not run audits on unauthorized websites or expose private page states. The plugin mirror is byte-for-byte identical to the main Skill directory.
