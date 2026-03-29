<template>
  <div class="d-flex flex-row bg-white align-center pl-2 ga-1 rounded border">
    <v-btn
      variant="text"
      icon="mdi-refresh"
      @click="drive.fetchDrive()"
      density="comfortable" />
    <v-btn
      variant="text"
      icon="mdi-delete"
      density="comfortable"
      :disabled="!drive.selectedItem"
      color="error"
      @click="deleteItem" />
    <v-btn
      variant="text"
      icon="mdi-folder-plus"
      density="comfortable"
      :disabled="!drive.canModifyCurrentFolder"
      @click="showCreateDialog = true" />

    <v-btn
      variant="text"
      icon="mdi-arrow-up-thin"
      density="comfortable"
      :disabled="drive.path.length <= 1"
      @click="navigateUp" />
    <v-divider
      vertical
      class="mx-1" />
    <v-btn
      variant="text"
      icon="mdi-restart"
      density="comfortable"
      title="Rebuild Drive (Debug)"
      @click="showRebuildDialog = true" />
    <v-icon>{{ currentRootIcon }}</v-icon>
    <v-breadcrumbs
      :divider="''"
      class="bg-white pa-1"
      :items="drive.path">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-spacer />
    <v-autocomplete
      class="mt-2 mb-2 mr-2"
      style="max-width: 300px"
      v-model="searchQuery"
      :items="searchItems"
      item-title="title"
      item-value="id"
      variant="outlined"
      density="compact"
      label="Search"
      menu-icon=""
      :menu-props="{ maxHeight: '200px', maxWidth: '300px' }"
      hide-details
      clearable
      prepend-inner-icon="mdi-magnify"
      @update:model-value="handleSearchSelect"
      return-object></v-autocomplete>
  </div>

  <v-dialog
    v-model="showCreateDialog"
    max-width="400">
    <v-card>
      <v-card-title>New Folder</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newFolderName"
          label="Folder Name"
          autofocus
          @keyup.enter="createFolder"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="text"
          @click="showCreateDialog = false">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          @click="createFolder"
          :loading="creating">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showRebuildDialog"
    max-width="400">
    <v-card>
      <v-card-title>Rebuild Drive</v-card-title>
      <v-card-text>
        <div class="text-body2 mb-2">
          This will rebuild the VirtualDrive object in MongoDB and delete all blob objects from Vercel. This is a destructive operation and should only be used for debugging.
        </div>
        <v-alert
          type="warning"
          variant="tonal"
          dense>
          Are you sure you want to proceed?
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="text"
          @click="showRebuildDialog = false">
          Cancel
        </v-btn>
        <v-btn
          color="error"
          variant="text"
          @click="confirmRebuild"
          :loading="rebuilding">
          Rebuild
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDriveStore } from '@/stores/driveStore'
import { useUiStore } from '@/stores/uiStore'

const drive = useDriveStore()

const props = defineProps({
  items: {
    type: Array<string>,
    required: true,
  },
})

const currentRootIcon = computed(() => {
  if (!drive.data || drive.path.length === 0) return 'mdi-home'

  const rootId = drive.path[0]?.id
  if (!rootId) return 'mdi-home'

  const iconMap: Record<string, string> = {
    [drive.data.root.id]: 'mdi-cloud-outline',
    [drive.data.trash?.id || '']: 'mdi-delete-outline',
    [drive.data.shared?.id || '']: 'mdi-account-group-outline',
    [drive.data.recent?.id || '']: 'mdi-clock-outline',
    [drive.data.favorites?.id || '']: 'mdi-star-outline',
  }

  return iconMap[rootId] || 'mdi-home'
})

function navigateUp() {
  if (drive.path.length > 1) {
    drive.path.pop()
    drive.getContents()
    drive.selectItem(null)
  }
}

const showCreateDialog = ref(false)
const newFolderName = ref('')
const creating = ref(false)
const showRebuildDialog = ref(false)
const rebuilding = ref(false)

async function createFolder() {
  if (!newFolderName.value) return
  creating.value = true
  try {
    const parentId = drive.path[drive.path.length - 1]?.id
    if (!parentId) throw new Error('No parent folder selected')
    await drive.createFolder(parentId, newFolderName.value)
    showCreateDialog.value = false
    newFolderName.value = ''
  } catch (e) {
    console.error(e)
  } finally {
    creating.value = false
  }
}

async function deleteItem() {
  if (!drive.selectedItem) return

  drive.confirm({
    title: 'Delete Item',
    message: `Are you sure you want to delete "${drive.selectedItem.title}"?`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    onConfirm: async () => {
      try {
        if (drive.selectedItem) {
          await drive.delete(drive.selectedItem.id)
          const ui = useUiStore()
          ui.showSnackbar('Item deleted successfully', 'success')
        }
      } catch (e: any) {
        const ui = useUiStore()
        ui.showSnackbar(`Delete failed: ${e.message}`, 'error')
      }
    },
  })
}
const searchQuery = ref(null)

const searchItems = computed(() => {
  return Object.entries(drive.index).map(([id, node]) => ({
    id,
    title: node.title,
    path: node.path,
  }))
})

function handleSearchSelect(item: any) {
  if (!item) return
  drive.navigateTo(item.id)
  searchQuery.value = null // Reset search after navigation
}

async function confirmRebuild() {
  rebuilding.value = true
  try {
    await drive.rebuildDrive()
    showRebuildDialog.value = false
  } catch (e) {
    console.error(e)
  } finally {
    rebuilding.value = false
  }
}
</script>
