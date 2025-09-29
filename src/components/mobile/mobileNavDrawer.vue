<template>
  <q-scroll-area
    style="
      height: calc(100% - 150px);
      margin-top: 150px;
      border-right: 1px solid #ddd;
    "
  >
    <q-list>
      <q-item
        v-for="item in items"
        :key="item.title"
        clickable
        @click="item.action()"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>
          {{ item.title }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
  <q-img
    class="absolute-top"
    src="https://cdn.quasar.dev/img/material.png"
    style="height: 150px"
  >
    <div class="absolute-bottom bg-transparent" style="padding-top: 16px">
      <q-avatar size="56px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>

      <div class="text-weight-bold">Razvan Stoenescu</div>
      <div>@rstoenescu</div>
    </div>
  </q-img>
</template>
<script setup lang="ts">
import type { NavMenuItem } from "src/components/shared/data/models";
defineProps<{
  items: Array<NavMenuItem>;
  user: object | null;
  login: () => void;
}>();
</script>
