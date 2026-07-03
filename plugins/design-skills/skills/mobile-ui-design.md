---
name: mobile-ui-design
description: Design mobile-first app screens and responsive mobile web interfaces. Use when building iOS/Android-style screens, mobile navigation, touch interactions, small-screen forms, bottom bars, responsive layouts, or adapting desktop UI to phones.
---

# Mobile UI Design

Use this skill when small-screen ergonomics and touch behavior matter.

## Mobile First Workflow

1. Identify the core mobile job:
   - What can the user do in 30 seconds?
   - What needs thumb reach?
   - What can be deferred to a secondary screen or sheet?

2. Choose navigation intentionally:
   - Bottom tabs for 3-5 peer destinations.
   - Stack navigation for drill-down flows.
   - Sheets for short tasks that should preserve context.
   - Avoid hiding primary actions behind overflow menus.

3. Design for touch:
   - Use comfortable tap targets.
   - Keep destructive actions separated from common actions.
   - Provide clear pressed, loading, disabled, and success states.
   - Avoid hover-only interactions.

4. Compress without losing meaning:
   - Prioritize the first two lines of content.
   - Replace low-value metadata with icons or secondary screens.
   - Use progressive disclosure for filters and advanced actions.
   - Keep forms single-column and label fields clearly.

5. Verify responsive behavior:
   - Check narrow phones and larger phones.
   - Test long labels, long names, and translated text.
   - Confirm fixed headers, bottom bars, and keyboards do not hide content.

## Common Patterns

- Use sticky bottom action bars for primary form or checkout actions.
- Use segmented controls for compact mode switches.
- Use cards for repeated mobile list items, but keep them simple and scannable.
- Use skeletons that preserve layout height.
- Keep modals rare; prefer sheets or full-screen flows for complex tasks.

## Avoid

- Desktop tables squeezed into phone widths.
- Tiny icon-only actions without labels or accessible names.
- Floating action buttons that cover important content.
- Complex multi-column forms.
- Hidden focus states on mobile web.
