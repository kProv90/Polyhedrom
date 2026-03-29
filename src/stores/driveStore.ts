import { defineStore } from 'pinia'
import { authFetch } from '@/lib/auth'
import { api } from '@/lib/api'
import { useUiStore } from '@/stores/uiStore'

export const useDriveStore = defineStore('drive', {
  state: () => ({
    // Single source of truth for everything that comes from the server
    data: null as VirtualDrive | null,

    // Purely transient UI/navigation state
    path: [] as Breadcrumb[], // ← current location
    selectedItem: null as VdNode | null,
    previewItem: null as VdFile | null,
    uploadQueue: [] as UploadItem[],
    roots: {
      myDrive: null as Breadcrumb | null,
      trash: null as Breadcrumb | null,
      shared: null as Breadcrumb | null,
      recent: null as Breadcrumb | null,
      favorites: null as Breadcrumb | null,
    },
    confirmation: {
      show: false,
      title: '',
      message: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: null as (() => void) | null,
    },
  }),

  getters: {
    rootFolder(): VdFolder | null {
      return this.data?.root ?? null
    },

    currentFolder(): VdFolder | null {
      if (!this.data) return null

      // Determine which root to start from
      // Logic: The first item in 'path' should effectively determine the root
      // OR we just traverse based on ID.
      if (this.path.length === 0) return this.data.root

      const rootId = this.path[0]?.id
      let folder: VdFolder | undefined

      // Select Root
      if (rootId === this.data.root.id) folder = this.data.root
      else if (this.data.trash && rootId === this.data.trash.id) folder = this.data.trash
      else if (this.data.shared && rootId === this.data.shared.id) folder = this.data.shared
      else if (this.data.recent && rootId === this.data.recent.id) folder = this.data.recent
      else if (this.data.favorites && rootId === this.data.favorites.id)
        folder = this.data.favorites
      else {
        // Fallback or error?
        // If we can't find the start root, maybe default to main root
        folder = this.data.root
      }

      // If just at root, return it
      if (this.path.length === 1) return folder

      for (const crumb of this.path.slice(1)) {
        folder = folder.children.find((c) => c.type === 'folder' && c.id === crumb.id) as
          | VdFolder
          | undefined
        if (!folder) return null
      }
      return folder
    },
    setupRoots() {
      if (!this.data) return
      this.roots.myDrive = {
        id: this.data?.root.id,
        title: 'My Drive',
      }
      this.roots.trash = {
        id: this.data?.trash.id,
        title: 'Trash',
      }
      this.roots.shared = {
        id: this.data?.shared.id,
        title: 'Shared with me',
      }
      this.roots.recent = {
        id: this.data?.recent.id,
        title: 'Recent',
      }
      this.roots.favorites = {
        id: this.data?.favorites.id,
        title: 'Favorites',
      }
    },
    contents(): VdNode[] {
      const folder = this.currentFolder
      if (!folder) return []

      const folders = folder.children
        .filter((c): c is VdFolder => c.type === 'folder')
        .sort((a, b) => a.title.localeCompare(b.title))
      const files = folder.children
        .filter((c): c is VdFile => c.type === 'file')
        .sort((a, b) => a.title.localeCompare(b.title))

      return [...folders, ...files]
    },

    // Simple pass-throughs
    storageUsed: (s) => (s.data ? s.data.storageUsed : 0),
    storageLimit: (s) => (s.data ? s.data.storageLimit : 0),
    index: (s) => (s.data ? s.data.index : {}),
    // Compatibility helpers for templates that might use 'folders' mainly for detecting readiness
    folders: (s) => (s.data ? [s.data.root] : []),

    // [VD-010] Check if current folder allows uploads and child folder creation
    canModifyCurrentFolder(): boolean {
      const folder = this.currentFolder
      return folder ? !folder.isLocked : true
    },
  },

  actions: {
    // Helper to determine which root a node belongs to
    getRootForNode(nodeId: string, nodePath: string[] = []): VdFolder {
      if (!this.data) return this.data!.root

      // Check if node itself is a root
      if (nodeId === this.data.root.id) return this.data.root
      if (this.data.trash && nodeId === this.data.trash.id) return this.data.trash
      if (this.data.shared && nodeId === this.data.shared.id) return this.data.shared
      if (this.data.favorites && nodeId === this.data.favorites.id) return this.data.favorites
      if (this.data.recent && nodeId === this.data.recent.id) return this.data.recent

      // Check if node is in a non-root location
      if (
        this.data.trash &&
        (nodePath.includes(this.data.trash.id) || nodeId === this.data.trash.id)
      )
        return this.data.trash
      if (
        this.data.shared &&
        (nodePath.includes(this.data.shared.id) || nodeId === this.data.shared.id)
      )
        return this.data.shared
      if (
        this.data.favorites &&
        (nodePath.includes(this.data.favorites.id) || nodeId === this.data.favorites.id)
      )
        return this.data.favorites
      if (
        this.data.recent &&
        (nodePath.includes(this.data.recent.id) || nodeId === this.data.recent.id)
      )
        return this.data.recent

      // Default to root
      return this.data.root
    },

    // Helper used to find node by ID across all roots
    findNodeById(id: string): VdNode | null {
      if (!this.data) return null

      // 1. Check if node is a Root itself
      if (id === this.data.root.id) return this.data.root
      if (this.data.trash && id === this.data.trash.id) return this.data.trash
      if (this.data.shared && id === this.data.shared.id) return this.data.shared
      if (this.data.favorites && id === this.data.favorites.id) return this.data.favorites
      if (this.data.recent && id === this.data.recent.id) return this.data.recent

      // 2. Use Index
      const meta = this.data.index[id]
      if (!meta) return null

      // 3. Determine Root
      // The first ID in the path is usually the Root ID.
      // If path is empty (shouldn't happen for deep nodes), check parentId.
      const rootId = meta.path.length > 0 ? meta.path[0] : meta.parentId

      let currentFolder: VdFolder | undefined
      if (rootId === this.data.root.id) currentFolder = this.data.root
      else if (this.data.trash && rootId === this.data.trash.id) currentFolder = this.data.trash
      else if (this.data.shared && rootId === this.data.shared.id) currentFolder = this.data.shared
      else if (this.data.favorites && rootId === this.data.favorites.id)
        currentFolder = this.data.favorites
      else if (this.data.recent && rootId === this.data.recent.id)
        currentFolder = this.data.recent
      else {
        // Fallback: Default to main root if we can't identify the root (e.g. slight data inconsistency)
        currentFolder = this.data.root
      }

      if (!currentFolder) return null

      // 4. Traverse Path
      for (const ancestorId of meta.path) {
        if (ancestorId === currentFolder.id) continue // Skip if path includes the root we are already at

        const nextFolder = currentFolder.children.find(
          (c) => c.id === ancestorId && c.type === 'folder'
        ) as VdFolder | undefined

        if (!nextFolder) return null // Path broken
        currentFolder = nextFolder
      }

      // 5. Find Target in the final folder
      const node = currentFolder.children.find((c) => c.id === id)
      return node || null
    },

    async fetchDrive() {
      // 1. Capture current location logic
      const currentFolderId = this.path.length > 0 ? this.path[this.path.length - 1]?.id : null

      // 2. Fetch
      const drive = await api.drive.get.all()
      this.data = drive

      // 3. Restore path or reset
      let restored = false
      if (currentFolderId && this.data.index[currentFolderId]) {
        const item = this.data.index[currentFolderId]
        const startRoot = this.getRootForNode(currentFolderId, item.path)

        const fullPath: Breadcrumb[] = [{ id: startRoot.id, title: startRoot.title }]

        for (const id of item.path) {
          if (id === startRoot.id) continue
          const node = this.data.index[id]
          if (node) fullPath.push({ id, title: node.title })
        }

        // Only add current folder to path if it's not the root itself
        if (currentFolderId !== startRoot.id) {
          fullPath.push({ id: currentFolderId, title: item.title })
        }

        this.path = fullPath
        restored = true
      }

      if (!restored && this.data) {
        this.path = [{ id: this.data.root.id, title: this.data.root.title }]
      }
    },

    async navigateTo(nodeId: string) {
      if (!this.data) return

      const node = this.data.index[nodeId]
      if (!node) return

      const startRoot = this.getRootForNode(nodeId, node.path)
      const newPath: Breadcrumb[] = [{ id: startRoot.id, title: startRoot.title }]

      for (const id of node.path) {
        if (id === startRoot.id) continue
        const ancestor = this.data.index[id]
        if (ancestor) newPath.push({ id, title: ancestor.title })
      }

      // Check if item is folder or file and add to path accordingly
      const actualNode = this.findNodeById(nodeId)
      if (actualNode?.type === 'folder') {
        // Only add to path if it's not the root folder itself
        if (nodeId !== startRoot.id) {
          newPath.push({ id: nodeId, title: node.title })
        }
        this.path = newPath
        this.selectedItem = null // Deselect when entering
      } else {
        // It's a file (or we treat it as child of parent)
        this.path = newPath
        this.selectedItem = actualNode
      }
    },

    selectItem(item: VdNode | null) {
      this.selectedItem = item
    },

    // Compatibility method because some components might call this manually?
    // Actually VdBreadcrumbs called selectItem(null) and VdContents calls getContents()
    // With getters, getContents is now 'contents' computed property.
    // We can verify if 'getContents' action is called anywhere.
    // drive.getContents() was called in VdContents handleDblClick.
    // We should keep a dummy or update VdContents.
    getContents() {
      // No-op, reactive getters handle this.
      return this.contents
    },

    async get(id: string) {
      const data = await authFetch(`/api/drive/get/${id}`, { method: 'GET' })
      return await data.json()
    },

    async move(id: string, targetId: string) {
      const res = await api.drive.put.move(id, targetId)
      await this.fetchDrive()
      return res
    },

    async patch(id: string, updates: Record<string, any>) {
      const res = await api.drive.patch.update(id, updates)
      await this.fetchDrive()
      return res
    },

    async delete(id: string) {
      if (!this.selectedItem) return
      const result = await api.drive.delete.node(id)
      await this.fetchDrive()
      if (this.selectedItem.id === id) {
        this.selectedItem = null
      }
      return result
    },

    async createFolder(parentId: string, name: string): Promise<VdFolder> {
      const newFolder = await api.drive.post.folder(parentId, name)
      await this.fetchDrive()
      return newFolder
    },

    async uploadFile(parentId: string, file: File) {
      const data = await api.drive.post.upload(parentId, file)
      if (!data) throw new Error('Upload failed')
      await this.fetchDrive()
      return data
    },

    addToQueue(file: File, parentId: string) {
      const id = Math.random().toString(36).substring(7)
      this.uploadQueue.push({
        id,
        file,
        parentId,
        status: 'pending',
        progress: 0,
        abortController: new AbortController(),
      })
      this.processQueue()
    },

    async processQueue() {
      const activeUploads = this.uploadQueue.filter((item) => item.status === 'uploading').length
      if (activeUploads >= 1) return

      const nextItem = this.uploadQueue.find((item) => item.status === 'pending')
      if (!nextItem) return

      nextItem.status = 'uploading'
      try {
        await this.uploadFile(nextItem.parentId, nextItem.file)
        nextItem.status = 'completed'
        nextItem.progress = 100
      } catch (e: any) {
        if (e.name === 'AbortError') {
          // Handled by cancel
        } else {
          nextItem.status = 'error'
          nextItem.progress = 100
          const ui = useUiStore()
          ui.showSnackbar(`Upload failed: ${e.message}`, 'error')
        }
      } finally {
        this.processQueue()
      }
    },

    cancelUpload(id: string) {
      const item = this.uploadQueue.find((i) => i.id === id)
      if (item) {
        item.abortController.abort()
        this.uploadQueue = this.uploadQueue.filter((i) => i.id !== id)
        this.processQueue()
      }
    },

    removeUpload(id: string) {
      this.uploadQueue = this.uploadQueue.filter((i) => i.id !== id)
      this.processQueue()
    },

    preview(item: VdFile) {
      this.previewItem = item
    },

    closePreview() {
      this.previewItem = null
    },

    confirm(options: {
      title: string
      message: string
      confirmText?: string
      cancelText?: string
      onConfirm: () => void
    }) {
      this.confirmation = {
        show: true,
        title: options.title,
        message: options.message,
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        onConfirm: options.onConfirm,
      }
    },

    async rebuildDrive() {
      const ui = useUiStore()
      try {
        // Call the rebuild endpoint which will:
        // 1. Rebuild the VirtualDrive object in MongoDB
        // 2. Delete all blob objects from Vercel blob server
        await authFetch('/api/drive?action=rebuild', { method: 'POST' })
        
        // Refresh the drive data
        await this.fetchDrive()
        
        ui.showSnackbar('Drive rebuilt successfully', 'success')
      } catch (e: any) {
        ui.showSnackbar(`Rebuild failed: ${e.message}`, 'error')
        console.error('Drive rebuild error:', e)
      }
    },
  },
})
