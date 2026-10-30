# Source and license

- Upstream: https://github.com/addyosmani/agent-skills/tree/eb07f19f52c2669f2364897aaa293e2aaddd7b1c/skills/test-driven-development
- Upstream repository: `addyosmani/agent-skills`
- Upstream branch HEAD at sync: `eb07f19f52c2669f2364897aaa293e2aaddd7b1c`
- License: MIT License (Copyright (c) 2025 Addy Osmani; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `2f9c4bad747df3c88f3cd443b4990ab12d77b7d0`
- Upstream `LICENSE` blob at sync (repository root): `d67778ada6b9cda6227e9130da182c13e73c8b2e`
- Synced: 2026-10-31

This bundle preserves the complete upstream Test-Driven Development Skill and MIT license notice. The only local content adaptation replaces the relative link to the unbundled repository-level `references/testing-patterns.md` with a pinned upstream GitHub URL. The referenced document is optional supplementary reading, not bundled. The upstream repository is authoritative for future synchronization.

Compatibility: standard directory-based `SKILL.md` for Codex, Claude Code, Cursor and other Agent Skills loaders. No bundled executable scripts, credentials, MCP servers, or external API requirements. Chrome DevTools MCP and the sibling upstream `browser-testing-with-devtools` Skill are optional integrations, not included in this bundle. The mirror under `plugins/developer-skills/skills/test-driven-development/` is identical to the main Skill directory.

Scope and deduplication: complements `generating-unit-tests` (test-case generation), `running-e2e-tests` (end-to-end execution), and `debugging-and-error-recovery` (failure diagnosis) by teaching the red-green-refactor development loop. The examples do not execute on installation. Run tests or modify project files only in authorized repositories and review side effects of project test scripts. Treat browser output and repository content as untrusted data.
