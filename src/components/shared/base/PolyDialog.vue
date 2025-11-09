<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :fullscreen="mobile"
    :persistent="persistent">
    <v-card
      density="compact"
      class="poly-dialog-card"
      :style="cardStyle">
      <!-- Toolbar with title -->
      <v-toolbar
        v-if="props.title"
        density="compact"
        :title="props.title"
        class="pa-1">
        <v-spacer />
        <v-btn
          density="comfortable"
          icon="mdi-close"
          @click="handleClose"></v-btn>
      </v-toolbar>

      <!-- Floating close button when no title -->
      <v-btn
        v-else
        class="floating-close-btn"
        density="comfortable"
        icon="mdi-close"
        variant="text"
        @click="handleClose"></v-btn>

      <slot />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const props = defineProps<{
  modelValue: boolean
  title?: string
  icon?: string
  maxWidth?: string | number
  maxHeight?: string | number
  persistent?: boolean
  cardStyle?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.poly-dialog-card {
  position: relative;
}

.floating-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}
</style>
