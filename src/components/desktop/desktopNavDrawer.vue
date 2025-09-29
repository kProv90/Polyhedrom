<template>
  <q-list>
    <q-item clickable @click="login">
      <q-item-section avatar>
        <q-avatar size="36px">
          <img v-if="user" src="https://cdn.quasar.dev/img/boy-avatar.png" />
          <q-icon v-else name="mdi-account-circle" size="36px" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ user ? user.display : "Guest" }}
        </q-item-label>
        <q-item-label caption>
          {{ user ? user.handle : "Login | Sign Up" }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item
      v-for="item in items"
      :key="item.title"
      clickable
      @click="item.action"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>
        {{ item.title }}
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
import type { NavMenuItem } from "src/components/shared/data/models";
defineProps<{
  miniState: boolean;
  items: Array<NavMenuItem>;
  user: object | null;
  login: () => void;
}>();
</script>
