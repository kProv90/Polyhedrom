# Feature: Bazaar

Part of: [[Polyhedrom]]

## Overview

### Purpose

The **Bazaar** is Polyhedrom's creator marketplace where users can browse, purchase, and eventually sell Workshop templates, campaign starters, encounter packs, maps, and other TTRPG assets. It features a filterable item grid, a collapsible filter sidebar, and a detail view for inspecting individual items before buying.

**Revenue model**: Flat 5% platform fee — creators keep 95% of every sale.

---

## Technical Implementation

### Vue Components Required

- `BzItem` (`src/components/bazaar/BzItem.vue`) — Individual marketplace item card showing image, title, description, price, rating, and seller
- `BzFilters` (`src/components/bazaar/BzFilters.vue`) — Collapsible filter sidebar with search, category, price range, sort, and min rating controls; owns `BzFiltersState` and emits `update:modelValue`
- `BzDetail` (`src/components/bazaar/BzDetail.vue`) — Full detail view / modal for a selected item; shows full description, tags, reviews count, and purchase CTA
- `constants.ts` (`src/components/bazaar/constants.ts`) — Shared constants (category list, sort options, price range defaults)

### Data Structure

```ts
// types/bazaar.d.ts

interface BazaarItem {
  id: number
  title: string
  description: string       // Short blurb shown on the card
  fullDescription: string   // Long description shown in BzDetail
  image: string
  price: number             // 0 = free
  category: string          // e.g. 'Character Sheet', 'Campaign', 'Encounters', 'Map', 'Premium'
  seller: string
  rating: number            // 0–5
  reviews: number
  tags: string[]
}

interface BzFiltersState {
  search: string
  category: string
  priceRange: [number, number]
  sortBy: string
  minRating: number
}
```

### API Endpoints

| Method   | Endpoint              | Purpose                                          |
| -------- | --------------------- | ------------------------------------------------ |
| `GET`    | `/api/bazaar`         | Load all marketplace items (with query params for filter/sort/pagination) |
| `GET`    | `/api/bazaar/:id`     | Load a single item's full details                |
| `POST`   | `/api/bazaar`         | Create / publish a new listing (creator)         |
| `POST`   | `/api/bazaar/:id/buy` | Purchase an item                                 |
| `PATCH`  | `/api/bazaar/:id`     | Update a listing (creator / admin)               |
| `DELETE` | `/api/bazaar/:id`     | Remove a listing                                 |

### State Management

- **Local state only** — no dedicated Pinia store
- `items` ref — `BazaarItem[]` (currently `fakeBazaarItems` from `src/lib/api/fake.ts`)
- `filters` ref — `BzFiltersState` managed by `BzFilters` via `v-model`
- `selectedItem` ref — `BazaarItem | null` — drives `BzDetail` panel open/close
- `showFilters` ref — boolean controlling the filter sidebar collapse

---

## User Experience

### User Stories

- As a **player**, I want to **browse free character sheet templates** so that I can find one that fits my character.
- As a **DM**, I want to **filter by category and price** so that I can quickly find campaign starters within my budget.
- As a **creator**, I want to **publish my Workshop templates** and earn revenue from sales.
- As a **user**, I want to **see ratings and reviews** before purchasing so that I can make an informed decision.

### UI/UX Considerations

- `PolyBanner` at top
- Two-column layout: filter sidebar (collapsible) | item grid
- Price of `0` rendered as **"Free"** badge
- Rating displayed as star icons + review count
- `BzDetail` opens as a drawer or dialog on item click
- Filter changes trigger reactive re-filtering of the items list client-side (will be server-side query params in production)

---

## Dependencies & Integration

### Feature Dependencies

- **Depends on**: Firebase Auth, Firestore (item metadata), Firebase Storage (item images/previews), Stripe (payments)
- **Integrates with**:
  - Workshop (templates published from Workshop end up in Bazaar)
  - Dashboard (Bazaar Purchases stat card)
  - User profiles (seller identity, purchase history)

---

## Future Enhancements

- **Seller dashboard** — earnings, listing analytics, sales history
- **Wishlist** — save items for later
- **Featured Listings** — priority placement for promoted creators
- **Backer template pack** — exclusive items for early backers/subscribers
- **Search suggestions** and tag-based discovery

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

- `fakeBazaarItems` in `src/lib/api/fake.ts` — replace with real GET (with filter/sort params) when backend is ready
- `BzFiltersState` is an ambient global type (`types/bazaar.d.ts`) — do not import it in component files
- Category list and sort options live in `src/components/bazaar/constants.ts`
- Free items (`price: 0`) will still go through a "claim" flow to track ownership in Firestore
