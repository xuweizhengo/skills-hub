---
name: agent-legibility-review
description: Review whether a repository is easy for future AI coding agents to find, understand, modify, and safely evolve; identify discoverability, authority, hidden-rule, ownership, locality, and impact-prediction risks.
---

# Agent Legibility Review

Review the repository from the perspective of a future coding agent. Focus on whether the correct edit point, source of truth, rules, owners, consumers, tests, and impact can be discovered without unsafe inference.

Evaluate six dimensions from 1–5: Discoverability, Authority Visibility, Context Locality, Impact Predictability, Intent Signaling, and Hidden Knowledge.

For each candidate finding, perform a counter-evidence pass against docs, tests, names, comments, repository instructions, generated-code notices, and common edit paths. Report only findings that survive this disproof pass.

Each finding must include location, issue, why it matters, likely agent failure mode, smallest practical recommendation, and P0–P3 priority.

Organize the result as: Executive Summary; Agent Legibility Score; High-Risk Findings; Duplicate Concepts; Hidden Rules; Ambiguous Ownership; Agent Risk Hotspots; Recommended Improvements; and, when useful, Non-Issues / Intentionally Not Flagged.

Do not turn this into a generic style, maintainability, security, performance, or architecture review. Only flag issues that materially affect future-agent navigation or modification safety.

Source: `ruicore/codex-skills`, Apache-2.0. The canonical bundled copy and provenance are under `skills/development/agent-legibility-review/`.
