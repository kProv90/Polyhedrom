# Feature: Campaigns

Part of: [[Polyhedrom]]

## Overview

### Purpose

The **Campaigns** page is the primary hub for managing TTRPG campaigns. Users can view all of their campaigns as cards, see player rosters and campaign status at a glance, create new campaigns (with live player search via Firestore), and navigate into individual campaigns for session management and notes.

---

## Technical Implementation

### Vue Components Required

- `CaCard` (`src/components/campaign/CaCard.vue`) — Campaign card showing cover image, title, description, status chip, and player avatars
- `CaNewDialog` (`src/components/campaign/CaNewDialog.vue`) — PolyDialog for creating a new campaign; includes live Firestore player search (3+ character minimum, `limit(10)`, ordered by `displayName`)

### Data Structure

```ts
// types/campaign.d.ts

interface Player {
  name: string
  avatar: string
}

interface Campaign {
  id: number
  title: string
  description: string
  image: string
  status: 'Active' | 'Paused' | 'Completed'
  players: Player[]
}
```

### API Endpoints

| Method   | Endpoint         | Purpose                                      |
| -------- | ---------------- | -------------------------------------------- |
| `GET`    | `/api/campaigns` | Load all campaigns for authenticated user    |
| `POST`   | `/api/campaigns` | Create a new campaign                        |
| `PATCH`  | `/api/campaigns` | Update campaign fields (param: `id`)         |
| `DELETE` | `/api/campaigns` | Delete a campaign (param: `id`)              |

### State Management

- **Local state only** — no dedicated Pinia store
- `campaigns` ref populated from API (currently `fakeCampaigns` from `src/lib/api/fake.ts`)
- `showNewDialog` ref — controls `CaNewDialog` visibility

---

## User Experience

### User Stories

- As a **DM**, I want to **see all my campaigns at a glance** so that I can quickly switch between active games.
- As a **DM**, I want to **create a new campaign** and **invite players by searching for their usernames** so that onboarding is fast.
- As a **player**, I want to **see which campaigns I'm part of** and their current status.
- As a **user**, I want to **see the player roster** on each card so that I know who's in each game.

### UI/UX Considerations

- `PolyBanner` at top with "New Campaign" button
- Campaign cards in a responsive grid
- Status chip color-coded: Active = green, Paused = orange, Completed = grey
- Player avatars shown as stacked `v-avatar` chips on each card
- `CaNewDialog` uses `PolyDialog` wrapper with persistent prop

---

## Dependencies & Integration

### Feature Dependencies

- **Depends on**: Firebase Auth, Firestore (campaign storage + player search)
- **Integrates with**:
  - Characters page (characters linked to a campaign)
  - Dashboard (campaign count stat card, upcoming sessions)
  - Virtual Drive (per-campaign folder structure)
  - Messages (party messaging)

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

- `fakeCampaigns` in `src/lib/api/fake.ts` — replace with real GET when backend is ready
- Player search in `CaNewDialog` queries Firestore `users` collection: prefix match on `displayName`, minimum 3 chars, `limit(10)`
- Campaign images currently use picsum.photos placeholders — will use Firebase Storage URLs
