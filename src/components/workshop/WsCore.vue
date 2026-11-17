<template>
  <v-layout class="workshop-editor">
    <!-- Area 2 — Toolbar -->
    <v-toolbar
      density="compact"
      class="ws-toolbar">
      <v-btn
        icon="mdi-arrow-left"
        variant="text"
        color="white"
        @click="router.push('/workshop')" />
      <v-toolbar-title class="text-white">{{ templateName }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon="mdi-cog-outline"
        variant="text"
        color="white"
        @click="openSettingsDialog" />
    </v-toolbar>

    <!-- Body row: Palette | Center | Properties -->
    <div class="ws-body">
      <!-- Area 3: Component palette -->
      <WsPalette />

      <!-- Area 4 + 5: Canvas sub-bar and surface -->
      <div class="ws-center">
        <div class="ws-canvas-bar">
          <v-btn
            :icon="workshop.previewMode ? 'mdi-eye' : 'mdi-eye-off'"
            :color="workshop.previewMode ? 'primary' : undefined"
            size="small"
            variant="text"
            density="compact"
            @click="workshop.togglePreview" />
        </div>
        <div class="ws-canvas-surface">
          <WsCanvas />
        </div>
      </div>

      <!-- Area 6: Properties panel -->
      <div class="ws-properties">
        <WsProperties />
      </div>
    </div>

    <!-- Settings Dialog -->
    <v-dialog
      v-model="showSettingsDialog"
      width="520">
      <v-card>
        <v-toolbar
          density="compact"
          :title="'Template Settings'" />
        <v-card-text class="pt-4">
          <v-text-field
            v-model="templateSettings.name"
            label="Template Name"
            density="compact"
            variant="outlined"
            hide-details
            class="mb-4" />
          <v-textarea
            v-model="templateSettings.description"
            label="Description"
            density="compact"
            variant="outlined"
            rows="2"
            hide-details
            class="mb-4" />
          <v-text-field
            v-model="templateSettings.gameSystem"
            label="Game System"
            placeholder="e.g., D&D 5e"
            density="compact"
            variant="outlined"
            hide-details
            class="mb-4" />
          <v-select
            v-model="templateSettings.size"
            :items="dimensionPresets"
            label="Paper Size"
            density="compact"
            variant="outlined"
            hide-details
            class="mb-4" />
          <div
            v-if="templateSettings.size === 'custom'"
            class="d-flex gap-3 mb-4">
            <v-text-field
              v-model.number="templateSettings.customWidth"
              label="Width (in)"
              type="number"
              density="compact"
              variant="outlined"
              step="0.1"
              hide-details />
            <v-text-field
              v-model.number="templateSettings.customHeight"
              label="Height (in)"
              type="number"
              density="compact"
              variant="outlined"
              step="0.1"
              hide-details />
          </div>
          <div>
            <div class="text-caption text-medium-emphasis mb-2">Tags</div>
            <v-chip-group
              v-model="templateSettings.tags"
              multiple
              density="compact">
              <v-chip
                v-for="tag in availableTags"
                :key="tag"
                :value="tag"
                filter
                size="small">
                {{ tag }}
              </v-chip>
            </v-chip-group>
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

    <!-- Share Dialog -->
    <v-dialog
      v-model="showShareDialog"
      width="400">
      <v-card>
        <v-toolbar
          density="compact"
          title="Share Template" />
        <v-card-text class="pt-4">
          <p class="mb-4 text-body-2">Share this template with other users for collaboration.</p>
          <v-text-field
            label="User Email"
            placeholder="user@example.com"
            density="compact"
            variant="outlined"
            hide-details />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Cancel"
            @click="showShareDialog = false" />
          <v-btn
            text="Share"
            color="primary"
            @click="showShareDialog = false" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWorkshopStore } from '@/stores/workshopStore'
import { WsPalette, WsCanvas, WsProperties } from '@/components/workshop'
import { dimensionPresets, availableTags } from './constants'

const router = useRouter()
const route = useRoute()
const workshop = useWorkshopStore()

// Dialog state
const showShareDialog = ref(false)
const showSettingsDialog = ref(false)

// Local copy of template settings, synced on dialog open and saved on confirm
const templateSettings = ref({
  name: '',
  description: '',
  gameSystem: '',
  size: 'letter',
  customWidth: 8.5,
  customHeight: 11,
})

const templateName = computed(() => workshop.currentTemplate?.name ?? 'Untitled Template')

function createEmptyTemplate(id?: string): WorkshopTemplate {
  return {
    id: id ?? `template-${Date.now()}`,
    name: 'Untitled Template',
    description: '',
    gameSystem: '',
    version: 1,
    dimensions: 'letter',
    variables: {},
    expressions: {},
    controls: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function syncSettingsFromStore() {
  const t = workshop.currentTemplate
  if (!t) return
  const isCustom = typeof t.dimensions === 'object'
  const customDims = isCustom ? (t.dimensions as { width: number; height: number }) : null
  const sizeKey = isCustom ? 'custom' : (t.dimensions as string)
  templateSettings.value = {
    name: t.name,
    description: t.description ?? '',
    gameSystem: t.gameSystem ?? '',
    size: sizeKey,
    customWidth: customDims?.width ?? 8.5,
    customHeight: customDims?.height ?? 11,
  }
}

function saveSettings() {
  const t = workshop.currentTemplate
  if (!t) return
  t.name = templateSettings.value.name
  t.description = templateSettings.value.description
  t.gameSystem = templateSettings.value.gameSystem
  t.dimensions =
    templateSettings.value.size === 'custom'
      ? { width: templateSettings.value.customWidth, height: templateSettings.value.customHeight }
      : (templateSettings.value.size as WorkshopTemplate['dimensions'])
  t.updatedAt = new Date().toISOString()
  showSettingsDialog.value = false
}

function openSettingsDialog() {
  syncSettingsFromStore()
  showSettingsDialog.value = true
}

onMounted(() => {
  const templateId = route.query.templateId as string | undefined
  workshop.setTemplate(createEmptyTemplate(templateId))
  syncSettingsFromStore()
})
</script>

<style scoped lang="scss">
.workshop-editor {
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
}

.ws-toolbar {
  background: linear-gradient(135deg, #bd93f9 0%, #ff79c6 100%) !important;
  flex-shrink: 0;

  :deep(.v-toolbar-title),
  :deep(.v-btn) {
    text-shadow: 0 1px 3px rgb(0, 0, 0);
  }
}

.ws-body {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  min-height: 0;
}

.ws-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.ws-canvas-bar {
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid rgb(var(--v-theme-outline));
}

.ws-canvas-surface {
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 0;
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}

.ws-properties {
  width: 280px;
  flex-shrink: 0;
  border-left: 1px solid rgb(var(--v-theme-outline));
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
