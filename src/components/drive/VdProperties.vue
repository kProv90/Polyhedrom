<template>
  <v-sheet
    v-if="drive.selectedItem"
    class="rounded border pa-4 mb-4">
    <div class="text-subtitle-1 font-weight-bold text-center mb-4 text-truncate">
      {{ drive.selectedItem.title }}
    </div>

    <div class="d-flex justify-space-between mb-2">
      <span class="text-medium-emphasis text-body-2">Type</span>
      <span class="text-truncate ml-4 text-body-2 font-weight-medium">
        {{
          drive.selectedItem.type === 'folder'
            ? 'Folder'
            : (drive.selectedItem as VdFile).description || 'File'
        }}
      </span>
    </div>

    <div
      v-if="drive.selectedItem.type !== 'folder' && (drive.selectedItem as VdFile).file?.size"
      class="d-flex justify-space-between mb-2">
      <span class="text-medium-emphasis text-body-2">Size</span>
      <span class="text-body-2 font-weight-medium">
        {{ formatBytes((drive.selectedItem as VdFile).file!.size!) }}
      </span>
    </div>

    <div class="d-flex justify-space-between mb-2">
      <span class="text-medium-emphasis text-body-2">Owner</span>
      <span class="text-body-2 font-weight-medium">Me</span>
    </div>

    <div
      v-if="drive.selectedItem.meta?.createdAt"
      class="d-flex justify-space-between mb-2">
      <span class="text-medium-emphasis text-body-2">Created</span>
      <span class="text-body-2 font-weight-medium">
        {{ formatDate(drive.selectedItem.meta.createdAt) }}
      </span>
    </div>

    <div
      v-if="drive.selectedItem.meta?.updatedAt"
      class="d-flex justify-space-between mb-2">
      <span class="text-medium-emphasis text-body-2">Modified</span>
      <span class="text-body-2 font-weight-medium">
        {{ formatDate(drive.selectedItem.meta.updatedAt) }}
      </span>
    </div>
  </v-sheet>
</template>
<script setup lang="ts">
import { useDriveStore } from '@/stores/driveStore'

const drive = useDriveStore()

function formatBytes(bytes: number, decimals = 2) {
  if (!bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
