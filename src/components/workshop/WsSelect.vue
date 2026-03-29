<template>
  <v-expansion-panels>
    <v-expansion-panel height="50">
      <template v-slot:title>
        <div class="d-flex align-center w-100">
          <span class="text-subtitle-1 flex-grow-1">My Templates</span>

          <div class="d-flex align-center mr-2">
            <v-btn
              icon="mdi-file-document-plus"
              size="small"
              variant="text"
              @click.stop=""
              aria-label="Edit"
              class="ma-0 mr-1" />
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click.stop=""
              aria-label="Edit"
              class="ma-0 mr-1" />
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              @click.stop=""
              aria-label="Delete"
              class="ma-0" />
          </div>
        </div>
      </template>
      <v-expansion-panel-text class="text-body-2 text-center">
        <span class="text-grey">No templates found</span>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <PolyDialog
    v-model="showNewGroupDlg"
    width="400"
    title="New Template Group"
    hide-close
    submit-text="Create"
    cancel-text="Cancel">
    <template #default="{ onSubmit, onClose }">
      <v-sheet class="pa-2 mt-5">
        <v-text-field
          label="Group Name"
          variant="outlined"
          density="compact"
          @keyup.enter="" />
        <!-- Optional: Custom buttons if you want more control -->
        <!--
          <v-btn @click="submit({ name: groupName })" color="primary">
            Create
          </v-btn>
          -->
      </v-sheet>
    </template>
  </PolyDialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { PolyDialog } from '@/components/ui'
const showNewGroupDlg = ref(false)
</script>
