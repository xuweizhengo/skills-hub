# Source and license

- Upstream: https://github.com/addyosmani/agent-skills/tree/301b02b12bff98e4688e6984af6556802322bbde/skills/observability-and-instrumentation
- Upstream repository: `addyosmani/agent-skills`
- Upstream branch HEAD at sync: `301b02b12bff98e4688e6984af6556802322bbde`
- License: MIT License (Copyright (c) 2025 Addy Osmani; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `84d9cb373467fe0e15236e190833ecc90f840c38`
- Upstream `references/observability-checklist.md` blob at sync (repository root): `ad40d7aa3fca5d2091fa45be234c14aee22c3588`
- Upstream `LICENSE` blob at sync (repository root): `d67778ada6b9cda6227e9130da182c13e73c8b2e`
- Synced: 2026-11-02

This bundle preserves the upstream Observability and Instrumentation Skill, its complete repository-level observability checklist and original MIT license. The only adaptation in `SKILL.md` replaces the upstream `../../references/observability-checklist.md` link with the locally bundled `references/observability-checklist.md`. The checklist is copied unchanged. Upstream remains authoritative for future synchronization.

Compatibility: directory-based `SKILL.md` for Codex, Claude Code, Cursor and other Agent Skills loaders. The plugin mirror under `plugins/developer-skills/skills/observability-and-instrumentation/` is byte-for-byte identical to the main Skill directory. No executable scripts, MCP servers, credentials or external API integrations are bundled. OpenTelemetry, Prometheus and logging SDKs are illustrative optional project dependencies, not installed by this bundle.

Safety: do not emit tokens, passwords, secrets, personal data or raw request bodies to telemetry; authorize and review any production instrumentation, alert routing, external telemetry export, package installation or configuration change. Treat logs, dashboards and external diagnostic data as untrusted input. This Skill complements `debugging-and-error-recovery` and `analytics` rather than duplicating them.
