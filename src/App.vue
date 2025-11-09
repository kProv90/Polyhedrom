<template>
  <ClerkLoaded>
    <v-app>
      <v-layout>
        <!-- Bookmark Menu Button (Only shown when user is logged in) -->
        <SignedIn>
          <div
            v-if="mobile"
            class="bookmark-menu-btn"
            :class="{ 'drawer-open': leftDrawerOpen }"
            @click="leftDrawerOpen = !leftDrawerOpen">
            <v-icon
              icon="mdi-menu"
              size="24"
              color="white" />
          </div>
          <!-- Left Drawer (Navigation) -->
          <PolyNav v-model="leftDrawerOpen" />
        </SignedIn>
        <v-main class="poly-page">
          <router-view />
        </v-main>
      </v-layout>
    </v-app>
  </ClerkLoaded>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { SignedIn, ClerkLoaded } from '@clerk/vue'
import PolyNav from './components/shared/base/PolyNav.vue'

const { mobile } = useDisplay()

const leftDrawerOpen = ref(!mobile.value)
</script>

<style lang="scss" scoped>
// Bookmark Menu Button
.bookmark-menu-btn {
  position: fixed;
  top: 1px;
  left: -35px;
  width: 80px;
  height: 60px;
  background: rgb(var(--v-theme-primary));
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  cursor: pointer;
  transition: left 0.2s ease;
  z-index: 3000; // Higher than drawer (2000)
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);

  // Bookmark notch
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 15px solid rgb(var(--v-theme-primary));
  }

  @media (min-width: 601px) {
    // When drawer is open, move with it
    &.drawer-open {
      left: 275px; // Match your drawer width
      width: 50px;
    }
  }

  // Hover behavior (desktop only, when drawer is closed)
  &:hover:not(.drawer-open) {
    left: 0;
  }

  // Always visible on mobile
  @media (max-width: 600px) {
    left: 0;
    top: 16px;
    width: 45px;
    height: 50px;

    &.drawer-open {
      left: 275px; // Still moves with drawer on mobile
    }
  }
}
</style>
