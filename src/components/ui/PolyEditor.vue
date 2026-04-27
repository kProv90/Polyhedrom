<template>
  <div
    class="poly-editor v-field v-field--variant-outlined d-flex"
    :class="{
      'v-field--disabled': disabled || readonly,
      'v-field--focused': isFocused,
    }">
    <div style="flex: 1">
      <div ref="editorRef" />
    </div>
    <div class="v-field__outline">
      <div class="v-field__outline__start" />
      <div class="v-field__outline__end" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import DOMPurify from 'dompurify'

// ─── Props & Emits ───────────────────────────────────────────────────────────

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    readonly?: boolean
    disabled?: boolean
    minHeight?: string
    maxHeight?: string
  }>(),
  {
    modelValue: '',
    placeholder: 'Start writing...',
    minHeight: '220px',
    maxHeight: '220px',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: []
  blur: []
}>()

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_TAGS = [
  'p',
  'br',
  'span',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'em',
  'u',
  's',
  'ul',
  'ol',
  'li',
  'blockquote',
  'pre',
  'code',
  'a',
  'img',
  'table',
  'thead',
  'tbody',
  'tr',
  'td',
  'th',
  'hr',
]

const ALLOWED_ATTR = [
  'href',
  'target',
  'rel',
  'src',
  'alt',
  'width',
  'height',
  'class',
  'style',
  'colspan',
  'rowspan',
]

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'link', 'image'],
  ['code-block', { color: [] }, { background: [] }],
]

// ─── State ────────────────────────────────────────────────────────────────────

const editorRef = ref<HTMLElement>()
let quill: Quill | null = null
let lastEmit = props.modelValue
const isFocused = ref(false)

const contentStyle = computed(() => ({
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
  overflow: props.maxHeight ? 'auto' : undefined,
}))

// ─── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(() => {
  if (!editorRef.value) return

  quill = new Quill(editorRef.value, {
    theme: 'snow',
    readOnly: props.readonly || props.disabled,
    placeholder: props.placeholder,
    modules: {
      toolbar: TOOLBAR_OPTIONS,
      history: { delay: 1000, maxStack: 100, userOnly: true },
    },
  })

  // Apply min/max height to the content area
  const editor = editorRef.value.querySelector('.ql-editor') as HTMLElement | null
  if (editor) {
    if (props.minHeight) editor.style.minHeight = props.minHeight
    if (props.maxHeight) {
      editor.style.maxHeight = props.maxHeight
      editor.style.overflow = 'auto'
    }
  }

  if (props.modelValue) {
    quill.clipboard.dangerouslyPasteHTML(props.modelValue)
  }

  quill.on('text-change', () => {
    const html = sanitize(quill!.root.innerHTML)
    const val = quill!.getText().trim() === '' ? '' : html
    if (val !== lastEmit) {
      lastEmit = val
      emit('update:modelValue', val)
    }
  })

  quill.on('selection-change', (range) => {
    if (range === null) {
      isFocused.value = false
      emit('blur')
    } else {
      isFocused.value = true
      emit('focus')
    }
  })
})

onBeforeUnmount(() => {
  quill = null
})

// ─── Watchers ─────────────────────────────────────────────────────────────────

watch(
  () => props.modelValue,
  (v) => {
    if (!quill || v === lastEmit) return
    const sel = quill.getSelection()
    quill.clipboard.dangerouslyPasteHTML(v ?? '')
    if (sel) quill.setSelection(sel)
  }
)

watch(
  () => props.readonly,
  (v) => {
    quill?.enable(!v && !props.disabled)
  }
)

watch(
  () => props.disabled,
  (v) => {
    quill?.enable(!v && !props.readonly)
  }
)

// ─── Sanitize ─────────────────────────────────────────────────────────────────

function sanitize(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  })
}

// contentStyle is used to drive the wrapper div if needed in future
void contentStyle
</script>

<style scoped lang="scss">
.poly-editor {
  width: 100%;

  &.v-field--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  // ─── Toolbar ───────────────────────────────────────────────────────────────

  :deep(.ql-toolbar) {
    border: none;
    border-bottom: thin solid rgba(var(--v-theme-on-surface), 0.38);
    border-radius: 4px 4px 0 0;
    background: rgb(var(--v-theme-surface));
    padding: 0;
    display: flex;
    align-items: stretch;

    // Group separators — full height border between groups
    .ql-formats {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      margin: 0 !important;
      border-right: thin solid rgba(var(--v-theme-on-surface), 0.38);

      &:last-child {
        border-right: none;
      }
    }

    // SVG icon strokes & fills
    .ql-stroke {
      stroke: rgba(var(--v-theme-on-surface), 0.7);
    }
    .ql-fill,
    .ql-stroke.ql-fill {
      fill: rgba(var(--v-theme-on-surface), 0.7);
    }
    .ql-thin,
    .ql-stroke.ql-thin {
      stroke: rgba(var(--v-theme-on-surface), 0.7);
    }

    // Picker labels (header, font, size dropdowns)
    .ql-picker-label {
      color: rgba(var(--v-theme-on-surface), 0.7);
      &::before {
        color: rgba(var(--v-theme-on-surface), 0.7);
      }
    }

    // Hover & active states
    button:hover,
    button:focus,
    button.ql-active,
    .ql-picker-label:hover,
    .ql-picker-label.ql-active,
    .ql-picker-item:hover,
    .ql-picker-item.ql-selected {
      color: rgb(var(--v-theme-primary));
      .ql-stroke {
        stroke: rgb(var(--v-theme-primary));
      }
      .ql-fill {
        fill: rgb(var(--v-theme-primary));
      }
    }
  }

  // ─── Container ─────────────────────────────────────────────────────────────

  :deep(.ql-container) {
    width: 100%;
    border: none;
    border-radius: 0 0 4px 4px;
    font-size: inherit;
    font-family: inherit;
    background: rgb(var(--v-theme-surface));
    color: rgb(var(--v-theme-on-surface));
  }

  :deep(.ql-editor) {
    color: rgb(var(--v-theme-on-surface));
    overflow-y: auto;

    &.ql-blank::before {
      color: rgba(var(--v-theme-on-surface), 0.4);
      font-style: normal;
    }

    // Blockquote
    blockquote {
      border-left-color: rgba(var(--v-border-color), calc(var(--v-border-opacity) * 3));
      color: rgba(var(--v-theme-on-surface), 0.7);
    }

    // Code blocks
    pre.ql-syntax,
    code {
      background: rgba(var(--v-theme-on-surface), 0.06);
      color: rgb(var(--v-theme-on-surface));
      border-radius: 4px;
    }
  }

  // ─── Dropdown menus ────────────────────────────────────────────────────────

  :deep(.ql-picker-options) {
    background: rgb(var(--v-theme-surface));
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    .ql-picker-item {
      color: rgb(var(--v-theme-on-surface));
    }
  }

  // ─── Tooltip (link editor) ─────────────────────────────────────────────────

  :deep(.ql-tooltip) {
    background: rgb(var(--v-theme-surface));
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: rgb(var(--v-theme-on-surface));

    input[type='text'] {
      background: transparent;
      border-color: rgba(var(--v-border-color), calc(var(--v-border-opacity) * 3));
      color: rgb(var(--v-theme-on-surface));
      border-radius: 2px;
      outline: none;
    }

    a.ql-action,
    a.ql-remove {
      color: rgb(var(--v-theme-primary));
      &::before {
        border-right-color: rgba(var(--v-border-color), calc(var(--v-border-opacity) * 3));
      }
    }
  }
}
</style>
