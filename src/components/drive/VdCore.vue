<template>
  <div
    id="drive"
    class="d-flex bg-surface h-100">
    <v-sheet
      width="275"
      class="h-100 pa-4 pr-0">
      <VdStatus />
    </v-sheet>
    <v-sheet class="w-100 pa-4 ma-4 poly-page rounded position-relative overflow-hidden">
      <VdBreadcrumbs :items="crumbs" />
      <VdContents />
      <VdConfirmation />

      <v-overlay
        v-model="showPreview"
        contained
        class="align-center justify-center"
        scrim="black"
        opacity="0.9">
        <div class="d-flex flex-column align-center justify-center w-100 h-100" style="overflow: hidden;">
          <div class="d-flex justify-space-between align-center px-4 pt-2 pb-2 w-100 flex-shrink-0">
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
          <img
            v-if="driveStore.previewItem"
            :src="driveStore.previewItem.ref!"
            style="max-width: 90%; max-height: calc(100% - 56px); width: auto; height: auto; object-fit: contain; display: block;" />
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
