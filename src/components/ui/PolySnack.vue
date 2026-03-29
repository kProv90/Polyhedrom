<template>
  <v-snackbar
    v-model="ui.show"
    :color="ui.color"
    :timeout="ui.timeout"
    location="bottom right">
    {{ ui.message }}

    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="ui.show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'

const ui = useUiStore()
</script>
