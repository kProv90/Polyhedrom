<template>
  <q-layout view="hHh LpR fFf">
    <!-- Bookmark Menu Button -->
    <div
      v-if="session.user"
      class="bookmark-menu-btn"
      :class="{ 'drawer-open': leftDrawerOpen }"
      @click="toggleLeftDrawer"
    >
      <q-icon name="mdi-menu" size="24px" color="white" />
      <q-tooltip>Menu</q-tooltip>
    </div>

    <!-- Floating Login Button -->
    <q-btn
      v-if="!session.user"
      rounded
      size="16px"
      color="primary"
      label="Login"
      class="floating-login-btn"
      @click="login"
    />

    <!-- Navigation Drawer -->
    <q-drawer
      v-if="session.user"
      v-model="leftDrawerOpen"
      :no-swipe-open="session.user ? true : false"
      style="border-right: 1px solid var(--q-primary)"
      :width="275"
    >
      <NavDrawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Login Dialog -->
    <q-dialog
      v-model="dlgLoginOpen"
      :maximized="$q.platform.is.mobile"
      persistent
    >
      <q-card class="q-pa-md" style="min-width: 400px; max-width: 400px">
        <q-bar
          v-if="session.auth !== AuthState.Verify"
          class="bg-white q-pr-sm"
        >
          <q-space />
          <q-btn
            dense
            flat
            icon="mdi-close"
            @click="session.auth = AuthState.None"
          >
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <LoginForm v-if="session.auth === AuthState.Login" />
        <RegisterForm v-else-if="session.auth === AuthState.Register" />
        <VerifyForm v-else-if="session.auth === AuthState.Verify" />
        <ResetForm v-else-if="session.auth === AuthState.Reset" />
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

// Bookmark Menu Button
.bookmark-menu-btn {
  position: fixed;
  top: 24px;
  left: -35px;
  width: 80px;
  height: 60px;
  background: $primary;
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  cursor: pointer;
  transition: left 0.15s ease;
  z-index: 3000; // Higher than drawer (2000)
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);

  // Bookmark notch
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 15px solid $primary;
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

// Floating Login Button
.floating-login-btn {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 600px) {
    top: 16px;
    right: 16px;
  }
}

.q-footer {
  .q-btn {
    color: rgba(255, 255, 255, 0.7);

    &:hover {
      color: white;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import NavDrawer from "src/components/shared/drawer/navDrawer.vue";
import { useSessionStore, AuthState } from "src/stores/sessionStore";
import {
  LoginForm,
  RegisterForm,
  VerifyForm,
  ResetForm,
} from "src/components/shared/auth";

const $q = useQuasar();
const router = useRouter();
const session = useSessionStore();

const leftDrawerOpen = ref(false);

const dlgLoginOpen = computed(() => session.auth !== AuthState.None);
const menuItems = computed(() => {
  if (!session.user) {
    return [];
  } else {
    return [];
  }
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function login() {
  session.auth = AuthState.Login;
}
</script>
