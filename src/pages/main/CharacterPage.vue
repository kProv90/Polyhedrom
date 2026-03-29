<template>
  <div class="ch-page">

    <!-- Banner -->
    <PolyBanner
      title="Characters"
      subtitle="Build and manage your character roster"
      icon="mdi-account-outline"
      gradient="linear-gradient(135deg, #BD93F9 0%, #8BE9FD 100%)">
      <v-btn prepend-icon="mdi-plus" variant="flat" rounded="pill" class="poly-banner-btn" style="background: rgba(0,0,0,0.35); color: white">
        New Character
      </v-btn>
    </PolyBanner>

    <!-- Content -->
    <div class="pa-6 ch-content d-flex flex-column">

      <!-- Search & Filter Bar -->
    <div class="d-flex align-center mb-4" style="gap: 8px">
      <v-text-field
        v-model="search"
        placeholder="Search characters..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        variant="outlined"
        hide-details
        style="max-width: 320px" />

      <transition name="fade">
        <div v-if="editMode && selected.length" class="d-flex align-center" style="gap: 8px">
          <v-btn size="small" variant="outlined" rounded="pill" prepend-icon="mdi-sword">
            Add to Campaign
          </v-btn>
          <v-btn size="small" variant="outlined" rounded="pill" color="error" prepend-icon="mdi-delete-outline">
            Delete
          </v-btn>
        </div>
      </transition>
      <v-btn
        size="small"
        :variant="editMode ? 'flat' : 'outlined'"
        :color="editMode ? 'primary' : undefined"
        rounded="pill"
        :prepend-icon="editMode ? 'mdi-check' : 'mdi-pencil-outline'"
        @click="editMode = !editMode; if (!editMode) selected = []">
        {{ editMode ? 'Done' : 'Edit' }}
      </v-btn>
      <v-spacer />
      <v-btn-toggle v-model="viewMode" density="compact" variant="outlined" mandatory>
        <v-btn value="list" icon="mdi-view-headline" size="small" />
        <v-btn value="card" icon="mdi-view-grid-outline" size="small" />
      </v-btn-toggle>
    </div>

    <!-- Table -->
    <v-data-table
      v-if="viewMode === 'list'"
      v-model="selected"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="characters"
      :search="search"
      density="comfortable"
      :show-select="editMode"
      item-value="id"
      class="ch-table rounded-lg flex-grow-1"
      fixed-header
      height="100%">

      <!-- Avatar -->
      <template #[`item.avatar`]="{ item }">
        <v-avatar size="32">
          <v-img :src="`https://i.pravatar.cc/64?u=${item.name}`" :alt="item.name" />
        </v-avatar>
      </template>

      <!-- Name -->
      <template #[`item.name`]="{ item }">
        <span class="font-weight-medium">{{ item.name }}</span>
      </template>

      <!-- Race -->
      <template #[`item.race`]="{ item }">
        <span v-if="item.status !== 'Concept'" class="text-body-2">{{ item.race }}</span>
        <span v-else class="text-medium-emphasis text-body-2">—</span>
      </template>

      <!-- Class -->
      <template #[`item.class`]="{ item }">
        <span v-if="item.status !== 'Concept'" class="text-body-2">{{ item.class }}</span>
        <span v-else class="text-medium-emphasis text-body-2">—</span>
      </template>

      <!-- Status -->
      <template #[`item.status`]="{ item }">
        <v-chip
          size="small"
          :color="statusColor(item.status)"
          variant="tonal">
          {{ item.status }}
        </v-chip>
      </template>

      <!-- Level -->
      <template #[`item.level`]="{ item }">
        <span v-if="item.status !== 'Concept'" class="text-body-2">{{ item.level }}</span>
        <span v-else class="text-medium-emphasis text-body-2">—</span>
      </template>

      <!-- Campaign -->
      <template #[`item.campaign`]="{ item }">
        <span v-if="item.campaign" class="text-body-2">{{ item.campaign }}</span>
        <span v-else class="text-medium-emphasis text-body-2">—</span>
      </template>

      <!-- Traits -->
      <template #[`item.traits`]="{ item }">
        <span v-if="item.status === 'Concept'" class="text-medium-emphasis text-body-2">—</span>
        <div v-else class="d-flex flex-wrap" style="gap: 4px">
          <v-chip
            v-for="trait in item.traits"
            :key="trait"
            size="x-small"
            variant="outlined">
            {{ trait }}
          </v-chip>
        </div>
      </template>

      <!-- Actions -->
      <template #[`item.actions`]="{ item }">
        <div class="d-flex align-center" style="gap: 4px">
          <v-btn icon="mdi-pencil-outline" size="x-small" variant="text" />
          <v-menu location="bottom end">
            <template #activator="{ props }">
              <v-btn icon="mdi-dots-vertical" size="x-small" variant="text" v-bind="props" />
            </template>
            <v-list density="compact">
              <v-list-item prepend-icon="mdi-content-copy" title="Duplicate" />
              <v-list-item prepend-icon="mdi-sword" title="Add to Campaign" />
              <v-list-item prepend-icon="mdi-export-variant" title="Export" />
              <v-divider />
              <v-list-item prepend-icon="mdi-delete-outline" title="Delete" class="text-error" />
            </v-list>
          </v-menu>
        </div>
      </template>

      <!-- Empty state -->
      <template #no-data>
        <div class="pa-8 text-center">
          <v-icon size="48" color="surface-variant" class="mb-3">mdi-account-search-outline</v-icon>
          <div class="text-body-1 text-medium-emphasis">No characters found</div>
        </div>
      </template>
    </v-data-table>

    <!-- Card Grid -->
    <div v-if="viewMode === 'card'" class="ch-card-grid">
      <ChCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
        :edit-mode="editMode"
        :is-selected="selected.includes(character.id)"
        @toggle="toggleCard(character.id)" />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PolyBanner } from '@/components/ui'
import ChCard from '@/components/character/ChCard.vue'
import { headers, statusColor } from '@/components/character/constants'
import { fakeCharacters } from '@/lib/api/fake'

const editMode = ref(false)
const search = ref('')
const viewMode = ref<'list' | 'card'>('list')
const selected = ref<number[]>([])
const sortBy = ref([{ key: 'name', order: 'asc' as const }])

const characters = ref<Character[]>(fakeCharacters)

function toggleCard(id: number) {
  const idx = selected.value.indexOf(id)
  if (idx === -1) selected.value.push(id)
  else selected.value.splice(idx, 1)
}
</script>

<style scoped>
.ch-page {
  height: 100vh;
  overflow: hidden;
  background: rgb(var(--v-theme-background));
  display: flex;
  flex-direction: column;
}

.ch-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.ch-table {
  background: rgb(var(--v-theme-surface)) !important;
}

.ch-table :deep(tbody tr) {
  transition: background-color 0.15s ease;
}

.ch-table :deep(tbody tr:hover td) {
  background-color: rgba(255, 255, 255, 0.06) !important;
}

.ch-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
