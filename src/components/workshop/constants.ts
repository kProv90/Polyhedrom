const componentIcons: Record<string, string> = {
  'v-text-field': 'mdi-form-textbox',
  'v-btn': 'mdi-gesture-tap-button',
  'v-checkbox': 'mdi-checkbox-marked',
  'v-select': 'mdi-form-select',
  'v-textarea': 'mdi-text-box-outline',
  'v-sheet': 'mdi-square-outline',
  'v-card': 'mdi-card-outline',
  'v-avatar': 'mdi-account-circle-outline',
  'v-icon': 'mdi-emoticon-outline',
  'v-img': 'mdi-image-outline',
}

const GRID_COLS = 17
const PPI = 150

const dimensionPresets = [
  { title: 'A4 Paper', value: 'a4' },
  { title: 'Letter Paper', value: 'letter' },
  { title: 'Note Cards', value: 'notecard' },
  { title: 'Playing Cards', value: 'playingcard' },
  { title: 'Custom', value: 'custom' },
]

const dimensionMap: Record<string, { width: number; height: number }> = {
  a4: { width: 8.27, height: 11.69 },
  letter: { width: 8.5, height: 11 },
  notecard: { width: 5, height: 3 },
  playingcard: { width: 3.5, height: 5.5 },
}

const availableTags = [
  'Character Sheet',
  'NPC Sheet',
  'Civilization Sheet',
  'Item',
  'Spell',
  'Encounter',
  'Map',
  'Custom',
]

export { componentIcons, GRID_COLS, PPI, dimensionPresets, dimensionMap, availableTags }
