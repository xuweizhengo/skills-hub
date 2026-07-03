---
name: design-system-builder
description: Create, extend, or refactor design systems for frontend products. Use when defining design tokens, component libraries, theme systems, UI foundations, Storybook-style component specs, accessibility states, or consistent product styling across an app.
---

# Design System Builder

Use this skill when the task needs a reusable UI foundation rather than a one-off screen.

## First Pass

1. Inventory the current system:
   - Framework, styling approach, component library, icon set, and theme provider.
   - Existing tokens for color, typography, spacing, radius, shadows, z-index, and motion.
   - Repeated components and one-off styles that should become shared primitives.

2. Define token layers:
   - **Primitive tokens**: raw scales such as gray-900, spacing-4, radius-md.
   - **Semantic tokens**: surface, border, text-muted, danger-bg, focus-ring.
   - **Component tokens**: button-padding, card-border, table-row-height.

3. Define component contracts:
   - Props and variants.
   - Size, density, tone, and state combinations.
   - Accessibility requirements and keyboard behavior.
   - Composition rules, such as when to use cards, panels, dialogs, tabs, menus, and toolbars.

4. Implement gradually:
   - Start with tokens and primitives.
   - Migrate shared components before individual pages.
   - Preserve existing public APIs unless the user asked for a breaking redesign.

## Required Component States

Every reusable interactive component should account for:

- Default
- Hover
- Focus-visible
- Active / pressed
- Selected
- Disabled
- Loading
- Error
- Long label or overflow content
- Light and dark theme when supported

## Documentation Shape

When adding docs or examples, keep them practical:

- When to use the component.
- When not to use it.
- Variant examples.
- Accessibility notes.
- One realistic product example.

Avoid creating a design system that is only a color palette. The useful part is the decision model: which components exist, when they are used, and how they behave under stress.
