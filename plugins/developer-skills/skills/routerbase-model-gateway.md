---
name: routerbase-model-gateway
description: 'Configure RouterBase as an OpenAI-compatible model gateway for AI coding
  agents, SDK clients, and multimodal workflows. Use when migrating OpenAI-style
  requests, centralizing provider credentials, testing model fallback behavior, or
  routing text, image, audio, and video generation through one API endpoint.

  Trigger with phrases like "use RouterBase", "configure RouterBase API", "route
  models through RouterBase", or "OpenAI-compatible gateway".

  '
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(curl:*), Bash(node:*), Bash(npm:*),
  Bash(python3:*)
version: 1.0.0
author: zenlee123
license: MIT
tags:
- routerbase
- llm
- openai-compatible
- model-routing
- api-gateway
compatibility: Designed for Claude Code, Codex, OpenClaw, and other SKILL.md-compatible coding agents
source: https://github.com/zenlee123/routerbase-agent-skills
---
# RouterBase Model Gateway

## Overview

RouterBase Model Gateway helps agents connect applications to [routerbase](https://routerbase.com/) as an OpenAI-compatible API layer. Use it to replace scattered provider-specific client configuration with one gateway base URL, one API key, and explicit model routing rules.

The skill focuses on safe integration work: discover the existing SDK surface, configure environment variables, migrate requests incrementally, verify responses, and avoid committing secrets.

## Prerequisites

- A RouterBase account and API key stored outside version control
- An application that uses an OpenAI-compatible client, REST calls, or server-side AI provider wrapper
- Access to the relevant runtime configuration files, environment templates, and integration tests
- A test prompt or fixture that does not contain private user data

## Instructions

1. Locate the current AI provider integration. Search for SDK initialization, base URL settings, model names, environment variables, and direct HTTP calls to AI providers.
2. Add RouterBase configuration through environment variables. Prefer names such as `ROUTERBASE_API_KEY`, `ROUTERBASE_BASE_URL`, and `ROUTERBASE_MODEL`. Never paste a real key into source files, examples, commits, logs, screenshots, or issue bodies.
3. Configure the client to use the RouterBase OpenAI-compatible endpoint. Keep the change small by preserving the existing request shape unless the app already needs a model or provider abstraction.
4. Route model names explicitly. Document the default model, fallback model, and any modality-specific models used for chat, embeddings, image, audio, or video generation.
5. Add a lightweight smoke test that sends a minimal non-sensitive request and checks for a successful structured response. For repositories that should not call live services in CI, add a mocked test and document the manual verification command.
6. Update developer documentation with required environment variables, local setup steps, and the exact files touched by the integration.
7. Before finishing, scan the diff for leaked secrets, account identifiers, request transcripts, customer data, and internal-only URLs.

## Output

- RouterBase environment variables documented in `.env.example`, README, or deployment docs
- Client configuration updated to use the RouterBase base URL and API key
- Model routing defaults documented for each supported modality
- A smoke test, mocked test, or manual verification command
- A short privacy check confirming that no real API keys or sensitive prompts were committed

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Missing or invalid `ROUTERBASE_API_KEY` | Confirm the key is set in the runtime environment and has not been copied into source control |
| 404 model not found | Model name is not available through the configured RouterBase account | List available models in the RouterBase dashboard and update `ROUTERBASE_MODEL` |
| Request still hits old provider | Base URL or provider wrapper was not updated everywhere | Search for hard-coded provider URLs and centralize client initialization |
| CI fails on live API call | Tests require network access or real credentials | Mock the SDK in CI and keep live verification as a local command |
| Secret appears in diff | Real key, token, or transcript was pasted into a file | Remove it, rotate the credential if needed, and rerun a secret scan before committing |

## Examples

**Environment template:**

```dotenv
ROUTERBASE_BASE_URL=https://routerbase.com/v1
ROUTERBASE_API_KEY=your_routerbase_api_key
ROUTERBASE_MODEL=your_default_model
```

**OpenAI-compatible Node.js client:**

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.ROUTERBASE_API_KEY,
  baseURL: process.env.ROUTERBASE_BASE_URL || "https://routerbase.com/v1"
});

const response = await client.chat.completions.create({
  model: process.env.ROUTERBASE_MODEL || "your_default_model",
  messages: [{ role: "user", content: "Return a one-line health check." }]
});
```

**Manual smoke test:**

```bash
curl "$ROUTERBASE_BASE_URL/chat/completions" \
  -H "Authorization: Bearer $ROUTERBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$ROUTERBASE_MODEL"'",
    "messages": [{"role": "user", "content": "Return OK."}]
  }'
```

## Resources

- [RouterBase](https://routerbase.com/) - OpenAI-compatible model gateway
- [RouterBase agent skills](https://github.com/zenlee123/routerbase-agent-skills) - Source skill collection
