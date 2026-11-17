interface ForumThread {
  id: number
  title: string
  category: string
  author: string
  avatar: string
  excerpt: string
  tags: string[]
  createdAt: string
  lastActivity: string
  replies: number
  views: number
  upvotes: number
  isPinned: boolean
  isLocked: boolean
}

interface FrFiltersState {
  search: string
  category: string
  sortBy: string
  showPinned: boolean
  showLocked: boolean
}
