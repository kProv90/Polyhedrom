<template>
  <v-card
    class="ch-card"
    :class="{ 'ch-card--selected': isSelected }"
    variant="tonal">

    <div class="ch-card-top">
      <v-avatar size="56">
        <v-img :src="`https://i.pravatar.cc/150?u=${character.name}`" :alt="character.name" />
      </v-avatar>
      <div class="ch-card-topright">
        <v-chip size="small" :color="statusColor(character.status)" variant="tonal">
          {{ character.status }}
        </v-chip>
        <v-checkbox-btn
          v-if="editMode"
          :model-value="isSelected"
          color="secondary"
          density="compact"
          @click.stop="$emit('toggle')" />
      </div>
    </div>

    <v-card-title class="pb-0 pt-3 px-4">{{ character.name }}</v-card-title>
    <v-card-subtitle class="px-4 pb-2">
      <span v-if="character.status !== 'Concept'">{{ character.race }} · {{ character.class }} · Lv {{ character.level }}</span>
      <span v-else class="text-medium-emphasis">Concept</span>
    </v-card-subtitle>

    <v-card-text class="pt-0 px-4">
      <div v-if="character.campaign" class="d-flex align-center" style="gap: 6px">
        <v-icon size="14" color="secondary">mdi-sword</v-icon>
        <span class="text-caption text-medium-emphasis">{{ character.campaign }}</span>
      </div>
      <div v-if="character.status !== 'Concept'" class="d-flex flex-wrap mt-2" style="gap: 4px">
        <v-chip v-for="trait in character.traits" :key="trait" size="x-small" variant="outlined">{{ trait }}</v-chip>
      </div>
    </v-card-text>

    <v-card-actions class="px-4 pb-3 mt-auto">
      <v-menu location="bottom end">
        <template #activator="{ props }">
          <v-btn size="small" variant="text" icon="mdi-dots-vertical" v-bind="props" />
        </template>
        <v-list density="compact">
          <v-list-item prepend-icon="mdi-content-copy" title="Duplicate" />
          <v-list-item prepend-icon="mdi-sword" title="Add to Campaign" />
          <v-list-item prepend-icon="mdi-export-variant" title="Export" />
          <v-divider />
          <v-list-item prepend-icon="mdi-delete-outline" title="Delete" class="text-error" />
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn prepend-icon="mdi-pencil-outline" variant="outlined" size="small" rounded="pill">Edit</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script setup lang="ts">
import { statusColor } from './constants'

defineProps<{
  character: Character
  editMode: boolean
  isSelected: boolean
}>()

defineEmits<{ toggle: [] }>()
</script>

<style scoped>
.ch-card {
  transition: background-color 0.15s ease;
  display: flex;
  flex-direction: column;
}

.ch-card:hover {
  background-color: rgba(255, 255, 255, 0.06) !important;
}

.ch-card--selected {
  outline: 2px solid rgb(var(--v-theme-secondary));
}

.ch-card-top {
  padding: 16px 16px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.ch-card-topright {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
