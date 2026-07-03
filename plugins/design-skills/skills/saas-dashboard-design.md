---
name: saas-dashboard-design
description: Design dense, professional SaaS dashboards and operational tools. Use when building admin panels, analytics dashboards, CRM views, monitoring pages, internal tools, tables, filters, metrics, status cards, or workflows for repeated business use.
---

# SaaS Dashboard Design

Use this skill for work-focused interfaces where users scan, compare, filter, decide, and repeat actions.

## Design Principles

- Favor clarity over decoration.
- Keep information dense but organized.
- Make tables, filters, search, sorting, and status visible and predictable.
- Use calm color, strong alignment, and compact typography.
- Treat empty, loading, and error states as part of the product.

## Layout Pattern

1. Top-level navigation:
   - Persistent product area, current section, and account or workspace controls.
   - Avoid oversized marketing-style heroes inside operational tools.

2. Page header:
   - Title, short context, primary action, and key filters.
   - Put destructive or rare actions behind menus or secondary controls.

3. Summary row:
   - Use metrics only when they help triage.
   - Include comparison, trend, or status context when possible.

4. Main workspace:
   - Tables for lists and comparison.
   - Split panes for master-detail workflows.
   - Tabs for peer views, not unrelated destinations.
   - Side panels for editing without losing list context.

5. Feedback and states:
   - Inline validation for forms.
   - Skeletons or stable placeholders for loading.
   - Clear recovery path for failed loads.

## Table Checklist

- Columns match the user's decision order.
- Important identifiers do not truncate before they are useful.
- Filters can be cleared individually and all at once.
- Row actions are discoverable but not noisy.
- Status labels are semantic and color is not the only signal.
- Pagination, density, selection, and bulk actions are predictable.

## Visual Tone

Operational SaaS should feel trustworthy and efficient: quiet backgrounds, restrained borders, readable type, stable spacing, and purposeful accents. Do not fill the page with decorative cards, oversized gradients, or editorial hero sections unless the product genuinely needs that tone.
