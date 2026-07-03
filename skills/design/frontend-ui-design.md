---
name: frontend-ui-design
description: Create distinctive, production-grade frontend interfaces. Use when building or redesigning web pages, React/Vue/Svelte components, landing pages, dashboards, app screens, or styling existing frontend UI with strong visual direction, typography, layout, color, motion, and responsive behavior.
---

# Frontend UI Design

Use this skill to turn a frontend request into a polished, intentional interface instead of a generic template.

## Workflow

1. Establish the product context before writing UI code:
   - Who uses it, what they are trying to do, and how much attention they can spend.
   - Whether the surface is operational, editorial, playful, commercial, portfolio, or data-heavy.
   - One clear visual direction, such as "quiet analytical console", "high-trust fintech tool", or "editorial founder profile".

2. Read the existing app before designing:
   - Identify framework, routing, components, icons, styles, tokens, and layout conventions.
   - Reuse the existing design system unless the task is explicitly a redesign.
   - Keep edits scoped to the requested surface.

3. Design the hierarchy:
   - Put the primary task, object, or decision first.
   - Make secondary metadata scan quickly.
   - Use whitespace to create grouping, not decoration.
   - Avoid hero-sized text inside compact tools, cards, sidebars, and dashboards.

4. Choose concrete visual primitives:
   - Define a type scale, spacing rhythm, radius, borders, shadows, and accent color.
   - Use icon buttons for recognizable actions and text buttons for commands.
   - Use cards only for repeated items, modals, or genuinely framed tools.
   - Avoid generic gradient blobs, one-note palettes, nested cards, and decorative UI that does not support comprehension.

5. Build complete states:
   - Desktop, tablet, and mobile layout.
   - Loading, empty, error, disabled, selected, hover, focus, and long-content states.
   - Text overflow, long labels, narrow screens, and keyboard navigation.

6. Verify visually:
   - Run the app when possible.
   - Check at least one desktop and one mobile viewport.
   - Confirm nothing overlaps, wraps awkwardly, hides focus, or shifts layout unexpectedly.

## Surface Guidance

- **SaaS and admin tools**: prioritize density, alignment, tables, filters, status, and repeatable workflows. Keep the visual language restrained.
- **Landing pages**: use a specific product/person/place signal in the first viewport. Avoid generic split hero layouts when the subject needs proof or inspection.
- **Content sites**: lead with trust, source clarity, navigation, and editorial hierarchy.
- **Creative or game UIs**: allow stronger motion, illustration, and atmosphere, but keep controls legible and stable.

## Completion Checklist

- The page has one clear visual idea.
- The first screen answers what this is and what the user can do next.
- Controls use familiar patterns and icons.
- Typography, spacing, and color are consistent.
- The UI works with real or realistically long content.
- Mobile is not an afterthought.
- The result does not look like an unstyled component library demo.
