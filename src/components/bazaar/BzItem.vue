<template>
  <!-- Grid Card -->
  <v-card v-if="variant === 'grid'" class="bz-card" rounded="lg" elevation="2">
    <v-img :src="item.image" height="160" cover>
      <div class="bz-card-badge">
        <v-chip size="x-small" :color="categoryColor" variant="flat">{{ item.category }}</v-chip>
      </div>
    </v-img>
    <v-card-text class="pb-1">
      <div class="font-weight-bold text-body-1 mb-1 text-truncate">{{ item.title }}</div>
      <div class="text-caption text-medium-emphasis mb-2 bz-clamp">{{ item.description }}</div>
      <div class="d-flex align-center mb-1">
        <v-rating :model-value="item.rating" density="compact" size="x-small" color="accent" readonly half-increments />
        <span class="text-caption text-medium-emphasis ml-1">({{ item.reviews }})</span>
      </div>
      <div class="d-flex align-center">
        <span class="text-h6 font-weight-bold" :class="item.price === 0 ? 'text-success' : ''">
          {{ priceLabel }}
        </span>
        <v-spacer />
        <span class="text-caption text-medium-emphasis">by {{ item.seller }}</span>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn variant="outlined" size="small" rounded="pill" @click="$emit('detail', item)">Details</v-btn>
      <v-spacer />
      <v-btn :color="item.price === 0 ? 'success' : 'secondary'" size="small" rounded="pill" variant="flat" @click="$emit('detail', item)">
        {{ item.price === 0 ? 'Get Free' : 'Buy Now' }}
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- List Row -->
  <v-card v-else rounded="lg" elevation="2" class="d-flex">
    <v-img :src="item.image" width="120" min-width="120" cover rounded="lg t-0 b-0 s-0" />
    <div class="flex-grow-1 pa-3">
      <div class="d-flex align-start justify-space-between mb-1">
        <div class="font-weight-bold text-body-1">{{ item.title }}</div>
        <v-chip size="x-small" :color="categoryColor" variant="flat" class="ml-2">{{ item.category }}</v-chip>
      </div>
      <div class="text-caption text-medium-emphasis mb-2">{{ item.description }}</div>
      <div class="d-flex align-center">
        <v-rating :model-value="item.rating" density="compact" size="x-small" color="accent" readonly half-increments />
        <span class="text-caption text-medium-emphasis ml-1 mr-3">({{ item.reviews }})</span>
        <span class="text-caption text-medium-emphasis">by {{ item.seller }}</span>
        <v-spacer />
        <span class="font-weight-bold mr-3" :class="item.price === 0 ? 'text-success' : ''">{{ priceLabel }}</span>
        <v-btn variant="outlined" size="small" rounded="pill" class="mr-2" @click="$emit('detail', item)">Details</v-btn>
        <v-btn :color="item.price === 0 ? 'success' : 'secondary'" size="small" rounded="pill" variant="flat" @click="$emit('detail', item)">
          {{ item.price === 0 ? 'Get Free' : 'Buy' }}
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  item: BazaarItem
  variant: 'grid' | 'list'
}>()

defineEmits<{ detail: [item: BazaarItem] }>()

const priceLabel = computed(() => props.item.price === 0 ? 'Free' : '$' + props.item.price.toFixed(2))
const categoryColor = computed(() => props.item.category === 'Premium' ? 'accent' : 'secondary')
</script>

<style scoped>
.bz-card {
  display: flex;
  flex-direction: column;
}

.bz-card-badge {
  position: absolute;
  top: 8px;
  left: 8px;
}

.bz-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
