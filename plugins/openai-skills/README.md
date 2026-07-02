# OpenAI Skills

Codex and OpenAI API compatible skill workflows for authoring, packaging, distribution, and evaluation.

## Included Skills

| Skill | Category | Description |
|---|---|---|
| [codex-skill-authoring](./skills/codex-skill-authoring.md) | openai | Create or refine OpenAI Codex-compatible Agent Skills with a clean SKILL.md, focused triggers, references, and verification steps. |
| [codex-skill-distribution](./skills/codex-skill-distribution.md) | openai | Package, document, and distribute OpenAI Codex-compatible skills so users can install them into their Codex skills directory or a shared repository. |
| [openai-api-skill-packaging](./skills/openai-api-skill-packaging.md) | openai | Package agent skills for OpenAI API workflows, including OpenAI-compatible skill archives, metadata review, and runtime setup notes. |
| [openai-skill-evals](./skills/openai-skill-evals.md) | openai | Build lightweight evaluations for OpenAI/Codex skills to check trigger quality, task completion, safety boundaries, and regression risk. |

## Install

This plugin is listed in the repo marketplace at:

```text
.agents/plugins/marketplace.json
```

Add this marketplace to Codex from the repository root, then install `openai-skills` from the Codex app.
