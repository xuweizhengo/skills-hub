# Source and license

- Upstream: https://github.com/addyosmani/agent-skills/tree/eb07f19f52c2669f2364897aaa293e2aaddd7b1c/skills/debugging-and-error-recovery
- Upstream repository: `addyosmani/agent-skills`
- Upstream branch HEAD at sync: `eb07f19f52c2669f2364897aaa293e2aaddd7b1c`
- License: MIT License (Copyright (c) 2025 Addy Osmani; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `13c1a431626c23270542c7b570d7193ba79c3a96`
- Upstream `LICENSE` blob at sync (repository root): `d67778ada6b9cda6227e9130da182c13e73c8b2e`
- Synced: 2026-10-30

This bundle preserves the complete upstream Debugging and Error Recovery Skill and its MIT license notice, without modifying upstream `SKILL.md`. The upstream repository remains authoritative for future synchronization.

Compatibility: standard directory-based `SKILL.md` works with Codex, Claude Code, Cursor and other Agent Skills loaders. The copy under `plugins/developer-skills/skills/debugging-and-error-recovery/` is byte-for-byte identical to the main Skill directory. The Skill references the sibling upstream `test-driven-development` Skill as optional guidance; that Skill is not bundled. No executable scripts, credentials, MCP server, or external API integrations are bundled.

Safety: examples involving `git bisect`, test commands, package installation, dev servers and logging are instructions for authorized project work, not commands run during installation or synchronization. Review command side effects and never run tests from untrusted commits without appropriate isolation. Do not disclose sensitive logs or environment variables. This Skill complements `cleanup-code` (refactoring) and `generating-unit-tests` (test generation) by focusing on systematic failure diagnosis and recovery.
