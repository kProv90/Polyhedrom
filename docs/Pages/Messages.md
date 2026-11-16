# Feature: Messages

Part of: [[Polyhedrom]]

## Overview

### Purpose

The **Messages** page is a full-featured private messaging system between Polyhedrom users. It features a searchable conversation sidebar, a main message thread with date dividers, and a **Pinned Messages drawer** that lets users bookmark important messages within a conversation (DM notes, player secrets, session reminders).

---

## Technical Implementation

### Vue Components Required

- `MgConversationList` (`src/components/message/MgConversationList.vue`) — Left sidebar showing conversation list; owns `search` ref, `filteredConversations` computed, and all sidebar CSS
- `MgPinnedDrawer` (`src/components/message/MgPinnedDrawer.vue`) — Right slide-in drawer showing pinned messages for the active conversation; uses `v-model` for open/close state and owns all drawer CSS + transition animation

### Data Structure

```ts
// types/message.d.ts

interface PinnedMessage {
  id: number
  author: string
  text: string
  time: string
}

interface Message {
  id: number
  text: string
  time: string
  fromMe: boolean
  dateDivider?: string  // Optional date label shown above the message
}

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread?: number
  messages: Message[]
}
```

### API Endpoints

| Method   | Endpoint                          | Purpose                                    |
| -------- | --------------------------------- | ------------------------------------------ |
| `GET`    | `/api/messages`                   | Load all conversations for authenticated user |
| `GET`    | `/api/messages/:id`               | Load full message thread for a conversation |
| `POST`   | `/api/messages`                   | Send a new message                         |
| `POST`   | `/api/messages/:id/pin`           | Pin a message within a conversation        |
| `DELETE` | `/api/messages/:id/pin/:pinId`    | Unpin a message                            |

### State Management

- **Local state only** — no dedicated Pinia store
- `conversations` ref — `Conversation[]` (currently `fakeConversations` from `src/lib/api/fake.ts`)
- `pinnedMessages` ref — `Record<number, PinnedMessage[]>` keyed by conversation ID (currently `fakePinnedMessages`)
- `selectedConversation` ref — currently active `Conversation | null`
- `isPinnedOpen` ref — `boolean` controls the pinned drawer
- `newMessage` ref — current message input value
- `messageContainer` template ref — used with `nextTick` to auto-scroll to latest message on conversation select

---

## User Experience

### User Stories

- As a **player**, I want to **message my DM directly** to ask questions between sessions.
- As a **DM**, I want to **pin important messages** (player secrets, session notes) so that I can find them quickly.
- As a **user**, I want to **search my conversations** by name so that I can quickly find the right thread.
- As a **user**, I want to **see unread counts** on conversations so that I know what needs my attention.

### UI/UX Considerations

- `PolyBanner` at top with "Pinned Messages" toggle button (shows count badge)
- Three-column layout: sidebar (conversations) | main thread | pinned drawer
- Conversation list is searchable; filtered client-side
- Auto-scroll to bottom on conversation switch (`nextTick` + `scrollTop`)
- Date dividers rendered inline in message thread
- `MgPinnedDrawer` slides in from the right with a CSS transition
- Unread badge shown on conversation list items

---

## Dependencies & Integration

### Feature Dependencies

- **Depends on**: Firebase Auth, Firestore (messages and conversations), potentially Firebase Realtime Database or Firestore listeners for live updates
- **Integrates with**:
  - Dashboard (unread message count on stat card)
  - User profiles (avatar, display name)

---

## Future Enhancements

- **Real-time updates** via Firestore `onSnapshot` listeners
- **Group/party channels** per campaign
- **Message reactions** (emoji)
- **File attachment** via Virtual Drive

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

- `fakeConversations` and `fakePinnedMessages` in `src/lib/api/fake.ts`
- `isPinnedOpen` is a plain `ref(false)` — reset in `selectConversation()` so the drawer closes when switching threads
- `MgConversationList` emits `select` with the full `Conversation` object — parent handles the active state
