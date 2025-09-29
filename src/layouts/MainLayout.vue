<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          v-if="session.user"
          flat
          round
          dense
          icon="mdi-menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Polyhedrom </q-toolbar-title>
        <q-space />
        <q-btn
          v-if="!session.user"
          flat
          label="Login"
          @click="login"
          class="text-primary bg-white"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="session.user"
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      :width="250"
      :breakpoint="500"
      bordered
      :no-swipe-open="session.user ? true : false"
    >
      <desktopNavDrawer
        v-if="!$q.platform.is.mobile"
        :miniState="miniState"
        :items="menuItems"
        :user="null"
        :login="login"
      />
      <mobileNavDrawer
        v-if="$q.platform.is.mobile"
        :items="menuItems"
        :user="null"
        :login="login"
      />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="dlgLoginOpen" persistent>
      <q-card class="q-pa-sm" style="min-width: 300px; max-width: 400px">
        <q-bar class="bg-white q-pa-sm">
          <q-space />
          <q-btn
            v-if="session.auth !== AuthState.Verify"
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
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import type { NavMenuItem } from "src/components/shared/data/models";
import desktopNavDrawer from "src/components/desktop/desktopNavDrawer.vue";
import mobileNavDrawer from "src/components/mobile/mobileNavDrawer.vue";
import { useSessionStore, AuthState } from "src/stores/sessionStore";
import {
  LoginForm,
  RegisterForm,
  VerifyForm,
} from "src/components/shared/auth";

const $q = useQuasar();
const router = useRouter();
const session = useSessionStore();

const leftDrawerOpen = ref(false);
const miniState = ref(true);

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
