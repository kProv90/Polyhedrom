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

// ── Property panel schemas ────────────────────────────────────────────────────

export interface PropSchema {
  key: string
  label: string
  type: 'text' | 'number' | 'boolean' | 'select'
  options?: string[]
  description?: string
}

const VARIANT_OPTIONS = ['flat', 'tonal', 'outlined', 'text', 'plain', 'elevated']
const DENSITY_OPTIONS = ['default', 'comfortable', 'compact']
const SIZE_OPTIONS = ['x-small', 'small', 'default', 'large', 'x-large']
const COLOR_OPTIONS = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
const ROUNDED_OPTIONS = ['0', 'sm', 'md', 'lg', 'xl', 'pill']

export const componentPropSchemas: Record<string, PropSchema[]> = {
  'v-text-field': [
    { key: 'label', label: 'Label', type: 'text', description: 'Text label shown above the field' },
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'text',
      description: 'Hint text inside the field when empty',
    },
    { key: 'variant', label: 'Variant', type: 'select', options: VARIANT_OPTIONS },
    { key: 'density', label: 'Density', type: 'select', options: DENSITY_OPTIONS },
    {
      key: 'clearable',
      label: 'Clearable',
      type: 'boolean',
      description: 'Show a clear button when field has a value',
    },
    {
      key: 'hint',
      label: 'Hint',
      type: 'text',
      description: 'Help text displayed below the field',
    },
  ],
  'v-textarea': [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'placeholder', label: 'Placeholder', type: 'text' },
    { key: 'variant', label: 'Variant', type: 'select', options: VARIANT_OPTIONS },
    { key: 'density', label: 'Density', type: 'select', options: DENSITY_OPTIONS },
    { key: 'rows', label: 'Rows', type: 'number', description: 'Number of visible text rows' },
    { key: 'clearable', label: 'Clearable', type: 'boolean' },
  ],
  'v-select': [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'variant', label: 'Variant', type: 'select', options: VARIANT_OPTIONS },
    { key: 'density', label: 'Density', type: 'select', options: DENSITY_OPTIONS },
    { key: 'clearable', label: 'Clearable', type: 'boolean' },
  ],
  'v-checkbox': [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    {
      key: 'indeterminate',
      label: 'Indeterminate',
      type: 'boolean',
      description: 'Show a mixed/partial state',
    },
  ],
  'v-switch': [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
  ],
  'v-slider': [
    { key: 'min', label: 'Min', type: 'number' },
    { key: 'max', label: 'Max', type: 'number' },
    { key: 'step', label: 'Step', type: 'number' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
  ],
  'v-btn': [
    { key: 'text', label: 'Text', type: 'text', description: 'Button label' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    { key: 'variant', label: 'Variant', type: 'select', options: VARIANT_OPTIONS },
    { key: 'size', label: 'Size', type: 'select', options: SIZE_OPTIONS },
    { key: 'rounded', label: 'Rounded', type: 'select', options: ROUNDED_OPTIONS },
    {
      key: 'prepend-icon',
      label: 'Prepend Icon',
      type: 'text',
      description: 'MDI icon before label, e.g. mdi-plus',
    },
    { key: 'append-icon', label: 'Append Icon', type: 'text', description: 'MDI icon after label' },
  ],
  'v-card': [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: ['flat', 'tonal', 'outlined', 'elevated'],
    },
    { key: 'elevation', label: 'Elevation', type: 'number' },
  ],
  'v-sheet': [
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    { key: 'rounded', label: 'Rounded', type: 'select', options: ROUNDED_OPTIONS },
    { key: 'border', label: 'Border', type: 'boolean' },
    { key: 'elevation', label: 'Elevation', type: 'number' },
  ],
  'v-chip': [
    { key: 'text', label: 'Text', type: 'text' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    { key: 'variant', label: 'Variant', type: 'select', options: VARIANT_OPTIONS },
    { key: 'size', label: 'Size', type: 'select', options: SIZE_OPTIONS },
    { key: 'closable', label: 'Closable', type: 'boolean' },
  ],
  'v-alert': [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'text', label: 'Text', type: 'text' },
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
    { key: 'variant', label: 'Variant', type: 'select', options: VARIANT_OPTIONS },
    { key: 'closable', label: 'Closable', type: 'boolean' },
  ],
  'v-avatar': [
    { key: 'size', label: 'Size', type: 'number' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    { key: 'image', label: 'Image URL', type: 'text' },
    { key: 'icon', label: 'Icon', type: 'text', description: 'MDI icon name, e.g. mdi-account' },
    { key: 'rounded', label: 'Rounded', type: 'select', options: ROUNDED_OPTIONS },
  ],
  'v-icon': [
    { key: 'icon', label: 'Icon', type: 'text', description: 'MDI icon name, e.g. mdi-star' },
    { key: 'size', label: 'Size', type: 'number' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
  ],
  'v-img': [
    { key: 'src', label: 'Source URL', type: 'text' },
    {
      key: 'cover',
      label: 'Cover',
      type: 'boolean',
      description: 'Fill the container without stretching',
    },
    { key: 'aspect-ratio', label: 'Aspect Ratio', type: 'number' },
    { key: 'alt', label: 'Alt Text', type: 'text' },
  ],
  'v-rating': [
    { key: 'color', label: 'Color', type: 'select', options: ['amber', ...COLOR_OPTIONS] },
    { key: 'size', label: 'Size', type: 'select', options: SIZE_OPTIONS },
    { key: 'length', label: 'Length', type: 'number', description: 'Number of rating stars' },
  ],
  'v-badge': [
    { key: 'content', label: 'Content', type: 'text', description: 'Text shown in the badge' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
  ],
  'ws-progress': [
    { key: 'variant', label: 'Variant', type: 'select', options: ['circular', 'linear'] },
    { key: 'modelValue', label: 'Value', type: 'number', description: 'Progress value (0–100)' },
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
  ],
  'v-tabs': [
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    { key: 'density', label: 'Density', type: 'select', options: DENSITY_OPTIONS },
    { key: 'grow', label: 'Grow', type: 'boolean', description: 'Tabs fill the full width' },
  ],
  'v-btn-toggle': [
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    { key: 'variant', label: 'Variant', type: 'select', options: VARIANT_OPTIONS },
    { key: 'density', label: 'Density', type: 'select', options: DENSITY_OPTIONS },
    { key: 'divided', label: 'Divided', type: 'boolean' },
  ],
  'v-chip-group': [
    { key: 'color', label: 'Color', type: 'select', options: COLOR_OPTIONS },
    { key: 'variant', label: 'Variant', type: 'select', options: VARIANT_OPTIONS },
  ],
}
