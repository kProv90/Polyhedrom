<template>
  <div
    class="ws-control"
    :style="wrapperStyle"
    @click.stop="onClick">
    <!-- Edit mode: placeholder representation -->
    <template v-if="!workshop.previewMode">
      <div class="ws-control__placeholder">
        <v-icon
          :icon="controlIcon"
          size="18"
          class="mb-1" />
        <span class="ws-control__label">{{ control.name }}</span>
      </div>
    </template>

    <!-- Preview mode: live Vuetify component -->
    <template v-else>
      <component
        :is="control.componentType"
        v-bind="control.props ?? {}"
        :style="{ width: '100%', height: '100%', ...control.style }" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWorkshopStore } from '@/stores/workshopStore'
import { componentIconMap } from './constants'

const props = defineProps<{ control: WorkshopControl }>()

const workshop = useWorkshopStore()

const wrapperStyle = computed(() => ({
  left: `${props.control.x}px`,
  top: `${props.control.y}px`,
  width: `${props.control.w}px`,
  height: `${props.control.h}px`,
}))

const controlIcon = computed(
  () => componentIconMap[props.control.componentType] ?? 'mdi-puzzle-outline'
)

function onClick() {
  if (!workshop.previewMode) {
    workshop.selectControl(props.control.id)
  }
}
</script>

<style scoped lang="scss">
.ws-control {
  position: absolute;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 2px;

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(var(--v-theme-primary), 0.06);
    border: 1px dashed rgba(var(--v-theme-primary), 0.35);
    border-radius: 2px;
    overflow: hidden;
    padding: 4px;
  }

  &__label {
    font-size: 0.65rem;
    line-height: 1.2;
    text-align: center;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.7;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
