<template>
  <v-card
    class="d-flex flex-column align-center justify-center pa-2 fill-height"
    style="min-width: 105px"
    elevation="0"
    color="transparent"
    variant="flat"
    hover
    :ripple="false"
    @click="$emit('click', item)"
    @dblclick="$emit('dblclick', item)">
    <v-img
      v-if="isImage"
      :src="imageUrl"
      width="64"
      height="64"
      cover
      class="mb-2 rounded"></v-img>
    <v-icon
      v-else
      :icon="item.icon"
      size="64"
      :color="item.type === 'folder' ? 'accent' : 'grey-darken-1'"
      class="mb-2"></v-icon>
    <div
      :class="textClasses"
      style="
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
      ">
      {{ item.title }}
    </div>
    <v-tooltip
      activator="parent"
      location="bottom"
      open-delay="500">
      {{ item.title }}
    </v-tooltip>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  item: VdNode
  selected?: boolean
}>()

const isImage = computed(() => {
  if (props.item.type !== 'file') return false
  const fileData = (props.item as VdFile).file
  return fileData.mimeType?.startsWith('image/')
})

const imageUrl = computed(() => {
  if (!isImage.value) return ''
  // Use ref as URL based on type definition
  return (props.item as VdFile).ref || ''
})

const textClasses = computed(() => {
  if (props.selected) {
    return ['text-caption', 'text-center', 'pl-2', 'pr-2', 'rounded', 'bg-accent']
  } else {
    return ['text-caption', 'text-center']
  }
})

defineEmits<{
  (e: 'click', item: VdNode): void
  (e: 'dblclick', item: VdNode): void
}>()
</script>
