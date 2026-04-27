<template>
  <div class="bz-filters d-flex flex-column">
    <div class="pa-4 pb-2">
      <v-text-field
        :model-value="filters.search"
        placeholder="Search items..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        variant="outlined"
        hide-details
        class="mb-4"
        @update:model-value="emit('update:filters', { ...filters, search: $event })" />

      <div class="text-caption text-medium-emphasis text-uppercase mb-2 font-weight-bold">
        Category
      </div>
      <v-list
        density="compact"
        class="pa-0 mb-3">
        <v-list-item
          v-for="cat in CATEGORIES"
          :key="cat.value"
          :active="filters.category === cat.value"
          color="secondary"
          rounded="lg"
          class="mb-1"
          @click="emit('update:filters', { ...filters, category: cat.value })">
          <template #prepend>
            <v-icon
              :icon="cat.icon"
              size="18"
              class="mr-2" />
          </template>
          <v-list-item-title class="text-body-2">{{ cat.label }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider class="mb-3" />

      <div class="text-caption text-medium-emphasis text-uppercase mb-2 font-weight-bold">
        Price Range
      </div>
      <v-range-slider
        :model-value="filters.priceRange"
        :min="0"
        :max="50"
        :step="1"
        density="compact"
        color="secondary"
        thumb-label
        hide-details
        class="mb-1"
        @update:model-value="
          emit('update:filters', { ...filters, priceRange: $event as [number, number] })
        " />
      <div class="d-flex justify-space-between text-caption text-medium-emphasis">
        <span>${{ filters.priceRange[0] }}</span>
        <span>${{ filters.priceRange[1] }}</span>
      </div>

      <v-divider class="my-3" />

      <div class="text-caption text-medium-emphasis text-uppercase mb-2 font-weight-bold">
        Sort By
      </div>
      <v-select
        :model-value="filters.sortBy"
        :items="SORT_OPTIONS"
        density="compact"
        variant="outlined"
        hide-details
        @update:model-value="emit('update:filters', { ...filters, sortBy: $event })" />

      <v-divider class="my-3" />

      <div class="text-caption text-medium-emphasis text-uppercase mb-2 font-weight-bold">
        Rating
      </div>
      <v-list
        density="compact"
        class="pa-0">
        <v-list-item
          v-for="r in [5, 4, 3]"
          :key="r"
          :active="filters.minRating === r"
          color="secondary"
          rounded="lg"
          class="mb-1"
          @click="
            emit('update:filters', { ...filters, minRating: filters.minRating === r ? 0 : r })
          ">
          <template #prepend>
            <v-rating
              :model-value="r"
              density="compact"
              size="x-small"
              color="accent"
              readonly
              class="mr-1" />
          </template>
          <v-list-item-title class="text-body-2">& up</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES, SORT_OPTIONS } from './constants'

defineProps<{ filters: BzFiltersState }>()
const emit = defineEmits<{ 'update:filters': [value: BzFiltersState] }>()
</script>

<style scoped>
.bz-filters {
  width: 300px;
  min-width: 300px;
  height: 100%;
  background: rgb(var(--v-theme-surface));
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>
