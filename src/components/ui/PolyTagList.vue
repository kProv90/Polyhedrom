<template>
  <v-combobox
    :model-value="modelValue"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :density="density"
    :disabled="disabled"
    :hide-details="hideDetails"
    :menu-props="{ maxHeight: 200 }"
    variant="outlined"
    multiple
    chips
    closable-chips
    class="poly-tag-list"
    @update:model-value="onUpdate" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    items?: string[]
    label?: string
    placeholder?: string
    density?: 'default' | 'comfortable' | 'compact'
    disabled?: boolean
    hideDetails?: boolean | 'auto'
    maxTags?: number
  }>(),
  {
    modelValue: () => [],
    items: () => [],
    density: 'default',
    hideDetails: false,
    maxTags: 3,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

function capitalize(s: string): string {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function onUpdate(val: string[]) {
  const capped = val.slice(0, props.maxTags).map(capitalize)
  emit('update:modelValue', capped)
}
</script>

<style scoped lang="scss">
// Keep chips on a single scrollable row so the field doesn't grow multi-line
.poly-tag-list {
  :deep(.v-field__appendInner) {
    display: none;
  }
  :deep(.v-field__input) {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
