<template>
  <v-layout class="workshop-editor rounded-md border">
    <!-- Editor Header -->
    <v-app-bar density="compact">
      <v-btn
        icon="mdi-arrow-left"
        variant="text"
        @click="goBack" />
      <v-app-bar-title class="ml-4">{{ templateName }}</v-app-bar-title>
      <v-spacer />

      <v-tooltip
        location="bottom"
        text="Save"
        density="compact">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-content-save"
            v-bind="props"
            variant="text"
            @click="saveTemplate" />
        </template>
      </v-tooltip>

      <v-tooltip
        location="bottom"
        text="Preview"
        density="compact">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-eye"
            v-bind="props"
            variant="text"
            @click="previewMode = !previewMode" />
        </template>
      </v-tooltip>

      <v-tooltip
        location="bottom"
        text="Print Sheet"
        density="compact">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-printer"
            v-bind="props"
            variant="text"
            @click="saveTemplate" />
        </template>
      </v-tooltip>

      <v-menu density="compact">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            v-bind="props"
            variant="text" />
        </template>
        <v-list density="compact">
          <v-list-item
            title="Share Template"
            @click="showShareDialog = true" />
          <v-list-item
            title="Template Settings"
            @click="showSettingsDialog = true" />
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Editor Layout -->
    <v-main class="d-flex flex-column overflow-auto">
      <!-- Main Work Area -->
      <div class="flex-grow-1 d-flex align-center justify-center pa-0">
        <WsSurface
          :grid-dimensions="gridDimensions"
          :grid-cols="GRID_COLS" />
      </div>
    </v-main>

    <!-- Dialogs -->
    <v-dialog
      v-model="showShareDialog"
      width="400">
      <v-card>
        <v-card-title>Share Template</v-card-title>
        <v-card-text>
          <p class="mb-4">Share this template with other users for collaboration.</p>
          <v-text-field
            label="User Email"
            placeholder="user@example.com"
            density="compact"
            @keyup.enter="shareTemplate" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Cancel"
            @click="showShareDialog = false" />
          <v-btn
            text="Share"
            color="primary"
            @click="shareTemplate" />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showSettingsDialog"
      width="500">
      <v-card>
        <v-card-title>Template Settings</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="templateSettings.name"
            hide-details
            label="Template Name"
            class="mb-4" />
          <v-text-field
            v-model="templateSettings.description"
            label="Description"
            hide-details
            type="textarea"
            rows="3"
            class="mb-4" />
          <v-text-field
            v-model="templateSettings.gameSystem"
            label="Game System"
            placeholder="e.g., D&D 5e"
            hide-details
            class="mb-4" />
          <div class="mb-4">
            <label class="text-subtitle2">Template Type Tags</label>
            <v-chip-group
              v-model="templateSettings.tags"
              density="compact">
              <v-chip
                v-for="tag in availableTags"
                :key="tag"
                :value="tag"
                filter>
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </div>

          <div class="mb-4">
            <label class="text-subtitle2 mb-2 d-block">Dimensions</label>
            <v-select
              v-model="templateSettings.size"
              :items="dimensionPresets"
              label="Paper Size"
              density="compact"
              class="mb-3" />
            <div
              v-if="templateSettings.size === 'custom'"
              class="d-flex gap-3">
              <v-text-field
                v-model.number="templateSettings.customWidth"
                label="Width (inches)"
                type="number"
                density="compact"
                step="0.1" />
              <v-text-field
                v-model.number="templateSettings.customHeight"
                label="Height (inches)"
                type="number"
                density="compact"
                step="0.1" />
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Cancel"
            @click="showSettingsDialog = false" />
          <v-btn
            text="Save"
            color="primary"
            @click="saveSettings" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWorkshopStore } from '@/stores/workshopStore'
import { WsSurface } from '@/components/workshop'
import { GRID_COLS, PPI, dimensionPresets, dimensionMap, availableTags } from './constants'

const router = useRouter()
const route = useRoute()
const workshop = useWorkshopStore()

// Editor state
const previewMode = ref(false)

// Template state (moved to store, but keep templateName for header binding)
const templateName = ref('Untitled Template')
const templateSettings = ref({
  name: 'Untitled Template',
  description: '',
  gameSystem: '',
  tags: [] as string[],
  size: 'letter',
  customWidth: 8.5,
  customHeight: 11,
})

