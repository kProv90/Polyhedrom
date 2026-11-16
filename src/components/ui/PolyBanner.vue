<template>
  <div class="poly-banner" :style="bannerStyle">
    <div class="poly-banner-content">
      <div>
        <div class="text-h4 font-weight-bold text-white poly-banner-title">{{ title }}</div>
        <div v-if="subtitle" class="text-body-2 mt-1 text-white poly-banner-subtitle">{{ subtitle }}</div>
      </div>
      <v-spacer />
      <slot />
    </div>
    <v-icon v-if="icon" class="poly-banner-icon">{{ icon }}</v-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  icon?: string
  gradient?: string
}>()

const bannerStyle = computed(() => ({
  background: props.gradient ?? 'linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%)',
}))
</script>

<style scoped>
.poly-banner {
  position: relative;
  height: 110px;
  overflow: hidden;
  flex-shrink: 0;
}

.poly-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 70%);
  z-index: 0;
}

.poly-banner-title {
  text-shadow: 0 1px 4px rgba(0,0,0,0.5), 0 2px 12px rgba(0,0,0,0.3);
}

.poly-banner-subtitle {
  opacity: 0.9;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5), 0 2px 12px rgba(0,0,0,0.3);
}

.poly-banner-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 100px 0 24px;
  gap: 16px;
}

.poly-banner-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 78px !important;
  opacity: 0.35;
  color: white !important;
}

:slotted(.poly-banner-btn) {
  background: rgba(0, 0, 0, 0.35) !important;
  color: #fff !important;
  transition: background 0.2s ease !important;
}

:slotted(.poly-banner-btn):hover {
  background: rgba(0, 0, 0, 0.5) !important;
}
</style>
