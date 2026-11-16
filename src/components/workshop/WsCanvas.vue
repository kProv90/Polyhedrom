<template>
  <div
    ref="viewportRef"
    class="ws-canvas-viewport">
    <div
      class="ws-canvas-scaler"
      :style="scalerStyle">
      <div
        ref="paperRef"
        class="ws-canvas-paper"
        :style="paperStyle"
        @click="workshop.clearSelectedControl()">
        <!-- Controls -->
        <WsControl
          v-for="ctrl in workshop.controlsList"
          :key="ctrl.id"
          :control="ctrl" />

        <!-- Selection overlay -->
        <WsSelect />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useWorkshopStore } from '@/stores/workshopStore'
import { PPI, dimensionMap } from './constants'
import WsControl from './WsControl.vue'
import WsSelect from './WsSelect.vue'

const workshop = useWorkshopStore()

const viewportRef = ref<HTMLElement | null>(null)
const paperRef = ref<HTMLElement | null>(null)
const viewportSize = ref({ w: 0, h: 0 })

const dims = computed(() => {
  const d = workshop.currentTemplate?.dimensions
  if (!d) return dimensionMap['letter']
  if (typeof d === 'object') return d
  return dimensionMap[d] ?? dimensionMap['letter']
})

const widthPx = computed(() => Math.round(dims.value.width * PPI))
const heightPx = computed(() => Math.round(dims.value.height * PPI))

const scale = computed(() => {
  if (!viewportSize.value.w || !viewportSize.value.h) return 1
  return Math.min(viewportSize.value.w / widthPx.value, viewportSize.value.h / heightPx.value, 1)
})

const scalerStyle = computed(() => ({
  width: `${Math.round(widthPx.value * scale.value)}px`,
  height: `${Math.round(heightPx.value * scale.value)}px`,
}))

const paperStyle = computed(() => ({
  width: `${widthPx.value}px`,
  height: `${heightPx.value}px`,
  transform: `scale(${scale.value})`,
}))

watch(scale, (s) => workshop.setCanvasScale(s), { immediate: true })

let ro: ResizeObserver | null = null

onMounted(() => {
  ro = new ResizeObserver(([entry]) => {
    viewportSize.value = { w: entry.contentRect.width, h: entry.contentRect.height }
  })
  if (viewportRef.value) ro.observe(viewportRef.value)
})

onUnmounted(() => ro?.disconnect())

defineExpose({ paperRef })
</script>

<style scoped lang="scss">
.ws-canvas-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
}

.ws-canvas-scaler {
  position: relative;
  flex-shrink: 0;
}

.ws-canvas-paper {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
  transform-origin: top left;
}
</style>
