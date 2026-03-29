<template>
  <div class="workshop-landing">
    <!-- Banner -->
    <PolyBanner
      title="The Workshop"
      subtitle="Create and manage your character sheet templates"
      icon="mdi-hammer-wrench"
      gradient="linear-gradient(135deg, #BD93F9 0%, #FF79C6 100%)">
      <v-btn
        variant="flat"
        rounded="pill"
        class="poly-banner-btn"
        style="background: rgba(0,0,0,0.35); color: white"
        prepend-icon="mdi-plus"
        @click="createNewTemplate">
        New Template
      </v-btn>
    </PolyBanner>

    <!-- Templates Table Section -->
    <div class="pa-6 ws-content d-flex flex-column">
      <!-- Search Bar -->
      <div class="d-flex align-center mb-4" style="gap: 8px">
        <v-text-field
          v-model="templateSearch"
          placeholder="Search templates..."
          prepend-inner-icon="mdi-magnify"
          density="compact"
          variant="outlined"
          hide-details
          style="max-width: 320px" />
      </div>

      <!-- Templates Data Table -->
      <v-data-table
        v-model:sort-by="sortBy"
        :headers="headers"
        :items="filteredTemplates"
        :search="templateSearch"
        density="comfortable"
        class="ws-table rounded-lg flex-grow-1"
        fixed-header
        height="100%">
        <!-- Status Icon Column -->
        <template #[`item.status`]="{ item }">
          <v-icon
            :icon="item.isShared ? 'mdi-share' : 'mdi-account'"
            :color="item.isShared ? 'info' : 'success'" />
        </template>

        <!-- Template Name Column (Clickable) -->
        <template #[`item.name`]="{ item }">
          <span
            class="template-name-link"
            @click="editTemplate(item.id)">
            {{ item.name }}
          </span>
        </template>

        <!-- Used In Column (Chips) -->
        <template #[`item.usedIn`]="{ item }">
          <div class="chips-container">
            <v-chip
              v-for="system in item.usedIn"
              :key="system"
              size="small"
              variant="outlined">
              {{ system }}
            </v-chip>
          </div>
        </template>

        <!-- Tags Column (Chips) -->
        <template #[`item.tags`]="{ item }">
          <div class="chips-container">
            <v-chip
              v-for="tag in item.tags"
              :key="tag"
              size="small"
              color="primary"
              variant="tonal">
              {{ tag }}
            </v-chip>
          </div>
        </template>

        <!-- Actions Column -->
        <template #[`item.actions`]="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                size="small"
                variant="text"
                v-bind="props" />
            </template>
            <v-list>
              <v-list-item
                title="Edit"
                prepend-icon="mdi-pencil"
                @click="editTemplate(item.id)" />
              <v-list-item
                title="Share"
                prepend-icon="mdi-share"
                @click="shareTemplate(item.id)" />
              <v-divider />
              <v-list-item
                title="Delete"
                prepend-icon="mdi-delete"
                @click="deleteTemplate(item.id)" />
            </v-list>
          </v-menu>
        </template>

        <!-- Empty State -->
        <template #no-data>
          <div class="empty-state pa-8">
            <v-icon
              size="64"
              class="mb-4">
              mdi-magnify
            </v-icon>
            <p class="text-subtitle1 font-weight-bold">No templates found</p>
            <p class="text-caption text-medium-emphasis mb-6">
              Unable to find any templates matching your search.
            </p>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PolyBanner } from '@/components/ui'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import { fakeWorkshopTemplates } from '@/lib/api/fake'

const router = useRouter()
const sessionStore = useSessionStore()

// State
const templateSearch = ref('')
const sortBy = ref([{ key: 'updatedOn', order: 'desc' as const }])

// Table headers
const headers = [
  { title: '', key: 'status', width: '40px', sortable: false },
  { title: 'Template Name', key: 'name', sortable: true },
  { title: 'Created On', key: 'createdOn', sortable: true, width: '150px' },
  { title: 'Updated On', key: 'updatedOn', sortable: true, width: '150px' },
  { title: 'Used In', key: 'usedIn', sortable: false, width: '250px' },
  { title: 'Tags', key: 'tags', sortable: false, width: '250px' },
  { title: '', key: 'actions', width: '50px', sortable: false },
]

// Mock data - will be replaced with store/API
const templates = ref<any[]>(fakeWorkshopTemplates)

// Format date helper
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

// Computed filtered list
const filteredTemplates = computed(() => {
  return templates.value
    .map((t) => ({
      ...t,
      createdOn: formatDate(t.createdOn),
      updatedOn: formatDate(t.updatedOn),
    }))
    .filter((t) => t.name.toLowerCase().includes(templateSearch.value.toLowerCase()))
})

// Methods
const createNewTemplate = () => {
  router.push('/tools/workshop/editor?mode=create')
}

const editTemplate = (templateId: string) => {
  router.push(`/tools/workshop/editor?templateId=${templateId}`)
}

const shareTemplate = (templateId: string) => {
  console.log('Share template:', templateId)
  // TODO: Implement share dialog
}

const deleteTemplate = (templateId: string) => {
  console.log('Delete template:', templateId)
  // TODO: Implement delete with confirmation
}
</script>

<style scoped lang="scss">
.workshop-landing {
  height: 100vh;
  overflow: hidden;
  background-color: rgb(var(--v-theme-background));
  display: flex;
  flex-direction: column;
}

.ws-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.ws-table {
  background: rgb(var(--v-theme-surface)) !important;
}

.ws-table :deep(tbody tr) {
  transition: background-color 0.15s ease;
}

.ws-table :deep(tbody tr:hover td) {
  background-color: rgba(255, 255, 255, 0.06) !important;
}

.template-name-link {
  cursor: pointer;
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px dashed rgb(var(--v-theme-outline));
  border-radius: 8px;
}

@media (max-width: 768px) {
  .banner-content {
    padding: 2rem;

    h1 {
      font-size: 1.75rem;
    }
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;

    .search-field {
      max-width: 100%;
    }
  }

  .templates-table {
    :deep(.v-table) {
      font-size: 0.875rem;
    }
  }
}
</style>
