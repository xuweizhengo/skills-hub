---
name: agent-legibility-review
description: Framework-agnostic repository review from the perspective of a future AI coding agent. Use when Codex needs to evaluate whether a repo is easy for agents to find, understand, modify, and safely evolve with minimal ambiguity; find discoverability problems, missing or duplicated authoritative locations, hidden conventions, cross-file invariants, ambiguous ownership, scattered change surfaces, unpredictable impact, and agent risk hotspots. This skill evaluates the agent interaction surface; use architecture-review to decide or redesign architectural ownership and boundaries. Do not use as an ordinary code-style, framework-specific, bug, performance, security, clean-code, maintainability, or generic architecture review unless the user explicitly asks for agent-legibility.
---

# Agent Legibility Review

Evaluate one question: can a future AI coding agent find, understand, modify, and safely evolve this repository with minimal ambiguity and minimal risk?

Do not modify code during the review unless the user explicitly asks for implementation. If the user asks for both review and fixes, complete the review first, then make only the requested or clearly justified changes.

## Core Principle

A repository is agent-legible when:

- relevant code can be found quickly
- business rules are explicit
- responsibilities are obvious
- changes are localized
- impact scope is predictable
- ambiguity is minimized
- Every finding is a hypothesis. Before reporting it, actively attempt to disprove it. A finding should only survive if the available repository evidence does not invalidate it.

## Agent Legibility Criteria

Evaluate the repository as an interaction surface for a future coding agent:

1. **Discoverability:** Can an agent identify the likely edit point for a realistic task without an unnecessarily broad search?
2. **Authority visibility:** Can an agent distinguish the authoritative owner from callers, adapters, generated surfaces, compatibility layers, and duplicated representations?
3. **Context locality:** Can an agent load the rules, contracts, collaborators, and tests needed for one change without absorbing unrelated behavior?
4. **Impact predictability:** Can an agent discover direct consumers, side effects, generated outputs, and validation surfaces before editing?
5. **Intent signaling:** Do names, structure, tests, and nearby guidance expose concepts, lifecycle stages, policies, and safe modification boundaries?
6. **Hidden knowledge:** Are invariants and conventions visible where an agent will look, rather than existing only in call order, tribal knowledge, distant comments, or unrelated files?

## Review Process

1. Map the repository: top-level structure, entrypoints, modules, tests, generated/vendored areas, build/config files, README, AGENTS, CONTRIBUTING, specs, ADRs and runbooks.
2. Build an agent navigation map: identify likely edit points, duplicated entrypoints, competing abstractions, misleading names and deep call chains.
3. Identify concepts and authority: recurring domain nouns, identifiers, statuses, lifecycle states, permissions, validation rules, schemas, provider mappings and defaults.
4. Find hidden rules and cross-file invariants: magic values, undocumented transitions, implicit call order, filename contracts, identifier formats, string-pattern routing and producer/consumer invariants.
5. Review responsibility clarity: determine whether modules, classes, functions, configs and tests make ownership obvious.
6. Evaluate change locality and impact predictability: inspect scattered edits, hidden consumers, side effects, event flows and integrations.
7. Identify agent risk hotspots: complex condition trees, dynamic dispatch, generated code, reflection, metaprogramming and weak test anchors.

## Scoring

Score each criterion from 1 to 5 using observable evidence. A 5 means clear edit paths, explicit rules, clear owners, localized changes and discoverable consumers. A 1 means agents are likely to edit the wrong place, miss invariants, or leave coupled locations inconsistent.

## Finding Rules

Every finding must include:

- location
- issue
- why it matters
- agent failure mode
- recommendation
- priority: P0, P1, P2, or P3

Priority scale:

- P0: plausible severe correctness, data integrity, deployability, or operational failure
- P1: high-risk ambiguity or hidden rule likely to cause regressions
- P2: meaningful navigation/ownership/locality issue likely to mislead common changes
- P3: low-risk clarification that removes a real future-agent trap

## Finding Disproof Pass

Generate candidate findings, then challenge each one before reporting it. Search docs, tests, names, comments, repository instructions, generated-code notices and common edit paths for counter-evidence. Reject or downgrade speculative findings. Preserve uncertainty instead of overstating risk.

## Output Format

1. Executive Summary
2. Agent Legibility Score table (Discoverability, Authority Visibility, Context Locality, Impact Predictability, Intent Signaling, Hidden Knowledge)
3. High-Risk Findings
4. Duplicate Concepts
5. Hidden Rules
6. Ambiguous Ownership
7. Agent Risk Hotspots
8. Recommended Improvements
9. Non-Issues / Intentionally Not Flagged, when useful

## Quality Bar

- Ground claims in inspected code, docs, tests, configs, generated artifacts, or runtime wiring.
- Each issue must have one primary output section.
- Findings must survive the disproof pass and include a concrete agent failure mode.
- Separate agent-legibility risk from style, taste, maintainability, framework practice and generic architecture preference.
- Do not use file length or folder count as a finding without a concrete navigation, authority, context-selection, locality or impact-prediction failure mode.
- Prefer small improvements that create authoritative locations, name hidden rules, reduce duplicate concepts, or improve navigation.

> Synced from `ruicore/codex-skills` (`skills/agent-legibility-review`) under Apache-2.0. This local copy is condensed for portable cross-agent use; see `SOURCE.md` for provenance.