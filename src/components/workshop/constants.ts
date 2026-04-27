export interface PaletteComponent {
  type: string
  label: string
  defaultW: number
  defaultH: number
  defaultProps?: Record<string, unknown>
}

export interface PaletteCategory {
  id: string
  label: string
  icon: string
  components: PaletteComponent[]
}

export const componentIconMap: Record<string, string> = {
  // Containers
  'v-card': 'mdi-card-outline',
  'v-sheet': 'mdi-square-outline',
  'v-list': 'mdi-format-list-bulleted',
  'v-chip': 'mdi-label-outline',
  'v-divider': 'mdi-minus',
  'v-expansion-panels': 'mdi-arrow-expand-vertical',
  // Input
  'v-text-field': 'mdi-form-textbox',
  'v-textarea': 'mdi-text-box-outline',
  'v-select': 'mdi-form-select',
  'v-checkbox': 'mdi-checkbox-marked-outline',
  'v-switch': 'mdi-toggle-switch-outline',
  'v-slider': 'mdi-tune',
  'v-radio-group': 'mdi-radiobox-marked',
  'v-btn': 'mdi-gesture-tap-button',
  // Media
  'v-avatar': 'mdi-account-circle-outline',
  'v-icon': 'mdi-emoticon-outline',
  'v-img': 'mdi-image-outline',
  // Feedback
  'v-alert': 'mdi-alert-circle-outline',
  'v-badge': 'mdi-numeric-1-circle-outline',
  'ws-progress': 'mdi-progress-clock',
  'v-rating': 'mdi-star-half-full',
  // Display
  'v-table': 'mdi-table',
  'v-data-table': 'mdi-table-large',
  'v-sparkline': 'mdi-chart-line-variant',
  // Selection
  'v-btn-toggle': 'mdi-button-cursor',
  'v-chip-group': 'mdi-label-multiple-outline',
  'v-stepper': 'mdi-stairs',
  // Navigation
  'v-tabs': 'mdi-tab',
  'v-breadcrumbs': 'mdi-dots-horizontal',
  // Layouts
  'v-container': 'mdi-view-grid-outline',
}

