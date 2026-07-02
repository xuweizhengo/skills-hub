---
name: codex-skill-distribution
description: Package, document, and distribute OpenAI Codex-compatible skills so users can install them into their Codex skills directory or a shared repository.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
version: 1.0.0
author: xuweizhengo
license: MIT
tags:
  - openai
  - codex
  - skills
  - distribution
compatibility: Designed for OpenAI Codex Agent Skills
source: https://developers.openai.com/codex/skills/
---
# Codex Skill Distribution

## Overview

Prepare a skill or skill collection for public or team distribution. Use this when a repository needs installation instructions, compatibility notes, metadata hygiene, or release checks for Codex-compatible skills.

## Instructions

1. Confirm every skill has a `SKILL.md` or a single-file markdown format that the target agent supports.
2. Ensure each skill has a unique `name`, concise `description`, license metadata, and clear compatibility notes.
3. Add an installation section for common Codex locations:

```text
$CODEX_HOME/skills/
```

4. Document whether the skill is standalone or depends on references, scripts, MCP servers, external CLIs, or environment variables.
5. Add a repository index table with skill name, category, use case, and compatibility.
6. Run a lightweight validation script that checks markdown frontmatter, duplicate names, missing files, and stale counts.
7. Keep copied third-party skills clearly attributed and license-compatible.

## Release Checklist

- No secrets or private file paths are present.
- External links are official or clearly attributed.
- Generated files are reproducible.
- README counts match the actual skill tree.
- Compatibility claims distinguish Codex, Claude Code, Cursor, Copilot, and other agents.

## Resources

- OpenAI Codex Skills: https://developers.openai.com/codex/skills/
- Codex docs: https://developers.openai.com/codex/
