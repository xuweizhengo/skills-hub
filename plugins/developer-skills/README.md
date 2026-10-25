# Developer Skills

General software delivery skills for API design, REST implementation, cleanup, specs, tests, DevOps, and Supabase.

## Included Skills

| Skill | Category | Description |
|---|---|---|
| [analytics](./skills/analytics/SKILL.md) | development | Plan and audit GA4/GTM tracking, event naming, UTMs, conversion measurement and data quality. |
| [best-practices](./skills/best-practices/SKILL.md) | development | Apply modern web development best practices for security, compatibility, and code quality. Use when asked to "apply best practices", "security audit", "modernize code", "code quality review", or "check for vulnerabilities". |
| [performance](./skills/performance/SKILL.md) | development | Optimize web performance with measured loading, resource delivery, caching and runtime responsiveness improvements. |
| [agent-legibility-review](./skills/agent-legibility-review.md) | development | Framework-agnostic repository review from the perspective of a future AI coding agent. Use when Codex needs to evaluate whether a repo is easy for agents to find, understand, modify, and safely evolve with minimal amb... |
| [agent-patterns](./skills/agent-patterns.md) | development | Execute this skill should be used when the user asks about "SPAWN REQUEST format", "agent reports", "agent coordination", "parallel agents", "report format", "agent communication", or needs to understand how agents co... |
| [api-contract](./skills/api-contract.md) | development | Configure this skill should be used when the user asks about "API contract", "api-contract.md", "shared interface", "TypeScript interfaces", "request response schemas", "endpoint design", or needs guidance on designin... |
| [cleanup-code](./skills/cleanup-code.md) | development | Comprehensive codebase cleanup across 11 quality dimensions: dead code, duplication, weak types, circular deps, defensive cruft, legacy code, AI slop, type consolidation, security, performance, and async patterns. Ana... |
| [context-engineering](./skills/context-engineering.md) | development | Optimize coding-agent context setup and budget across Codex, Claude Code, Cursor, Copilot, and other agents. Use when starting sessions, switching tasks, output quality degrades, or project rules/context need to be st... |
| [core-web-vitals](./skills/core-web-vitals/SKILL.md) | development | Optimize Core Web Vitals (LCP, INP, CLS) for better page experience using field and lab evidence. Use when asked to "improve Core Web Vitals", "fix LCP", "reduce CLS", "optimize INP", "page experience optimization", or "fix layout shifts". |
| [domain-modeling](./skills/domain-modeling/SKILL.md) | development | Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a GLOSSARY.md, or recording or editing an ADR. |
| [generating-rest-apis](./skills/generating-rest-apis.md) | development | Generate complete REST API implementations from OpenAPI specifications or database schemas. Use when generating RESTful API implementations. Trigger with phrases like "generate REST API", "create RESTful API", or "bui... |
| [seo](./skills/seo/SKILL.md) | development | Optimize for search engine visibility and ranking. Use when asked to "improve SEO", "optimize for search", "fix meta tags", "add structured data", "sitemap optimization", or "search engine optimization". |
| [spec-writing](./skills/spec-writing.md) | development | Execute this skill should be used when the user asks about "writing specs", "specs.md format", "how to write specifications", "sprint requirements", "testing configuration", "scope definition", or needs guidance on cr... |
| [sprint-workflow](./skills/sprint-workflow.md) | development | Execute this skill should be used when the user asks about "how sprints work", "sprint phases", "iteration workflow", "convergent development", "sprint lifecycle", "when to use sprints", or wants to understand the spr... |
| [building-cicd-pipelines](./skills/building-cicd-pipelines.md) | devops | Execute use when you need to work with deployment and CI/CD. This skill provides deployment automation and pipeline orchestration with comprehensive guidance and automation. Trigger with phrases like "deploy applicati... |
| [building-terraform-modules](./skills/building-terraform-modules.md) | devops | Execute this skill empowers AI assistant to build reusable terraform modules based on user specifications. it leverages the terraform-module-builder plugin to generate production-ready, well-documented terraform modul... |
| [generating-docker-compose-files](./skills/generating-docker-compose-files.md) | devops | Execute use when you need to work with Docker Compose. This skill provides Docker Compose file generation with comprehensive guidance and automation. Trigger with phrases like "generate docker-compose", "create compos... |
| [supabase-postgres-best-practices](./skills/supabase-postgres-best-practices.md) | supabase |  |
| [supabase](./skills/supabase.md) | supabase |  |
| [generating-unit-tests](./skills/generating-unit-tests.md) | testing | Test automatically generate comprehensive unit tests from source code covering happy paths, edge cases, and error conditions. Use when creating test coverage for functions, classes, or modules. Trigger with phrases li... |
| [running-e2e-tests](./skills/running-e2e-tests.md) | testing | Execute end-to-end tests covering full user workflows across frontend and backend. Use when performing specialized testing. Trigger with phrases like "run end-to-end tests", "test user flows", or "execute E2E suite". |

## Install

This plugin is listed in the repo marketplace at:

```text
.agents/plugins/marketplace.json
```

Add this marketplace to Codex from the repository root, then install `developer-skills` from the Codex app.
