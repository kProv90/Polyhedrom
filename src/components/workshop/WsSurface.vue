<template>
  <div
    class="ws-surface-paper"
    :style="{ width: `${widthPx}px`, height: `${heightPx}px` }"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWorkshopStore } from '@/stores/workshopStore'
import { PPI, dimensionMap } from './constants'

const workshop = useWorkshopStore()

const dims = computed(() => {
  const d = workshop.currentTemplate?.dimensions
  if (!d) return dimensionMap['letter']
  if (typeof d === 'object') return d
  return dimensionMap[d] ?? dimensionMap['letter']
})

const widthPx = computed(() => Math.round((dims.value?.width ?? 8.5) * PPI))
const heightPx = computed(() => Math.round((dims.value?.height ?? 11) * PPI))
</script>

<style scoped lang="scss">
.ws-surface-paper {
  position: relative;
  flex-shrink: 0;
  background-color: rgb(var(--v-theme-surface));
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}
</style>
