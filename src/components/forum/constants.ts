export const CATEGORIES = [
  { label: 'All', value: 'All', icon: 'mdi-forum-outline' },
  { label: 'Announcements', value: 'Announcements', icon: 'mdi-bullhorn-outline' },
  { label: 'General', value: 'General', icon: 'mdi-chat-outline' },
  { label: 'LFG', value: 'LFG', icon: 'mdi-account-search-outline' },
  { label: 'Homebrew', value: 'Homebrew', icon: 'mdi-flask-outline' },
  { label: 'Rules & Mechanics', value: 'Rules & Mechanics', icon: 'mdi-book-open-outline' },
  { label: 'Campaigns', value: 'Campaigns', icon: 'mdi-map-legend' },
  { label: 'Off-Topic', value: 'Off-Topic', icon: 'mdi-coffee-outline' },
]

// Keep plain array for v-for usage in FrNewPostDialog
export const categories = CATEGORIES.map(c => c.value)

export const SORT_OPTIONS = ['Latest', 'Top', 'Most Replies']

export function categoryColor(category: string): string {
  const map: Record<string, string> = {
    Announcements: 'error',
    General: 'primary',
    LFG: 'success',
    Homebrew: 'secondary',
    'Rules & Mechanics': 'info',
    Campaigns: 'warning',
    'Off-Topic': 'surface-variant',
  }
  return map[category] ?? 'surface-variant'
}
