<template>
  <div
    ref="paletteEl"
    class="ws-palette">
    <!-- Sticky search bar -->
    <div class="ws-palette__search-bar">
      <v-text-field
        v-model="search"
        placeholder="Search components..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        variant="outlined"
        hide-details
        clearable />
    </div>

    <!-- Scrollable category list -->
    <div class="pa-4 pt-3">
      <template
        v-for="(cat, index) in filteredCategories"
        :key="cat.id">
        <v-divider
          v-if="index > 0"
          class="mb-1 mt-1" />
        <div
          :ref="
            (el) => {
              if (el) sectionRefs[cat.id] = el as HTMLElement
            }
          "
          :data-category-id="cat.id"
          class="ws-palette__cat-label text-caption text-medium-emphasis text-uppercase font-weight-bold mb-2">
          {{ cat.label }}
        </div>
        <div class="ws-palette__grid mb-3">
          <div
            v-for="comp in cat.components"
            :key="comp.type"
            class="ws-palette__item"
            :data-component-type="comp.type">
            <v-card
              class="ws-palette__item-card"
              variant="tonal"
              rounded="lg"
              :ripple="false">
              <div class="ws-palette__item-inner">
                <v-icon
                  :icon="componentIconMap[comp.type]"
                  size="18"
                  class="mb-1" />
                <span class="text-caption text-center">{{ comp.label }}</span>
              </div>
            </v-card>
          </div>
        </div>
      </template>

      <div
        v-if="filteredCategories.length === 0"
        class="text-caption text-medium-emphasis text-center py-8">
        No components found
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { paletteCategories, componentIconMap } from './constants'

const emit = defineEmits<{
  categoryVisible: [categoryId: string]
}>()

const paletteEl = ref<HTMLElement | null>(null)
const sectionRefs: Record<string, HTMLElement> = {}
const search = ref('')

const filteredCategories = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return paletteCategories
  return paletteCategories
    .map((cat) => ({
      ...cat,
      components: cat.components.filter((c) => c.label.toLowerCase().includes(q)),
    }))
    .filter((cat) => cat.components.length > 0)
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).dataset.categoryId
          if (id) emit('categoryVisible', id)
          break
        }
      }
    },
    { root: paletteEl.value, threshold: 0, rootMargin: '0px 0px -70% 0px' }
  )
  for (const el of Object.values(sectionRefs)) {
    observer.observe(el)
  }
})

onUnmounted(() => observer?.disconnect())

function scrollToCategory(categoryId: string) {
  sectionRefs[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

defineExpose({ scrollToCategory })
</script>

<style scoped lang="scss">
.ws-palette {
  width: 300px;
  min-width: 300px;
  height: 100%;
  background: rgb(var(--v-theme-surface));
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  overflow-y: auto;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;

  &__search-bar {
    position: sticky;
    top: 0;
    z-index: 2;
    background: rgb(var(--v-theme-surface));
    padding: 12px 16px;
    border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }

  &__cat-label {
    position: sticky;
    top: 65px;
    z-index: 1;
    background: rgb(var(--v-theme-surface));
    padding: 4px 0;
    margin-bottom: 8px !important;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    align-items: stretch;
  }

  &__item {
    display: flex;
  }

  &__item-card {
    cursor: grab;
    user-select: none;
    flex: 1;
    transition:
      background-color 0.15s ease,
      box-shadow 0.15s ease;

    &:hover {
      background-color: rgba(var(--v-theme-secondary), 0.15) !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
    }

    &:active {
      cursor: grabbing;
    }
  }

  &__item-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 4px;
    min-height: 75px;
    text-align: center;
  }
}
</style>
