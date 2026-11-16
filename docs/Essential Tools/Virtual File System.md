# Feature: Virtual File System (VFS)

Part of: [[Polyhedrom]]

## Overview

### Purpose

The **Virtual File System (VFS)** is a unified, hierarchical interface that allows users to organize, manage, and access **all** of their TTRPG assets — templates, characters, campaigns, notes, and uploaded files — in a single, familiar tree structure. It serves as the **central nervous system** of the platform, enabling: - **Intuitive organization** (folders, nesting, drag-and-drop) - **Cross-editor navigation** (open any asset in its native editor) - **Storage awareness** (quota tracking, upgrade nudges) - **Data ownership** (full CRUD, export, backup) - **Scalable foundation** for future features (collaboration, AI, marketplace)

---

## Technical Implementation

### Supporting Node.js Packages

- `firebase-admin` - Server-side Firebase SDK (Firestore for metadata, Storage for files)
- `firebase-functions` - Cloud Functions runtime and HTTP handler
### Vue Components Required

- `VdCore` - Main container (Status + Breadcrumbs + Contents + Confirmation)
- `VdStatus` - Sidebar with quota usage and status
- `VdContents` - Main content area displaying items
- `VdBreadcrumbs` - Navigation path
- `VdItem` - Individual file/folder item renderer
- `VdConfirmation` - Dialog for actions (delete, etc.)
- `VdUpload` - Drag-and-drop upload handling
- `VdProperties` - Item details sidebar/modal

### Data Structure

```ts
// types/drive.d.ts

/** Base properties shared by every node (file or folder) */
interface VdNodeBase {
  id: string
  title: string
  icon: string
  /** If true: locked from editing/child operations (Trash, Shared, Favorites, Recent). If false: allows uploads and folder creation (My Drive and its children). */
  isLocked: boolean
  meta?: {
    createdAt?: string
    updatedAt?: string
    tags?: string[]
    [key: string]: any
  }
}

/** A file (image, markdown, character concept, JSON template, etc.) */
interface VdFile extends VdNodeBase {
  type: 'file'
  description?: string
  ref: string | null
  file: {
    size: number
    mimeType: string
    extension: string
    uploadedAt: string
  }
}

/** A folder (can contain files + subfolders) */
interface VdFolder extends VdNodeBase {
  type: 'folder'
  children: (VdFile | VdFolder)[]
  isExpanded?: boolean
  isLoadingChildren?: boolean
}

/** Lightweight index entry for fast path lookups */
interface IndexedNode {
  title: string
  parentId: string
  path: string[] // folder IDs from root to parent
}

/** Union type for any node in the tree */
type VdNode = VdFile | VdFolder

interface VirtualDrive {
  userId: string
  version: number
  index: Record<string, IndexedNode>
  storageUsed: number
  storageLimit: number
  root: VdFolder
  trash: VdFolder
  shared: VdFolder
  favorites: VdFolder
  recent: VdFolder
}

interface VdMimeType {
  ext: string
  mime: string
  icon: string
  desc: string
}

interface UploadItem {
  id: string
  file: File
  parentId: string
  status: 'pending' | 'uploading' | 'completed' | 'error'
  progress: number
  abortController: AbortController
}

interface Breadcrumb {
  id: string
  title: string
}

interface VdRequest {
  endpoint: '/api/drive'
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  context?: string
  data?: any
}
```
### API Endpoints

| Method   | Endpoint     | Purpose                              |
| -------- | ------------ | ------------------------------------ |
| `GET`    | `/api/drive` | Load full drive for authenticated user |
| `POST`   | `/api/drive` | Create new folder or upload file     |
| `PUT`    | `/api/drive` | Move node (params: `id`, `targetId`) |
| `PATCH`  | `/api/drive` | Update node metadata (rename, etc.)  |
| `DELETE` | `/api/drive` | Delete node (param: `id`)            |

### State Management

