<template>
  <v-sheet
    v-if="drive.uploadQueue.length === 0"
    class="d-flex flex-grow-1 flex-column align-center justify-center rounded pa-2 mt-2 mb-8"
    :color="isDragOver ? 'background' : 'surface'"
    :style="{ 
      border: '1px dashed grey', 
      minWidth: '220px',
      pointerEvents: drive.canModifyCurrentFolder ? 'auto' : 'none',
      opacity: drive.canModifyCurrentFolder ? 1 : 0.5
    }"
    height="200"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave">
    <v-icon
      class="mb-4"
      :icon="drive.canModifyCurrentFolder ? 'mdi-upload' : 'mdi-upload-off'"
      color="grey"
      size="large"></v-icon>
    <div class="text-body-2 text-medium-emphasis text-center">
      {{drive.canModifyCurrentFolder ? 'Drop files here to upload into the current folder' : 'This folder is locked. Uploads are only allowed in My Drive.'}}
    </div>
  </v-sheet>

  <v-list
    v-else
    class="flex-grow-1 pa-0 border rounded bg-background mb-8 mt-4"
    style="width: 220px"
    density="compact"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave">
    <v-sheet
      v-for="item in drive.uploadQueue"
      :key="item.id"
      class="ma-1 border rounded d-flex flex-column align-center">
      <v-progress-linear
        :color="progColor(item)"
        height="2"
        :indeterminate="item.status === 'uploading' || item.status === 'pending'"
        :max="100"
        :model-value="item.progress"></v-progress-linear>
      <div class="d-flex w-100 flex-row align-center pa-1">
        <div class="w-100 text-truncate pl-1">
          <span class="text-caption text-medium-emphasis">{{ item.file.name }}</span>
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          color="error"
          density="compact"
          @click="drive.cancelUpload(item.id)"></v-btn>
      </div>
    </v-sheet>
  </v-list>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDriveStore } from '@/stores/driveStore'

const drive = useDriveStore()
const isDragOver = ref(false)
const canUpload = computed(() => drive.rootFolder && !drive.rootFolder.isLocked)

const progColor = (item: UploadItem) => {
  switch (item.status) {
    case 'uploading':
      return 'accent'
    case 'completed':
      return 'success'
    case 'error':
      return 'error'
    default:
      return 'warning'
  }
}

async function handleDrop(event: DragEvent) {
  event.preventDefault()
  // [VD-010] Silently ignore drops when current folder is locked
  if (!drive.canModifyCurrentFolder) return
  
  isDragOver.value = false
  const files = event.dataTransfer?.files
  if (!files || files.length === 0) return

  // Get current folder ID
  const parentId = drive.path[drive.path.length - 1]?.id
  if (!parentId) {
    console.error('No parent folder selected')
    return
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file) {
      drive.addToQueue(file, parentId)
    }
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false
}

watch(
  () => drive.uploadQueue,
  (newQueue) => {
    newQueue.forEach((item) => {
      if ((item.status === 'completed' || item.status === 'error') && item.progress > 0) {
        if ((item as any)._draining) return
        ;(item as any)._draining = true
        item.progress = 100
        const interval = 50 // Update every 50ms

        const timer = setInterval(() => {
          item.progress -= 2.2
          if (item.progress <= 0) {
            clearInterval(timer)
            item.progress = 0
            drive.removeUpload(item.id)
          }
        }, interval)
      }
    })
  },
  { deep: true }
)
</script>
