<template>
  <div class="workshop-surface">
    <!-- Grid Container with vue-grid-layout -->
    <GridLayout
      :layout="workshopStore.gridLayoutItems"
      :col-num="GRID_COLS"
      :row-height="CELL_SIZE"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :margin="[1, 1]"
      :use-css-transforms="true"
      :style="gridStyle"
      class="grid-container"
      @layout-updated="onLayoutUpdated">
      <!-- Rendered controls -->
      <GridItem
        v-for="item in workshopStore.gridLayoutItems"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        class="grid-control"
        :class="{ selected: workshopStore.selectedControlId === item.i }"
        @click="selectControl(item.i)">
        <div class="control-content">
          <!-- Render actual component type icon -->
          <span class="control-label">{{ item._control?.name || item.i }}</span>
          <span class="control-type">{{ item._control?.componentType || 'Unknown' }}</span>
        </div>
      </GridItem>
    </GridLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GridLayout, GridItem } from 'vue-grid-layout-v3'
import { useWorkshopStore } from '@/stores/workshopStore'

interface GridDimensions {
  widthPx: number
  heightPx: number
  cellSize: number
  rows: number
}

// Props
const props = defineProps<{
  gridDimensions: GridDimensions
  gridCols: number
}>()

const workshopStore = useWorkshopStore()

// Grid dimensions
const GRID_COLS = props.gridCols
const CELL_SIZE = computed(() => props.gridDimensions.cellSize)

// Computed grid style
const gridStyle = computed(() => ({
  width: `${props.gridDimensions.widthPx}px`,
  height: `${props.gridDimensions.heightPx}px`,
}))

// Handle layout changes from vue-grid-layout
const onLayoutUpdated = (newLayout: any[]) => {
  // Update all control positions in the store
  newLayout.forEach((item) => {
    workshopStore.updateControlPosition(item.i, item.x, item.y, item.w, item.h)
  })
}

// Select a control and update store
const selectControl = (controlId: string) => {
  workshopStore.selectControl(controlId)
}

// Method to add a sample control (for testing)

// Export for parent component to use
</script>

<style scoped lang="scss">
.workshop-surface {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgb(var(--v-theme-background));
  position: relative;
}

.grid-container {
  position: relative;
  background-color: #fefdfb;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.12),
    0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  overflow: hidden;
}

.grid-control {
  background-color: rgba(var(--v-theme-primary-rgb), 0.1);
  border: 2px solid rgb(var(--v-theme-primary));
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  position: relative;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(var(--v-theme-primary-rgb), 0.15);
    box-shadow: 0 4px 12px rgba(var(--v-theme-primary-rgb), 0.2);
  }

  &.selected {
    border-color: rgb(var(--v-theme-secondary));
    background-color: rgba(var(--v-theme-secondary-rgb), 0.15);
    box-shadow: 0 0 0 2px rgba(var(--v-theme-secondary-rgb), 0.3);
  }

  &.vue-grid-placeholder {
    background-color: rgba(var(--v-theme-secondary-rgb), 0.3);
    border: 2px dashed rgb(var(--v-theme-secondary));
    opacity: 0.8;
  }
}

.control-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
  height: 100%;
  font-size: 0.75rem;
  text-align: center;
  color: rgb(var(--v-theme-primary));
  pointer-events: none;

  .selected & {
    color: rgb(var(--v-theme-secondary));
  }
}

.control-label {
  font-weight: 600;
  word-break: break-all;
  line-height: 1.1;
}

.control-type {
  font-size: 0.6rem;
  opacity: 0.7;
  font-weight: 400;
}

.add-control-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 20;
}

// Vue Grid Layout styles
:deep(.vue-grid-layout) {
  background: #ffffee;
}

:deep(.vue-grid-item) {
  touch-action: auto;

  &:not(.vue-grid-placeholder) {
    transition: all 50ms ease;
  }
}

:deep(.vue-grid-item.vue-grid-placeholder) {
  background: rgba(var(--v-theme-secondary-rgb), 0.3);
  border: 2px dashed rgb(var(--v-theme-secondary));
  border-radius: 4px;
}

:deep(.vue-grid-item.resizing) {
  opacity: 0.9;
  z-index: 100;
}

:deep(.vue-grid-item.static) {
  background: rgba(var(--v-theme-outline-rgb), 0.05);
}

:deep(.vue-grid-item.text) {
  font-size: 1.2em;
}

:deep(.vue-draggable-handle) {
  float: left;
  width: 60px;
  height: 60px;
  top: 0;
  left: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="5" fill="%23999"/></svg>')
    no-repeat;
  background-position: middle;
  cursor: pointer;
}

// Resize handle styling - theme aware
:deep(.vue-grid-resizing-handle) {
  background-color: rgb(var(--v-theme-on-surface));
}
</style>
