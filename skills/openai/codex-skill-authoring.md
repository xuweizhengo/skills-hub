---
name: codex-skill-authoring
description: Create or refine OpenAI Codex-compatible Agent Skills with a clean SKILL.md, focused triggers, references, and verification steps.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
version: 1.0.0
author: xuweizhengo
license: MIT
tags:
  - openai
  - codex
  - skills
  - authoring
compatibility: Designed for OpenAI Codex Agent Skills; also useful for Claude Code style skill repositories
source: https://developers.openai.com/codex/skills/
---
# Codex Skill Authoring

## Overview

Design high-signal Agent Skills for OpenAI Codex. Use this when turning a repeatable workflow into a reusable skill, cleaning up an existing skill, or adapting a skill collection for Codex.

## When To Use

- The user asks to create a Codex skill.
- A workflow has repeated steps, references, scripts, or domain rules.
- A repository needs skills that are easy to discover and safe to run.
- Existing skill descriptions are too broad, vague, or trigger too often.

## Instructions

1. Define the skill boundary in one sentence: what it does, what it does not do, and who should use it.
2. Write a compact frontmatter block with `name`, `description`, `allowed-tools`, `version`, `author`, `license`, `tags`, and `compatibility`.
3. Make the description trigger-specific. Include the domain, action, and expected artifact, but avoid generic phrases that match every coding task.
4. Keep `SKILL.md` self-contained for the common path. Put long examples, schemas, or checklists in `references/` and link them.
5. Add a workflow with explicit verification steps. Prefer project-native tests, linters, schema checks, or render checks.
6. Include safety boundaries for credentials, destructive commands, network access, user data, and generated output.
7. Avoid embedding secrets, private endpoints, or long copied documentation.

## Recommended Layout

```text
my-skill/
  SKILL.md
  references/
    checklist.md
    examples.md
  scripts/
    validate.mjs
```

## Quality Checklist

- The skill name is stable, lowercase, and specific.
- The description says exactly when the skill should activate.
- The workflow is shorter than the task itself.
- References are optional until needed.
- Verification is concrete and runnable.
- The skill does not require private local paths.

## Resources

- OpenAI Codex Skills: https://developers.openai.com/codex/skills/
- OpenAI Codex: https://developers.openai.com/codex/
