<template>
  <v-card
    class="ch-card on-hover"
    :class="{ 'ch-card--selected': isSelected }"
    rounded="lg"
    style="cursor: pointer"
    @click="$emit('open', character)">

    <v-img
      :src="character.image !== null ? (character.image ?? `https://i.pravatar.cc/300?u=${character.name}`) : undefined"
      :alt="character.name"
      height="320"
      cover>

      <template #placeholder>
        <div class="ch-card-placeholder">
          <v-icon size="120" color="medium-emphasis">mdi-account-outline</v-icon>
        </div>
      </template>

      <!-- Status chip — top right -->
      <div class="ch-card-topright">
        <v-chip size="small" :color="statusColor(character.status)" variant="flat">
          {{ character.status }}
        </v-chip>
      </div>

      <!-- Checkbox — top left -->
      <div v-if="editMode" class="ch-card-topleft">
        <v-checkbox-btn
          :model-value="isSelected"
          color="secondary"
          density="compact"
          @click.stop="$emit('toggle')" />
      </div>

      <!-- Gradient overlay + text — bottom -->
      <div class="ch-card-overlay">
        <div class="text-h6 font-weight-bold text-white">{{ character.name }}</div>
        <div class="text-body-2" style="color: rgba(255,255,255,0.75);">
          <span v-if="character.status !== 'Concept'">{{ character.race }} {{ character.class }} {{ character.level }}</span>
          <span v-else>Concept</span>
        </div>
      </div>

      <!-- Three-dot menu — bottom right, inside image -->
      <div class="ch-card-menu">
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn size="small" variant="text" icon="mdi-dots-vertical" v-bind="props" @click.stop />
          </template>
          <v-list density="compact" slim>
            <v-list-item prepend-icon="mdi-content-copy" title="Duplicate" />
            <v-list-item prepend-icon="mdi-export-variant" title="Export" />
            <v-divider />
            <v-list-item prepend-icon="mdi-delete-outline" title="Delete" class="text-error" />
          </v-list>
        </v-menu>
      </div>

    </v-img>

  </v-card>
</template>

<script setup lang="ts">
import { statusColor } from './constants'

defineProps<{
  character: Character
  editMode: boolean
  isSelected: boolean
}>()

defineEmits<{ toggle: []; open: [character: Character] }>()
</script>

<style scoped>
.ch-card {
  position: relative;
}

.ch-card-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(var(--v-theme-surface));
}

.ch-card--selected {
  outline: 2px solid rgb(var(--v-theme-secondary));
}

.ch-card-topright {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 1;
}

.ch-card-topleft {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 1;
}

.ch-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48px 14px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 100%);
}

.ch-card-menu {
  position: absolute;
  bottom: 6px;
  right: 6px;
  z-index: 1;
}
</style>
