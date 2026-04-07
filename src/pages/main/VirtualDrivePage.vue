<template>
  <div class="vd-page">
    <PolyBanner
      title="Virtual Drive"
      subtitle="Your files, assets, and shared resources"
      icon="mdi-folder-multiple-outline"
      gradient="linear-gradient(135deg, rgb(var(--v-theme-success)) 0%, rgb(var(--v-theme-info)) 100%)" />
    <div class="vd-body">
      <VdCore />
    </div>
  </div>
</template>

<script setup lang="ts">
import VdCore from '@/components/drive/VdCore.vue'
import { PolyBanner } from '@/components/ui'
</script>

<style scoped>
.vd-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(var(--v-theme-background));
}

.vd-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