- **Pinia Store**: `useDriveStore`
  - state: drive, clipboard, viewMode, sortOrder
  - actions: index(), create(), delete(), move(), rename()
- **Global Integration**:
  - Listens to Firebase Auth user state → auto-load drive on login

---

## User Experience

### User Stories

- As a **DM**, I want to **organize my campaign** in /Campaigns/Waterdeep/NPCs so that I can find assets quickly.
- As a **player**, I want to **see how much storage I have left** so that I know when to upgrade.
- As a **power user**, I want to **drag-drop a character into a campaign folder** so that it’s linked contextually.
- As a **new user**, I want an **empty state with “Create your first template”** so that I’m not overwhelmed.

### UI/UX Considerations

- **Quota bar** always visible → subtle at <70%, urgent at >95%
- **Breadcrumbs** for deep navigation
- **Keyboard shortcuts**: Enter → open, F2 → rename, Delete → trash
- **Mobile**: Collapse tree, swipe actions
- **Accessibility**:
  - Full keyboard nav
  - ARIA labels on nodes
  - High-contrast mode support

---

## Dependencies & Integration

### Feature Dependencies

- **Depends on**:
  - Firebase Auth (user isolation)
  - Firestore (VFS tree and asset metadata)
  - Firebase Storage (file/image/asset storage)
- **Integrates with**:
  - Template Builder
  - Character Editor
  - Campaign Manager
  - Dashboard (recent files)

### Third-Party Services

- **Firebase Auth** - Authentication & user sessions
- **Firestore** - Primary database for VFS metadata and tree structure
- **Firebase Storage** - File, image, and asset storage

---

## Implementation Details

### Complexity Estimate

- [ ] Low (1-2 days)
- [ ] Medium (3-5 days)
- [ ] High (1-2 weeks)
- [x] Very High (2+ weeks)

### Priority Level

- [x] Critical (Core functionality)
- [ ] High (Important for MVP)
- [ ] Medium (Nice to have)
- [ ] Low (Future enhancement)

### Development Phase

- [x] Phase 1 (MVP)
- [ ] Phase 2 (Post-launch)
- [ ] Phase 3 (Future)

### Technical Risks/Challenges

- **Deep tree performance** → Mitigated by **lazy loading**
- **Concurrent edits** → Use **optimistic UI + version field**
- **Quota miscalculation** → Server-side recalc on every save
- **Mobile drag-drop** → Use touch events + long-press context menu

---

## Testing & Quality

### Test Cases

1. User creates folder → appears in tree and persists after refresh
2. User moves character into campaign → editor opens correct asset
3. User exceeds quota → save blocked, upgrade CTA shown
4. Two tabs open → changes sync without conflict
5. User deletes folder → moved to .trash, recoverable for 30 days

### Performance Considerations

- **Expected load**: 10k nodes max per user
- **Target**: <300ms to load visible tree
- **Optimization**:
  - Index userId + parentId
  - Cache expanded paths in memory
  - Debounce save on drag-end

---

# Documentation Needs

### User Documentation

- [x] Help text/tooltips needed
- [x] Tutorial/guide needed
- [ ] Video walkthrough needed

### Developer Documentation

- [x] API documentation
- [x] Component documentation
- [x] Architecture notes

---

## Future Enhancements

- **Shared Folders** with role-based permissions (DM, Player, Viewer)
- **AI-Powered Organization**: “Auto-sort NPCs by CR”
- **Version History** per node
- **Full-Text Search** across all assets
- **Export Campaign as PDF/ZIP**
- **Marketplace**: Publish & import public templates

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

**Started:** YYYY-MM-DD

**Completed:** YYYY-MM-DD

**Related Issues/Tasks:**

- Link to GitHub issues, Trello cards, etc.

---

## Notes

- This is the **foundational layer** for all future features.
- Consider **soft-delete** + .trash folder from day one.
- **Quota bar = monetization engine** — never hide it.
- Start with **lazy loading disabled**, add when trees grow.
- **Tagline**: “One tree. All your worlds.”
