<template>
  <transition name="mg-drawer">
    <div v-if="modelValue" class="mg-pinned-drawer d-flex flex-column">

      <div class="mg-pinned-header d-flex align-center pa-3">
        <v-icon icon="mdi-pin" class="mr-2" color="secondary" size="18" />
        <span class="text-body-2 font-weight-bold">Pinned</span>
        <v-spacer />
        <v-btn icon="mdi-close" size="x-small" variant="text" @click="$emit('update:modelValue', false)" />
      </div>

      <v-divider />

      <div class="mg-pinned-list flex-grow-1">
        <div
          v-for="pin in pinned"
          :key="pin.id"
          class="pa-3 mg-pinned-item d-flex align-start"
          style="gap: 10px">
          <v-icon icon="mdi-pin" size="14" color="secondary" class="mt-1 flex-shrink-0" />
          <div>
            <div class="text-caption text-medium-emphasis mb-1">{{ pin.author }} · {{ pin.time }}</div>
            <div class="text-body-2">{{ pin.text }}</div>
          </div>
        </div>
        <div v-if="!pinned.length" class="pa-4 text-center text-caption text-medium-emphasis">
          No pinned messages
        </div>
      </div>

    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  pinned: PinnedMessage[]
}>()

defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<style scoped>
.mg-pinned-drawer {
  width: 260px;
  min-width: 260px;
  height: 100%;
  background: rgb(var(--v-theme-surface));
  border-left: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  overflow: hidden;
}

.mg-pinned-header {
  background: rgba(var(--v-theme-secondary), 0.08);
  min-height: 56px;
}

.mg-pinned-list {
  overflow-y: auto;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--v-theme-secondary), 0.4) transparent;
}

.mg-pinned-list::-webkit-scrollbar {
  width: 4px;
}

.mg-pinned-list::-webkit-scrollbar-track {
  background: transparent;
}

.mg-pinned-list::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-secondary), 0.4);
  border-radius: 4px;
}

.mg-pinned-item {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  &:last-child { border-bottom: none; }
}

.mg-drawer-enter-active,
.mg-drawer-leave-active {
  transition: width 0.2s ease, min-width 0.2s ease, opacity 0.2s ease;
  overflow: hidden;
}
.mg-drawer-enter-from,
.mg-drawer-leave-to {
  width: 0;
  min-width: 0;
  opacity: 0;
}
.mg-drawer-enter-to,
.mg-drawer-leave-from {
  width: 260px;
  min-width: 260px;
  opacity: 1;
}
</style>
