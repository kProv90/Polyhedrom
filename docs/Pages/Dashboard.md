# Feature: Dashboard

Part of: [[Polyhedrom]]

## Overview

### Purpose

The **Dashboard** is the landing page after login. It gives users a high-level overview of their entire Polyhedrom account: active characters and campaigns, unread messages, upcoming sessions with a mini calendar, and a recent activity feed. It acts as a command center — every stat card is a clickable shortcut to the relevant page.

---

## Technical Implementation

### Vue Components Required

- `DbMiniCalendar` (`src/components/dashboard/DbMiniCalendar.vue`) — Self-contained mini calendar that highlights session days; owns all calendar state (`calendarYear`, `calendarMonth`), computed cells, and prev/next navigation

### Data Structure

```ts
// Inline types (no dedicated type file — data comes from API)

interface DashboardStat {
  label: string
  value: number
  icon: string       // mdi icon name
  color: string      // Vuetify color token
  route: string      // Vue Router route name
  details: { value: number; label: string }[]
}

interface UpcomingSession {
  id: number
  title: string
  campaign: string
  time: string       // Human-readable, e.g. "Sat, Apr 4 · 7:00 PM"
  month: string      // e.g. "Apr" — used by mini calendar
  day: number        // e.g. 4 — used by mini calendar
  players: number
  type: 'In Person' | 'Online'
  color: string      // Vuetify color token
}

interface RecentActivityItem {
  id: number
  text: string
  icon: string       // mdi icon name
  color: string      // Vuetify color token
  time: string       // Relative time string, e.g. "2 hours ago"
}
```

### API Endpoints

| Method | Endpoint             | Purpose                                        |
| ------ | -------------------- | ---------------------------------------------- |
| `GET`  | `/api/dashboard`     | Load aggregated stats, sessions, activity feed |

### State Management

- **Local state only** — no dedicated Pinia store
- `stats` ref — `DashboardStat[]` for the 4 summary cards
- `upcomingSessions` ref — `UpcomingSession[]` passed to `DbMiniCalendar` and the sessions list
- `recentActivity` ref — `RecentActivityItem[]` for the activity feed
- All data currently sourced from `src/lib/api/fake.ts` (`fakeDashboardStats`, `fakeUpcomingSessions`, `fakeRecentActivity`)

---

## User Experience

### User Stories

- As a **user**, I want to **see my stats at a glance** (characters, campaigns, messages, purchases) as soon as I log in.
- As a **DM**, I want to **see upcoming session dates** highlighted on a calendar so that I never miss a game.
- As a **user**, I want to **click a stat card** and be taken directly to that section of the app.
- As a **user**, I want to **see recent activity** so that I can catch up on what's happened since my last visit.

### UI/UX Considerations

- `PolyBanner` at top
- 4 stat cards in a responsive row — each clickable, routes to corresponding page
- `DbMiniCalendar` on the right sidebar alongside the upcoming sessions list
- Recent activity feed as a chronological list with icon, color, and relative timestamp
- Hover on stat cards: `background-color: rgba(255, 255, 255, 0.06)` — NOT `filter: brightness()`

---

## Dependencies & Integration

### Feature Dependencies

- **Depends on**: Firebase Auth, Firestore (aggregated data from multiple collections)
- **Integrates with**:
  - Characters page (character count)
  - Campaigns page (campaign count + session dates)
  - Messages page (unread count)
  - Bazaar page (purchase count)

---

## Status Tracking

**Status:**

- [x] Researched
- [x] Planned
- [x] In Progress
- [ ] Testing
- [ ] Completed
- [ ] On Hold

**Assigned To:** K. Provo

**Started:** 2026-01-18

**Completed:** —

---

## Notes

- `fakeDashboardStats`, `fakeUpcomingSessions`, `fakeRecentActivity` in `src/lib/api/fake.ts`
- `DbMiniCalendar` is fully self-contained — pass `sessions` prop and it handles all calendar logic internally
- The `/api/dashboard` endpoint will likely be a server-side aggregation across characters, campaigns, messages, and bazaar collections to avoid multiple round trips
