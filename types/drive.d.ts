/** Base properties shared by every node (file or folder) */
interface VdNodeBase {
  /** Unique identifier (string for flexibility with UUIDs or Mongo ObjectIds) */
  id: string

  /** Display name */
  title: string

  /** Material Design Icon name (e.g. "mdi-folder", "mdi-image", "mdi-account-multiple") */
  icon: string

  /** If true: folder is locked from editing/child operations (no uploads, no folder creation). Used for auxiliary roots (Trash, Shared, Favorites, Recent). If false: folder allows child creation and uploads (My Drive and its children) */
  isLocked: boolean

  /** Optional: custom metadata (tags, createdAt, etc.) */
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

  /** Description (e.g. "PDF Document") */
  description?: string

  /** Where the actual content lives */
  ref: string | null // e.g. blob URL, Mongo document ID, external URL

  /** Actual file data */
  file: {
    size: number
    mimeType: string
    extension: string
    uploadedAt: string
  }
}

/** A folder (can contain files + subfolders) */
interface VdFolder extends VdNodeBase {
  /** Type of node */
  type: 'folder'

  /** Children indexed by their id (makes lookups O(1) and preserves order when using Object.keys) */
  children: (VdFile | VdFolder)[]

  /** Optional: control lazy-loading state */
  isExpanded?: boolean
  isLoadingChildren?: boolean
}

interface IndexedNode {
  title: string
  parentId: string
  path: string[] // folder IDs
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
