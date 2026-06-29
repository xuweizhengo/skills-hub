---
name: hermes-tweet
description: "Use when a Hermes Agent session needs X/Twitter search, monitoring, trend reads, content research, or user-approved account actions through the Hermes Tweet plugin."
version: 0.1.6
license: MIT
author: Xquik
tags:
- hermes-agent
- x
- twitter
- social-media
- automation
allowed-tools: Read
compatibility: Designed for Hermes Agent, also useful as skill guidance for Claude Code, Codex, Cursor, and OpenClaw users evaluating Hermes plugins
---
# Hermes Tweet

## Overview

Hermes Tweet is a native Hermes Agent plugin for X/Twitter automation. It adds structured tools for X search, account reads, tweet posting, replies, likes, retweets, follows, DMs, monitors, extraction jobs, giveaway draws, media, and trends.

Use this skill when an agent workflow needs social listening, launch monitoring, support triage, creator research, brand research, giveaway audits, community audits, or controlled publishing from Hermes Agent.

## Install

```bash
hermes plugins install Xquik-dev/hermes-tweet --enable
```

For Python package installs:

```bash
uv pip install --python ~/.hermes/hermes-agent/venv/bin/python hermes-tweet
hermes plugins enable hermes-tweet
```

## Configuration

- Set `XQUIK_API_KEY` in the Hermes runtime environment before using authenticated reads.
- Keep `HERMES_TWEET_ENABLE_ACTIONS=false` unless a workflow explicitly allows account-changing actions.
- Use `HERMES_ENABLE_PROJECT_PLUGINS=true` only for trusted project-local plugin checkouts.
- Never paste API keys, cookies, passwords, signing keys, or TOTP secrets into chat.

## Workflow

1. Start with `tweet_explore` to find the relevant Xquik endpoint.
2. Use `tweet_read` for public read-only routes after the endpoint is known.
3. Use `tweet_action` only for writes, private reads, monitors, webhooks, extraction jobs, giveaway draws, or media operations after the user approves the exact action.

## Safety Rules

- Do not guess endpoint paths. Use the catalog returned by `tweet_explore`.
- Do not create direct HTTP fallbacks around Hermes Tweet tools.
- Do not pass credentials in tool arguments.
- Summarize side effects before posting, deleting, following, sending DMs, changing profiles, creating monitors, triggering webhooks, starting extraction jobs, or running giveaway draws.
- If action tools are unavailable, explain that they are gated by `HERMES_TWEET_ENABLE_ACTIONS=true`.

## Links

- Repository: https://github.com/Xquik-dev/hermes-tweet
- Package: https://pypi.org/project/hermes-tweet/
- Hermes Agent: https://github.com/NousResearch/hermes-agent
