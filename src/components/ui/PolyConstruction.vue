<template>
  <div class="construction-wrapper">
    <div class="construction-container border border-opacity-50 rounded">
      <v-card
        elevation="3"
        class="text-center"
        style="padding: 60px">
        <!-- Icon Animation -->
        <div
          v-if="!mobile"
          class="icon-group">
          <v-icon
            size="75"
            color="primary"
            class="animate-bounce"
            icon="mdi-hammer"
            style="animation-delay: 0s" />
          <v-icon
            size="60"
            color="secondary    "
            class="animate-bounce"
            style="animation-delay: 0.2s"
            icon="mdi-account-hard-hat" />
          <v-icon
            size="75"
            color="accent"
            class="animate-bounce"
            style="animation-delay: 0.4s"
            icon="mdi-nail" />
        </div>

        <!-- Title -->
        <h1 class="construction-title">Under Construction</h1>

        <!-- Description Alert Box -->
        <v-alert
          class="text-left"
          style="margin-top: 50px; margin-bottom: 30px"
          border="start"
          border-color="warning"
          elevation="2">
          This feature is currently being developed. Check back soon to see what we've been working
          on!
        </v-alert>

        <!-- Progress Bar -->
        <div class="text-h6 mb-4">Stage: Planning</div>
        <v-progress-linear
          color="yellow-darken-2"
          class="mb-10"
          height="10"
          v-model="progress"
          rounded
          chunk-count="5" />

        <!-- Footer Text -->
        <p class="footer-text">Thank you for your patience while we improve your experience</p>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
const progress = ref(20)
</script>

<style scoped>
.construction-wrapper {
  min-height: 100%;
  background: repeating-linear-gradient(
    45deg,
    rgb(var(--v-theme-background)),
    rgb(var(--v-theme-background)) 20px,
    rgb(var(--v-theme-surface)) 20px,
    rgb(var(--v-theme-surface)) 40px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.construction-container {
  max-width: 48rem;
  width: 100%;
}

.icon-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.construction-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .construction-title {
    font-size: 3.5rem;
  }
}

.footer-text {
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

/* Animations */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
