<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :fullscreen="mobile"
    :persistent="persistent"
  >
    <v-card density="compact" class="poly-dialog-card" :style="cardStyle">
      <!-- Toolbar with title -->
      <v-toolbar
        v-if="props.title"
        density="compact"
        :title="props.title"
        height="60"
      >
        <v-spacer v-if="!props.hideClose" />
        <v-btn
          v-if="!props.hideClose"
          density="comfortable"
          icon="mdi-close"
          @click="handleClose"
        ></v-btn>
      </v-toolbar>

      <!-- Floating close button when no title -->
      <v-btn
        v-else-if="!props.hideClose"
        class="floating-close-btn"
        density="comfortable"
        icon="mdi-close"
        variant="text"
        @click="handleClose"
      />

      <slot :onSubmit="handleSubmit" :onClose="handleClose" />

      <template v-if="props.cancelText || props.submitText" #actions>
        <v-spacer></v-spacer>
        <v-btn v-if="props.cancelText" color="error" @click="handleClose">
          {{ cancelText }}
        </v-btn>
        <v-btn v-if="props.submitText" color="primary" @click="handleSubmit">
          {{ submitText }}
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts" generic="T">
import { ref } from "vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const data = ref<T>({} as T);

const props = defineProps<{
  modelValue: boolean;
  hideClose?: boolean;
  title?: string;
  icon?: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
  persistent?: boolean;
  cardStyle?: string;
  cancelText?: string;
  submitText?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [data: T];
  close: [];
}>();

const handleClose = () => {
  emit("close");
  emit("update:modelValue", false);
};

const handleSubmit = () => {
  emit("submit", data.value);
  handleClose();
};
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
