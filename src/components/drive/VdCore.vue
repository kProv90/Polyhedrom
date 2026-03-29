<template>
  <div
    id="drive"
    class="d-flex bg-surface h-100">
    <v-sheet
      width="275"
      class="h-100 pa-4 pr-0">
      <VdStatus />
    </v-sheet>
    <v-sheet class="w-100 pa-4 ma-4 poly-page rounded position-relative">
      <VdBreadcrumbs :items="crumbs" />
      <VdContents />
      <VdConfirmation />

      <v-overlay
        v-model="showPreview"
        contained
        class="align-center justify-center w-100 h-100"
        scrim="black"
        opacity="0.9">
        <div class="d-flex flex-column align-center h-100 w-100">
          <div class="d-flex justify-space-between w-100 mb-2 align-center px-4 pt-2">
            <span class="text-h6 text-white text-truncate">
              {{ driveStore.previewItem?.title }}
            </span>
            <v-spacer></v-spacer>
            <v-btn
              icon="mdi-close"
              variant="text"
              color="white"
              @click="driveStore.closePreview()"></v-btn>
          </div>
          <v-img
            v-if="driveStore.previewItem"
            style="height: auto; width: 60vw; max-height: 85vh; max-width: auto"
            :src="driveStore.previewItem.ref!"></v-img>
        </div>
      </v-overlay>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VdBreadcrumbs from './VdBreadcrumbs.vue'
import VdStatus from './VdStatus.vue'
import VdContents from './VdContents.vue'
import VdConfirmation from './VdConfirmation.vue'
import { useDriveStore } from '@/stores/driveStore'

const driveStore = useDriveStore()
onMounted(async () => {
  await driveStore.fetchDrive()
})

const crumbs = ref<string[]>([])

import { computed } from 'vue'

const showPreview = computed({
  get: () => !!driveStore.previewItem,
  set: (val) => {
    if (!val) driveStore.closePreview()
  },
})
</script>
