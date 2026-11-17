<template>
  <div
    v-if="workshop.hasSelectedControl && ctrl"
    ref="overlayRef"
    class="ws-select"
    :style="overlayStyle">
    <!-- 8 resize handles -->
    <div
      v-for="handle in handles"
      :key="handle.name"
      class="ws-select__handle"
      :class="`ws-select__handle--${handle.name}`"
      :style="handle.style" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'
import interact from 'interactjs'
import { useWorkshopStore } from '@/stores/workshopStore'
import { PPI, dimensionMap } from './constants'

const workshop = useWorkshopStore()

const overlayRef = ref<HTMLElement | null>(null)

const ctrl = computed(() => workshop.selectedControlData)

const canvasDims = computed(() => {
  const d = workshop.currentTemplate?.dimensions
  if (!d) return dimensionMap['letter']
  if (typeof d === 'object') return d
  return dimensionMap[d] ?? dimensionMap['letter']
})
const canvasW = computed(() => Math.round(canvasDims.value.width * PPI))
const canvasH = computed(() => Math.round(canvasDims.value.height * PPI))

const local = ref({ x: 0, y: 0, w: 0, h: 0 })

watch(
  ctrl,
  (c) => {
    if (c) local.value = { x: c.x, y: c.y, w: c.w, h: c.h }
  },
  { immediate: true }
)

const overlayStyle = computed(() => ({
  left: `${local.value.x}px`,
  top: `${local.value.y}px`,
  width: `${local.value.w}px`,
  height: `${local.value.h}px`,
}))

const handles = [
  { name: 'nw', style: { top: '0%', left: '0%', cursor: 'nw-resize' } },
  { name: 'n', style: { top: '0%', left: '50%', cursor: 'n-resize' } },
  { name: 'ne', style: { top: '0%', left: '100%', cursor: 'ne-resize' } },
  { name: 'e', style: { top: '50%', left: '100%', cursor: 'e-resize' } },
  { name: 'se', style: { top: '100%', left: '100%', cursor: 'se-resize' } },
  { name: 's', style: { top: '100%', left: '50%', cursor: 's-resize' } },
  { name: 'sw', style: { top: '100%', left: '0%', cursor: 'sw-resize' } },
  { name: 'w', style: { top: '50%', left: '0%', cursor: 'w-resize' } },
]

function clampX(x: number, w: number) {
  return Math.max(0, Math.min(x, canvasW.value - w))
}
function clampY(y: number, h: number) {
  return Math.max(0, Math.min(y, canvasH.value - h))
}

const MIN_W = 40
const MIN_H = 20

let interactInstance: ReturnType<typeof interact> | null = null

function setupInteract(el: HTMLElement) {
  interactInstance = interact(el)
    .draggable({
      listeners: {
        move(event) {
          const s = workshop.canvasScale
          local.value.x += event.dx / s
          local.value.y += event.dy / s
        },
        end() {
          const c = ctrl.value
          if (!c) return
          const newX = clampX(local.value.x, local.value.w)
          const newY = clampY(local.value.y, local.value.h)
          workshop.updateControlPosition(c.id, newX, newY, local.value.w, local.value.h)
        },
      },
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          const s = workshop.canvasScale
          local.value.x += event.deltaRect.left / s
          local.value.y += event.deltaRect.top / s
          local.value.w = event.rect.width / s
          local.value.h = event.rect.height / s
        },
        end() {
          const c = ctrl.value
          if (!c) return
          const newW = Math.max(MIN_W, local.value.w)
          const newH = Math.max(MIN_H, local.value.h)
          const newX = clampX(local.value.x, newW)
          const newY = clampY(local.value.y, newH)
          workshop.updateControlPosition(c.id, newX, newY, newW, newH)
        },
      },
    })
}

watch(overlayRef, async (el) => {
  interactInstance?.unset()
  interactInstance = null
  if (el) {
    await nextTick()
    setupInteract(el)
  }
})

function onKeyDown(e: KeyboardEvent) {
  if (!workshop.hasSelectedControl) return
  if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault()
    const id = ctrl.value?.id
    if (id) workshop.deleteControl(id)
  } else if (e.key === 'Escape') {
    workshop.clearSelectedControl()
  }
}

window.addEventListener('keydown', onKeyDown)

onUnmounted(() => {
  interactInstance?.unset()
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped lang="scss">
.ws-select {
  position: absolute;
  box-sizing: border-box;
  border: 2px solid rgb(var(--v-theme-primary));
  pointer-events: all;
  cursor: move;
  z-index: 10;

  &__handle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: rgb(var(--v-theme-primary));
    border: 2px solid white;
    border-radius: 2px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
}
</style>
