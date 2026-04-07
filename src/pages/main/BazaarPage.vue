<template>
  <div class="bz-page">

    <PolyBanner
      title="The Bazaar"
      subtitle="Browse TTRPG resources from creators around the world"
      icon="mdi-storefront-outline"
      gradient="linear-gradient(135deg, rgb(var(--v-theme-warning)) 0%, rgb(var(--v-theme-secondary)) 100%)" />

    <div class="bz-body">

      <BzFilters :filters="filters" @update:filters="filters = $event" />

      <!-- Main Content -->
      <div class="flex-grow-1 overflow-y-auto pa-4" style="min-height: 0">
        <div class="d-flex align-center mb-4">
          <v-spacer />
          <v-btn-toggle v-model="viewMode" density="compact" variant="outlined" mandatory>
            <v-btn value="grid" icon="mdi-view-grid" size="small" />
            <v-btn value="list" icon="mdi-view-list" size="small" />
          </v-btn-toggle>
        </div>

        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="bz-grid">
          <BzItem
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
            variant="grid"
            @detail="openDetail" />
          <div v-if="!filteredItems.length" class="bz-empty">
            <v-icon size="64" color="surface-variant" class="mb-3">mdi-store-search-outline</v-icon>
            <div class="text-h6 text-medium-emphasis">No items found</div>
            <div class="text-caption text-medium-emphasis">Try adjusting your filters</div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="d-flex flex-column" style="gap: 12px">
          <BzItem
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
            variant="list"
            @detail="openDetail" />
        </div>
      </div>
    </div>

    <BzDetail v-model="showDetail" :item="detailItem" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PolyBanner } from '@/components/ui'
import BzFilters from '@/components/bazaar/BzFilters.vue'
import BzItem from '@/components/bazaar/BzItem.vue'
import BzDetail from '@/components/bazaar/BzDetail.vue'
import { fakeBazaarItems } from '@/lib/api/fake'

const viewMode = ref('grid')
const showDetail = ref(false)
const detailItem = ref<BazaarItem | null>(null)

const filters = ref<BzFiltersState>({
  search: '',
  category: 'all',
  priceRange: [0, 50],
  sortBy: 'Popular',
  minRating: 0,
})

const items = ref<BazaarItem[]>(fakeBazaarItems)

const filteredItems = computed(() => {
  const { search, category, priceRange, sortBy, minRating } = filters.value
  let result = items.value

  if (category !== 'all')
    result = result.filter(i => i.category === category)

  if (search)
    result = result.filter(i =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
    )

  result = result.filter(i => i.price >= priceRange[0] && i.price <= priceRange[1])

  if (minRating > 0)
    result = result.filter(i => i.rating >= minRating)

  if (sortBy === 'Price: Low to High') return [...result].sort((a, b) => a.price - b.price)
  if (sortBy === 'Price: High to Low') return [...result].sort((a, b) => b.price - a.price)
  if (sortBy === 'Top Rated') return [...result].sort((a, b) => b.rating - a.rating)
  if (sortBy === 'Newest') return [...result].sort((a, b) => b.id - a.id)
  return [...result].sort((a, b) => b.reviews - a.reviews)
})

function openDetail(item: BazaarItem) {
  detailItem.value = item
  showDetail.value = true
}
</script>

<style scoped>
.bz-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(var(--v-theme-background));
}

.bz-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
}

.bz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.bz-empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  opacity: 0.6;
}
</style>
