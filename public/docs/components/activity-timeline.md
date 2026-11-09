---
title: Activity Timeline
slug: activity-timeline
category: Atom
status: beta
source: components/ui/activity-timeline.tsx
styleguide: /styleguide/activity-timeline
figma: TBD
apg: N/A
---

# Activity Timeline

A time-ordered list of events: an attack timeline, an audit log, or the history of a finding.

## Accessibility

Ordered list; times use <time dateTime>; markers are decorative and tone never carries meaning that is not in the title.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `TimelineItem[]` | — | `{ id, title, time, dateTime?, actor?, description?, tone?, icon? }` |

## Examples

```tsx
import { ActivityTimeline } from "@/components/ui/activity-timeline";

<ActivityTimeline items={events} />
```

## Known gaps
- [ ] Not in the Figma library yet.

Full usage guidance, do / don't and specs: the styleguide page `/styleguide/activity-timeline`.
