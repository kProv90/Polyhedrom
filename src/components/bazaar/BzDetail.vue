<template>
  <PolyDialog :model-value="modelValue" :title="item?.title" max-width="680" @update:model-value="$emit('update:modelValue', $event)">
    <template v-if="item">
      <v-img :src="item.image" height="240" cover />
      <v-card-text>
        <div class="d-flex align-center mb-2">
          <v-chip size="small" :color="item.category === 'Premium' ? 'accent' : 'secondary'" variant="flat" class="mr-2">{{ item.category }}</v-chip>
          <v-rating :model-value="item.rating" density="compact" size="small" color="accent" readonly half-increments />
          <span class="text-caption text-medium-emphasis ml-1">({{ item.reviews }} reviews)</span>
          <v-spacer />
          <span class="text-body-2 text-medium-emphasis">by <strong>{{ item.seller }}</strong></span>
        </div>
        <p class="text-body-2 mb-4">{{ item.fullDescription }}</p>
        <div class="d-flex flex-wrap mb-3" style="gap: 8px">
          <v-chip v-for="tag in item.tags" :key="tag" size="small" variant="outlined">{{ tag }}</v-chip>
        </div>
        <v-divider class="mb-3" />
        <div class="d-flex align-center">
          <span class="text-h5 font-weight-bold" :class="item.price === 0 ? 'text-success' : 'text-primary'">
            {{ item.price === 0 ? 'Free' : '$' + item.price.toFixed(2) }}
          </span>
          <v-spacer />
          <v-btn variant="outlined" rounded="pill" class="mr-2" @click="$emit('update:modelValue', false)">Cancel</v-btn>
          <v-btn :color="item.price === 0 ? 'success' : 'secondary'" rounded="pill" variant="flat">
            {{ item.price === 0 ? 'Add to Library' : 'Purchase' }}
          </v-btn>
        </div>
      </v-card-text>
    </template>
  </PolyDialog>
</template>

<script setup lang="ts">
import { PolyDialog } from '@/components/ui'

defineProps<{
  modelValue: boolean
  item: BazaarItem | null
}>()

defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>
