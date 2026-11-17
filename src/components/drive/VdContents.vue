<template>
  <div class="pa-4 h-100 rounded unselectable-text">
    <v-empty-state
      v-if="drive.contents.length === 0"
      headline="No Files Found"
      :title="'Drag and drop files to upload or click to create a new folder'"
      icon="mdi-hexagon-multiple-outline"></v-empty-state>

    <v-row
      v-else
      align="start">
      <v-col
        v-for="item in drive.contents"
        class="text-start"
        :key="item.id"
        cols="6"
        sm="4"
        md="2"
        lg="2"
        xl="1">
        <VdItem
          :item="item"
          :selected="drive.selectedItem?.id === item.id"
          @click="handleClick"
          @dblclick="handleDblClick" />
      </v-col>
    </v-row>
  </div>
</template>
<style>
.unselectable-text {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */
}
</style>
<script setup lang="ts">
import { useDriveStore } from '@/stores/driveStore'
import VdItem from './VdItem.vue'

const drive = useDriveStore()

function handleClick(item: VdNode) {
  drive.selectItem(item)
}

function handleDblClick(item: VdNode) {
  if (item.type === 'folder') {
    drive.path.push({ id: item.id, title: item.title })
    drive.getContents()
    drive.selectItem(null) // Clear selection on navigation
  } else if (item.type === 'file') {
    const file = item as VdFile
    if (file.file.mimeType?.startsWith('image/')) {
      console.log('Previewing image', file)
      drive.preview(file)
    }
  }
}
</script>
