---
name: design-brief-generator
description: Generate or update a practical DESIGN.md or UI design brief for an app, website, product, or brand. Use when the user wants durable design direction, visual principles, tokens, component guidance, UX rules, or a style guide that future coding agents can follow.
---

# Design Brief Generator

Use this skill to create a compact design guide that future UI work can follow consistently.

## Inputs To Gather Or Infer

- Product type and audience.
- Primary workflows.
- Brand or emotional tone.
- Existing screenshots, components, or design references.
- Accessibility, density, platform, and framework constraints.

If the user has not provided enough context, infer a conservative direction from the product and state assumptions briefly.

## DESIGN.md Structure

Use this structure unless the repo already has a different convention:

```markdown
# Design Direction

## Product Context
Who uses this, what they need, and what the interface should make easier.

## Visual Positioning
The concrete aesthetic direction and what to avoid.

## Layout Principles
Grid, density, spacing, hierarchy, and responsive rules.

## Typography
Font choices or system stack, type scale, headings, body, labels, numerals.

## Color And Theming
Palette, semantic colors, contrast expectations, dark mode notes.

## Components
Buttons, inputs, cards, tables, navigation, dialogs, toasts, tabs, menus.

## Interaction Rules
Hover, focus, loading, empty, error, selected, disabled, keyboard behavior.

## Content Rules
Tone, label length, empty-state copy, numbers, dates, and status language.

## QA Checklist
What to verify before shipping.
```

## Writing Rules

- Be specific enough to guide implementation.
- Avoid vague taste words without examples.
- Prefer constraints that can be checked in code or screenshots.
- Include "do not" rules for common failure modes.
- Keep it short enough that an agent will actually read it.

## Update Rules

When updating an existing design brief:

- Preserve project-specific rules.
- Remove stale rules that conflict with the current app.
- Add examples from real screens when available.
- Keep the brief aligned with the actual codebase, not an imagined redesign.
