# Polyhedrom

A sleek, responsive web-based tabletop companion app for Dungeon Masters, players, and everything in-between. Designed to streamline prep and play at the table by intelligently organizing campaigns, enabling powerful no-code custom sheet creation, and fostering a creator-friendly community.

> Built by gamers, for gamers — organizing the chaos, empowering creators, and making every session more enjoyable.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3 + Vuetify 3 (compact density) + Pinia |
| Build Tool | Vite |
| Language | TypeScript |
| Backend | Firebase Cloud Functions (Express) |
| Database | Firestore |
| File Storage | Firebase Storage |
| Auth | Firebase Auth |

---

## Project Structure

```
polyhedrom/
├── src/                        # Vue frontend
│   ├── components/             # Reusable UI components
│   │   ├── auth/               # Login, register, reset, verify forms
│   │   ├── bazaar/             # BzItem, BzFilters, BzDetail
│   │   ├── campaign/           # CaCard, CaNewDialog
│   │   ├── character/          # ChCard, constants
│   │   ├── dashboard/          # DbMiniCalendar
│   │   ├── drive/              # VdCore, VdContents, VdItem, VdUpload, etc.
│   │   ├── message/            # MgConversationList, MgPinnedDrawer
│   │   ├── ui/                 # PolyBanner, PolyDialog, PolyNav, PolySnack, etc.
│   │   └── workshop/           # WsCore, WsRibbon, WsSurface, WsSelect
│   ├── lib/
│   │   ├── api/                # API client (core, drive, fake stand-in data)
│   │   ├── auth.ts             # Firebase Auth helpers
│   │   └── firebase.ts         # Firebase app initialization
│   ├── pages/                  # Route-level page components
│   │   ├── main/               # Dashboard, Characters, Campaigns, Bazaar, Messages, VirtualDrive
│   │   └── tools/              # Workshop
│   ├── plugins/                # Vuetify + plugin setup
│   ├── routes/                 # Vue Router
│   ├── stores/                 # Pinia stores (session, drive, ui, workshop)
│   ├── styles/                 # Global SCSS
│   └── types → /types/         # (see below)
├── functions/                  # Firebase Cloud Functions (backend)
│   └── src/
│       ├── index.ts            # Express HTTP handler (all /api/* routes)
│       ├── auth.ts             # User creation trigger
│       ├── init.ts             # Firebase Admin SDK initialization
│       └── services/
│           └── drive.ts        # Virtual Drive service (Firestore)
├── types/                      # Ambient TypeScript type declarations
│   ├── drive.d.ts
│   ├── character.d.ts
│   ├── campaign.d.ts
│   ├── message.d.ts
│   ├── bazaar.d.ts
│   ├── user.d.ts
│   └── workshop.d.ts
├── public/
├── index.html
├── vite.config.mts
├── tsconfig.json               # Solution file (references app + node configs)
├── tsconfig.app.json           # Frontend TypeScript config
└── tsconfig.node.json          # Vite config TypeScript config
```

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### Frontend (Dev Server)

```bash
npm install
npm run dev -- --host
```

Vite runs the app on the default local port `http://localhost:5173` (or the next available port if 5173 is already in use).

If you want to expose the dev server on a LAN or VM host, use:

```bash
npm run public
```

### Backend (Cloud Functions)

```bash
cd functions
npm install
npm run dev
```

This builds the TypeScript functions and starts the Firebase emulator for the backend.

---

## API Overview

All routes are served by the Firebase Cloud Functions Express app. Every request requires a Firebase Auth token:

```
Authorization: Bearer <firebase-id-token>
```

| Method   | Endpoint     | Purpose                          |
|----------|--------------|----------------------------------|
| `GET`    | `/api/drive` | Load full Virtual Drive          |
| `POST`   | `/api/drive` | Create folder or upload file     |
| `PUT`    | `/api/drive` | Move node                        |
| `PATCH`  | `/api/drive` | Update node metadata             |
| `DELETE` | `/api/drive` | Delete node                      |
| `GET`    | `/api/user`  | Fetch current user info          |

---

## Key Features

- **Virtual Drive** — Hierarchical file tree with multi-root support (My Drive, Trash, Shared, Favorites, Recent), CRUD, upload queue, and quota tracking
- **Workshop** — No-code 17×22 grid canvas for building auto-calculating custom sheets with variable/expression bindings
- **Characters** — Table + card views with status tracking and campaign linking
- **Campaigns** — Campaign management with player roster, status tracking, and session planning
- **Dashboard** — Account overview with stats, mini calendar, and live activity feed
- **Bazaar** — Creator marketplace (5% platform fee, 95% to creators) for templates, maps, and assets
- **Messages** — Private messaging with pinned message support

---

## Fake Data

During development, stand-in data lives in `src/lib/api/fake.ts`. Each named export maps 1:1 to a future API call — remove and replace per feature when the backend is ready:

| Export | Replaces |
|---|---|
| `fakeCharacters` | `GET /api/characters` |
| `fakeCampaigns` | `GET /api/campaigns` |
| `fakeDashboardStats` | `GET /api/dashboard` |
| `fakeUpcomingSessions` | `GET /api/dashboard` |
| `fakeRecentActivity` | `GET /api/dashboard` |
| `fakeBazaarItems` | `GET /api/bazaar` |
| `fakeConversations` | `GET /api/messages` |
| `fakePinnedMessages` | `GET /api/messages/:id/pins` |
| `fakeWorkshopTemplates` | `GET /api/templates` |

---

## Deployment

The frontend builds as a static SPA and can be hosted on Firebase Hosting. The backend deploys as Firebase Cloud Functions.

```bash
# Deploy everything
firebase deploy

# Frontend only
firebase deploy --only hosting

# Functions only
firebase deploy --only functions
```

---

## License

Private — all rights reserved.