export const paletteCategories: PaletteCategory[] = [
  {
    id: 'containers',
    label: 'Containers',
    icon: 'mdi-layers-outline',
    components: [
      {
        type: 'v-card',
        label: 'Card',
        defaultW: 6,
        defaultH: 4,
        defaultProps: { title: 'Card Title', subtitle: 'Subtitle', variant: 'outlined' },
      },
      {
        type: 'v-sheet',
        label: 'Sheet',
        defaultW: 6,
        defaultH: 3,
        defaultProps: { rounded: 'lg', border: true },
      },
      { type: 'v-list', label: 'List', defaultW: 5, defaultH: 4 },
      { type: 'v-chip', label: 'Chip', defaultW: 3, defaultH: 1, defaultProps: { text: 'Chip' } },
      { type: 'v-divider', label: 'Divider', defaultW: 8, defaultH: 1 },
      { type: 'v-expansion-panels', label: 'Accordion', defaultW: 7, defaultH: 3 },
    ],
  },
  {
    id: 'input',
    label: 'Input',
    icon: 'mdi-form-textbox',
    components: [
      {
        type: 'v-text-field',
        label: 'Text Field',
        defaultW: 5,
        defaultH: 2,
        defaultProps: { label: 'Label', variant: 'outlined' },
      },
      {
        type: 'v-textarea',
        label: 'Textarea',
        defaultW: 6,
        defaultH: 3,
        defaultProps: { label: 'Label', variant: 'outlined' },
      },
      {
        type: 'v-select',
        label: 'Select',
        defaultW: 5,
        defaultH: 2,
        defaultProps: { label: 'Choose', items: [], variant: 'outlined' },
      },
      {
        type: 'v-checkbox',
        label: 'Checkbox',
        defaultW: 4,
        defaultH: 1,
        defaultProps: { label: 'Checkbox', color: 'primary' },
      },
      {
        type: 'v-switch',
        label: 'Switch',
        defaultW: 4,
        defaultH: 1,
        defaultProps: { label: 'Switch', color: 'primary' },
      },
      {
        type: 'v-slider',
        label: 'Slider',
        defaultW: 6,
        defaultH: 2,
        defaultProps: { min: 0, max: 100, color: 'primary' },
      },
      { type: 'v-radio-group', label: 'Radio Group', defaultW: 4, defaultH: 3 },
      {
        type: 'v-btn',
        label: 'Button',
        defaultW: 3,
        defaultH: 1,
        defaultProps: { text: 'Button', color: 'primary', variant: 'tonal' },
      },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    icon: 'mdi-image-outline',
    components: [
      {
        type: 'v-avatar',
        label: 'Avatar',
        defaultW: 2,
        defaultH: 2,
        defaultProps: { size: 64, color: 'primary' },
      },
      {
        type: 'v-icon',
        label: 'Icon',
        defaultW: 2,
        defaultH: 2,
        defaultProps: { icon: 'mdi-star-outline', size: 36, color: 'primary' },
      },
      {
        type: 'v-img',
        label: 'Image',
        defaultW: 6,
        defaultH: 4,
        defaultProps: { src: '', cover: true },
      },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: 'mdi-bell-outline',
    components: [
      {
        type: 'v-alert',
        label: 'Alert',
        defaultW: 7,
        defaultH: 2,
        defaultProps: { type: 'info', text: 'Alert message', variant: 'tonal' },
      },
      {
        type: 'v-badge',
        label: 'Badge',
        defaultW: 2,
        defaultH: 2,
        defaultProps: { content: '1', color: 'primary' },
      },
      {
        type: 'ws-progress',
        label: 'Progress',
        defaultW: 4,
        defaultH: 2,
        defaultProps: { variant: 'circular', modelValue: 75, color: 'primary' },
      },
      {
        type: 'v-rating',
        label: 'Rating',
        defaultW: 5,
        defaultH: 1,
        defaultProps: { modelValue: 3, color: 'amber' },
      },
    ],
  },
  {
    id: 'display',
    label: 'Display',
    icon: 'mdi-table-large',
    components: [
      { type: 'v-table', label: 'Table', defaultW: 10, defaultH: 5 },
      {
        type: 'v-data-table',
        label: 'Data Table',
        defaultW: 12,
        defaultH: 6,
        defaultProps: { items: [], headers: [] },
      },
      {
        type: 'v-sparkline',
        label: 'Sparkline',
        defaultW: 6,
        defaultH: 3,
        defaultProps: { modelValue: [1, 3, 2, 5, 4, 7, 6], color: 'primary' },
      },
    ],
  },
  {
    id: 'selection',
    label: 'Selection',
    icon: 'mdi-cursor-default-click-outline',
    components: [
      {
        type: 'v-btn-toggle',
        label: 'Toggle',
        defaultW: 5,
        defaultH: 1,
        defaultProps: { color: 'primary', variant: 'outlined' },
      },
      {
        type: 'v-chip-group',
        label: 'Chip Group',
        defaultW: 7,
        defaultH: 1,
        defaultProps: { color: 'primary' },
      },
      { type: 'v-stepper', label: 'Stepper', defaultW: 10, defaultH: 4 },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: 'mdi-compass-outline',
    components: [
      {
        type: 'v-tabs',
        label: 'Tabs',
        defaultW: 8,
        defaultH: 2,
        defaultProps: { color: 'primary' },
      },
      {
        type: 'v-breadcrumbs',
        label: 'Breadcrumbs',
        defaultW: 6,
        defaultH: 1,
        defaultProps: { items: ['Home', 'Page'] },
      },
    ],
  },
  {
    id: 'layouts',
    label: 'Layouts',
    icon: 'mdi-view-grid-outline',
    components: [{ type: 'v-container', label: 'Grid', defaultW: 12, defaultH: 6 }],
  },
]

export const GRID_COLS = 17
export const PPI = 150

export const dimensionPresets = [
  { title: 'A4 Paper', value: 'a4' },
  { title: 'Letter Paper', value: 'letter' },
  { title: 'Note Cards', value: 'notecard' },
  { title: 'Playing Cards', value: 'playingcard' },
  { title: 'Custom', value: 'custom' },
]

export const dimensionMap: Record<string, { width: number; height: number }> = {
  a4: { width: 8.27, height: 11.69 },
  letter: { width: 8.5, height: 11 },
  notecard: { width: 5, height: 3 },
  playingcard: { width: 3.5, height: 5.5 },
}

export const availableTags = [
  'Character Sheet',
  'NPC Sheet',
  'Civilization Sheet',
  'Item',
  'Spell',
  'Encounter',
  'Map',
  'Custom',
]
