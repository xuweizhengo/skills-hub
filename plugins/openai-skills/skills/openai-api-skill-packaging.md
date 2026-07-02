---
name: openai-api-skill-packaging
description: Package agent skills for OpenAI API workflows, including OpenAI-compatible skill archives, metadata review, and runtime setup notes.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
version: 1.0.0
author: xuweizhengo
license: MIT
tags:
  - openai
  - api
  - agents
  - skills
compatibility: Useful for OpenAI API agent workflows and Codex-compatible skill repositories
source: https://platform.openai.com/docs/guides/tools-skill
---
# OpenAI API Skill Packaging

## Overview

Prepare skills for OpenAI API agent workflows. Use this when a user wants to package a reusable capability, bundle references/scripts, or document how a skill should be uploaded or invoked from an OpenAI API-backed agent.

## Instructions

1. Identify the reusable capability and decide whether it belongs in a skill, tool, MCP server, prompt, or normal code.
2. Keep the top-level instructions concise and place long assets in supporting files.
3. Package references, templates, and validation scripts together so the skill can run without relying on hidden local context.
4. Add a metadata table covering name, description, inputs, outputs, dependencies, and supported runtime.
5. Document setup steps for API keys, environment variables, model selection, and any external tools.
6. Add a smoke test that exercises the skill on a small fixture.
7. Include a version history when the packaged skill is meant to be reused across projects.

## Packaging Notes

- Keep private data and credentials outside the skill archive.
- Prefer small examples over large copied docs.
- Link official OpenAI documentation instead of duplicating it.
- Pin external commands or describe version assumptions.

## Resources

- OpenAI Skill tool guide: https://platform.openai.com/docs/guides/tools-skill
- OpenAI Agents: https://platform.openai.com/docs/guides/agents
