# Source and license

- Upstream: https://github.com/coreyhaines31/marketingskills/tree/0cd9b3a0ef4c411a1d690419ce843f2a1da32cce/skills/analytics
- Upstream repository: `coreyhaines31/marketingskills`
- Upstream branch HEAD at sync: `0cd9b3a0ef4c411a1d690419ce843f2a1da32cce`
- License: MIT License (Copyright (c) 2025 Corey Haines; see `LICENSE`)
- Upstream `SKILL.md` blob at sync: `6ce2434e0da93a599fb83dec539844869d376f93`
- Upstream `references/event-library.md` blob at sync: `376f182dfc7f9be6daee5bd570af90656c3025e4`
- Upstream `references/ga4-implementation.md` blob at sync: `22df98805b49bc3db77c49723a0a63620448a0de`
- Upstream `references/gtm-implementation.md` blob at sync: `6012d1cf787087f81684b2ba948c35c3dbfb8ab1`
- Upstream `evals/evals.json` blob at sync: `bf944d83ddcb2b33ee10ea6e09e06ea6a96c26d2`
- Upstream `LICENSE` blob at sync (repository root): `7c48dd638a9ebed49a8ef0c0c4eea90105381cdf`
- Synced: 2026-10-28

This bundle preserves the upstream analytics Skill, all three reference documents, its evaluation cases and the upstream MIT license, with no changes to upstream file contents. The upstream repository is authoritative. The Skill credits a partner-UTM pattern adapted from Wispr Flow's MIT-licensed link-creator skill; that attribution is retained unchanged.

Compatibility: directory-based `SKILL.md` works with Codex, Claude Code, Cursor and other Agent Skills loaders. GA4, GTM, Mixpanel and the linked upstream tools registry are optional external integrations; no credentials, executable scripts or MCP servers are bundled. The upstream Skill mentions sibling skills such as conversion-tracking, attribution and ab-testing; those are optional external cross-references, not bundled dependencies. The `product-marketing.md` context file is optional and read only if present. The copy under `plugins/developer-skills/skills/analytics/` is byte-for-byte identical to the local Skill directory.

2026-10-28 upstream update: version 2.2.1 → 2.2.2. GA4 signup example now maps the internal `signup_completed` event to GA4's recommended `sign_up` event; `references/ga4-implementation.md` is updated accordingly. Other bundled references, evals, and license remain unchanged. No local behavioral adaptation was necessary.
