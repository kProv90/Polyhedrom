<template>
  <div class="fr-filters d-flex flex-column">
    <div class="pa-4 pb-2">

      <v-text-field
        :model-value="filters.search"
        placeholder="Search threads..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        variant="outlined"
        hide-details
        class="mb-4"
        @update:model-value="emit('update:filters', { ...filters, search: $event })" />

      <div class="text-caption text-medium-emphasis text-uppercase mb-2 font-weight-bold">Category</div>
      <v-list density="compact" class="pa-0 mb-3">
        <v-list-item
          v-for="cat in CATEGORIES"
          :key="cat.value"
          :active="filters.category === cat.value"
          color="secondary"
          rounded="lg"
          class="mb-1"
          @click="emit('update:filters', { ...filters, category: cat.value })">
          <template #prepend>
            <v-icon :icon="cat.icon" size="18" class="mr-2" />
          </template>
          <v-list-item-title class="text-body-2">{{ cat.label }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider class="mb-3" />

      <div class="text-caption text-medium-emphasis text-uppercase mb-2 font-weight-bold">Sort By</div>
      <v-select
        :model-value="filters.sortBy"
        :items="SORT_OPTIONS"
        density="compact"
        variant="outlined"
        hide-details
        class="mb-3"
        @update:model-value="emit('update:filters', { ...filters, sortBy: $event })" />

      <v-divider class="mb-3" />

      <div class="text-caption text-medium-emphasis text-uppercase mb-2 font-weight-bold">Show</div>
      <v-list density="compact" class="pa-0">
        <v-list-item rounded="lg" class="mb-1 px-2">
          <template #prepend>
            <v-icon size="18" class="mr-2">mdi-pin-outline</v-icon>
          </template>
          <v-list-item-title class="text-body-2">Pinned Only</v-list-item-title>
          <template #append>
            <v-switch
              :model-value="filters.showPinned"
              density="compact"
              hide-details
              color="secondary"
              @update:model-value="emit('update:filters', { ...filters, showPinned: !!$event })" />
          </template>
        </v-list-item>
        <v-list-item rounded="lg" class="px-2">
          <template #prepend>
            <v-icon size="18" class="mr-2">mdi-lock-outline</v-icon>
          </template>
          <v-list-item-title class="text-body-2">Include Locked</v-list-item-title>
          <template #append>
            <v-switch
              :model-value="filters.showLocked"
              density="compact"
              hide-details
              color="secondary"
              @update:model-value="emit('update:filters', { ...filters, showLocked: !!$event })" />
          </template>
        </v-list-item>
      </v-list>

    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES, SORT_OPTIONS } from './constants'

defineProps<{ filters: FrFiltersState }>()
const emit = defineEmits<{ 'update:filters': [value: FrFiltersState] }>()
</script>

<style scoped>
.fr-filters {
  width: 260px;
  min-width: 260px;
  height: 100%;
  background: rgb(var(--v-theme-surface));
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>
