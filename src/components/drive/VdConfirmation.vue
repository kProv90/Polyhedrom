<template>
  <PolyDialog
    v-model="drive.confirmation.show"
    :title="drive.confirmation.title"
    :submit-text="drive.confirmation.confirmText"
    :cancel-text="drive.confirmation.cancelText"
    max-width="400"
    @submit="handleConfirm"
    @close="handleClose">
    <v-card-text>{{ drive.confirmation.message }}</v-card-text>
  </PolyDialog>
</template>

<script setup lang="ts">
import { useDriveStore } from '@/stores/driveStore'
import PolyDialog from '@/components/ui/PolyDialog.vue'

const drive = useDriveStore()

function handleConfirm() {
  if (drive.confirmation.onConfirm) {
    drive.confirmation.onConfirm()
  }
  drive.confirmation.show = false
}

function handleClose() {
  drive.confirmation.show = false
}
</script>
