export const headers = [
  { title: '', key: 'avatar', sortable: false, width: '48px' },
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Race', key: 'race', sortable: true },
  { title: 'Class', key: 'class', sortable: true },
  { title: 'Level', key: 'level', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Campaign', key: 'campaign', sortable: true },
  { title: 'System', key: 'system', sortable: true },
  { title: 'Created', key: 'created', sortable: true },
  { title: '', key: 'actions', sortable: false, align: 'end' as const },
]

export function statusColor(status: string) {
  if (status === 'In Campaign') return 'secondary'
  if (status === 'Retired') return 'surface'
  return 'primary'
}
