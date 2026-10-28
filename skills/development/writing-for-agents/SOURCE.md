# Source and license

- Upstream: https://github.com/mattpocock/skills/tree/59db609eb1e18aaf59b63284d0e52255aff0c63c/skills/productivity/writing-for-agents
- Upstream repository: `mattpocock/skills`
- Upstream branch HEAD at sync: `59db609eb1e18aaf59b63284d0e52255aff0c63c`
- License: MIT License (Copyright (c) 2026 Matt Pocock; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `a37608daf6e835e767deecfb498facecaaba82ba`
- Upstream `SKILL-MECHANICS.md` blob at sync: `9cdbdb22aadc438755392216e75ad9a14cc9832e`
- Upstream `agents/openai.yaml` blob at sync: `079c933b75743dec18b5d0c01006def20b6aad26`
- Upstream `LICENSE` blob at sync (repository root): `f1dd2c09108dde1a5f56097cee8461b3ea834499`
- Synced: 2026-10-29

This bundle is an unmodified copy of the upstream Writing for Agents Skill, including its skill-mechanics reference and Codex metadata. The original MIT license notice is preserved. Upstream is the source of truth for future synchronization.

Compatibility: directory-based `SKILL.md` for Codex, Claude Code, Cursor and other Agent Skills loaders. The `agents/openai.yaml` file supplies optional Codex display metadata; the main Skill remains useful without it. No executable scripts, MCP servers, external APIs, credentials or network requirements are bundled. When invoked, the Skill may help create or edit project `AGENTS.md`, `CLAUDE.md` or other agent-readable documentation, subject to normal user permissions.

Scope and deduplication: complements the existing Codex-specific skill-authoring workflows by covering general agent-consumed documents, context pointers, information hierarchy and invocation mechanics. The mirror under `plugins/developer-skills/skills/writing-for-agents/` is byte-for-byte identical to the main directory.
