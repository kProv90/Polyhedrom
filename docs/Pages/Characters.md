# Feature: Characters

Part of: [[Polyhedrom]]

## Overview

### Purpose

The **Characters** page gives users a central place to manage all of their TTRPG characters across every campaign, system, and status. It supports both a **table view** for dense overview and a **card view** for a more visual browsing experience. Characters can be filtered by status and class, sorted by any column, and toggled into an edit mode for bulk selection.

---

## Technical Implementation

### Vue Components Required

- `ChCard` (`src/components/character/ChCard.vue`) — Card representation of a single character; handles selection outline and hover state
- `constants.ts` (`src/components/character/constants.ts`) — Shared `headers` array for the data table and `statusColor()` helper function

### Data Structure

```ts
// types/character.d.ts

interface Character {
  id: number
  name: string
  race: string
  class: string
  level: number
  status: 'Concept' | 'In Campaign' | 'Retired'
  campaign: string | null
  traits: string[]
  created: string // ISO date string
}
```

### Helper Functions

```ts
// src/components/character/constants.ts

export function statusColor(status: string): string
// Returns: 'secondary' (In Campaign) | 'surface' (Retired) | 'primary' (Concept)
```

### API Endpoints

| Method   | Endpoint          | Purpose                                  |
| -------- | ----------------- | ---------------------------------------- |
| `GET`    | `/api/characters` | Load all characters for authenticated user |
| `POST`   | `/api/characters` | Create a new character                   |
| `PATCH`  | `/api/characters` | Update character fields (param: `id`)    |
| `DELETE` | `/api/characters` | Delete a character (param: `id`)         |

### State Management

- **Local state only** — no dedicated Pinia store
- `characters` ref populated from API (currently `fakeCharacters` from `src/lib/api/fake.ts`)
- `editMode` ref — toggles bulk selection UI
- `selectedIds` ref — tracks selected character IDs in edit mode
- `viewMode` ref — `'table'` | `'card'`
- `filterStatus` ref — filters list by character status
- `filterClass` ref — filters list by character class
- `sortBy` — table sort state (`[{ key: 'name', order: 'asc' }]`)

---

## User Experience

### User Stories

- As a **player**, I want to **see all my characters at a glance** so that I can quickly jump to the one I need.
- As a **DM**, I want to **filter by status** so that I can find active campaign characters without scrolling.
- As a **user**, I want to **switch between table and card views** so that I can browse in the style I prefer.
- As a **user**, I want to **create a new character** so that I can start building my next concept.

### UI/UX Considerations

- `PolyBanner` at top with "New Character" action button
- Table view: fixed-header, full-height, sortable columns, status chip color-coded
- Card view: responsive grid of `ChCard` components with selection outline in edit mode
- Filter chips visible above content area
- Empty state CTA when no characters exist

---

## Dependencies & Integration

### Feature Dependencies

- **Depends on**: Firebase Auth (user isolation), Firestore (character storage)
- **Integrates with**:
  - Campaign page (characters linked to campaigns)
  - Character Designer (AI-assisted questionnaire flow → creates a character)
  - Dashboard (character count stat card)

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

- `fakeCharacters` in `src/lib/api/fake.ts` — replace with real GET when backend is ready
- Status color mapping lives in `constants.ts` — shared with card and table views
- Card view selection uses `ChCard`'s `isSelected` prop + `toggle` emit
