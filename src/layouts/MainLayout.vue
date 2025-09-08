<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          v-if="$q.platform.is.mobile"
          flat
          round
          dense
          icon="mdi-menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Polyhedrom </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      :width="250"
      :breakpoint="500"
      bordered
    >
      <desktopNavDrawer
        v-if="!$q.platform.is.mobile"
        :miniState="miniState"
        :items="menuItems"
        :user="null"
        :login="login"
      />
      <mobileNavDrawer v-else :items="menuItems" :user="null" :login="login" />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import type { NavMenuItem } from "src/components/shared/models";
import desktopNavDrawer from "src/components/desktop/desktopNavDrawer.vue";
import mobileNavDrawer from "src/components/mobile/mobileNavDrawer.vue";

const $q = useQuasar();
const router = useRouter();

const leftDrawerOpen = ref(true);
const miniState = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const menuItems: NavMenuItem[] = [
  { title: "Home", icon: "mdi-view-dashboard", action: () => router.push("/") },
  {
    title: "About",
    icon: "mdi-information-box",
    action: () => router.push("/about"),
  },
];
</script>
