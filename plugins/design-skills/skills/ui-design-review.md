---
name: ui-design-review
description: Review frontend UI for visual polish, UX quality, responsive behavior, accessibility, and implementation consistency. Use when the user asks to audit, improve, polish, critique, QA, or compare a web/app interface, screenshot, component, dashboard, or landing page.
---

# UI Design Review

Use this skill to evaluate an interface like a product designer reviewing a near-shippable build.

## Review Order

1. Understand the user journey:
   - What is the main task?
   - What information must be understood first?
   - What decision or action should be easiest?

2. Inspect the actual UI:
   - Prefer running the app and checking screenshots over reading code only.
   - Review desktop and mobile viewports.
   - Check real content, long names, empty states, and loading states when available.

3. Review visual quality:
   - Hierarchy, alignment, spacing, rhythm, and density.
   - Typography scale, line length, label clarity, and button fit.
   - Color contrast, semantic color use, and palette balance.
   - Component consistency across similar surfaces.

4. Review interaction quality:
   - Hover, focus, selected, disabled, loading, error, and empty states.
   - Keyboard access and visible focus.
   - Form validation and recovery.
   - Navigation clarity and back/escape paths.

5. Review implementation risks:
   - Overflow, layout shift, clipped content, hidden controls, and responsive breakpoints.
   - Hard-coded dimensions that fail with real content.
   - Inconsistent token usage or one-off styling that will be hard to maintain.

## Output Format

Lead with the highest-impact issues. Use this shape:

```text
Findings
- [Severity] Issue title - file or screen reference
  Why it matters and what to change.

Quick Wins
- Small fixes that improve polish without changing product behavior.

Residual Risk
- Anything not checked, such as missing mobile screenshots or unavailable data states.
```

If asked to implement, fix the concrete issues after the review and verify the result visually.

## Severity Guide

- **High**: blocks the main task, hides critical information, breaks on common screens, or creates accessibility failure.
- **Medium**: causes confusion, inconsistency, weak hierarchy, or avoidable friction.
- **Low**: polish, small spacing, copy, or consistency improvements.