// Grid calculation
const gridDimensions = computed(() => {
  const sizeKey = templateSettings.value.size
  const dims =
    sizeKey === 'custom'
      ? { width: templateSettings.value.customWidth, height: templateSettings.value.customHeight }
      : (dimensionMap[sizeKey as keyof typeof dimensionMap] ?? dimensionMap['letter'])

  // Calculate pixels at 300 PPI
  const widthPx = Math.round(dims!.width * PPI)
  const heightPx = Math.round(dims!.height * PPI)

  // Calculate cell size and rows
  const cellSize = Math.round(widthPx / GRID_COLS)
  const rows = Math.round(heightPx / cellSize)
  const actualHeightPx = cellSize * rows

  return {
    widthPx,
    heightPx: actualHeightPx,
    cellSize,
    rows,
  }
})

// Dialog state
const showShareDialog = ref(false)
const showSettingsDialog = ref(false)

// Initialize template on mount
onMounted(() => {
  const mode = route.query.mode as string
  const templateId = route.query.templateId as string

  console.log('Editor mounted with mode:', mode, 'templateId:', templateId)

  if (mode === 'create' || !templateId) {
    // Create a brand new template with sample controls
    console.log('Creating new template...')
    const newTemplate: WorkshopTemplate = {
      id: `template-${Date.now()}`,
      name: 'Untitled Template',
      description: 'A new workshop template',
      gameSystem: '',
      version: 1,
      dimensions: 'letter',
      variables: {},
      expressions: {},
      controls: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log('Setting template in store:', newTemplate)
    workshop.setTemplate(newTemplate)
    templateName.value = 'Untitled Template'
    templateSettings.value.name = 'Untitled Template'

    // Add test control to demonstrate property editor
    const testControl: any = {
      id: `ctrl-test-${Date.now()}`,
      name: 'Test Control',
      componentType: 'v-text-field',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      // String properties
      label: 'Example Label',
      placeholder: 'Enter text here',
      hint: 'This is a test control',
      // Number properties
      maxLength: 100,
      minLength: 0,
      // Boolean properties
      readonly: false,
      required: true,
      disabled: false,
      // Array property
      rules: ['required', 'minLength:3'],
      colors: ['red', 'blue', 'green'],
      // Object property
      metadata: { created: new Date().toISOString(), tags: ['demo', 'test'], version: 1 },
    }
    workshop.addControl(testControl)
    workshop.selectControl(testControl.id)

    console.log('Template set. Store template:', workshop.currentTemplate)
    console.log('Grid layout items:', workshop.gridLayoutItems)
  } else if (templateId) {
    // Load existing template
    // TODO: Fetch from API based on templateId
    console.log('Loading template:', templateId)
    // For now, create the same sample template to test
    console.log('Creating sample template for testing since API not implemented...')
    const sampleTemplate: WorkshopTemplate = {
      id: templateId,
      name: 'Sample Template',
      description: 'A sample workshop template',
      gameSystem: 'D&D 5e',
      dimensions: 'letter',
      version: 1,
      variables: {},
      expressions: {},
      controls: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    workshop.setTemplate(sampleTemplate)
    templateName.value = sampleTemplate.name
    templateSettings.value.name = sampleTemplate.name
  }
})

// Methods
const goBack = () => {
  router.push('/workshop')
}

const saveTemplate = () => {
  // TODO: Implement save to store and MongoDB
  console.log('Saving template:', templateName.value)
}

const shareTemplate = () => {
  // TODO: Implement share functionality
  console.log('Sharing template')
  showShareDialog.value = false
}

const saveSettings = () => {
  templateName.value = templateSettings.value.name
  showSettingsDialog.value = false
}
</script>

<style scoped lang="scss">
.workshop-editor {
  height: 100vh;
}

.canvas-area {
  display: flex;
  gap: 0;
}

.property-drawer {
  width: 320px;
  border-left: 1px solid rgb(var(--v-theme-outline));
  background-color: var(--v-surface-base);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .drawer-header {
    flex-shrink: 0;
    border-bottom: 1px solid rgb(var(--v-theme-outline));
  }
}
</style>
