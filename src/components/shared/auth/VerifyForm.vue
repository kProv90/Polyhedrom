<template>
  <q-card-section class="flex flex-center q-pa-none">
    <q-avatar size="128px" class="q-ma-none" square style="height: 80px">
      <img src="/src/assets/logo.svg" />
    </q-avatar>
  </q-card-section>
  <q-card-section class="flex flex-center q-pa-sm">
    <div class="text-h6">Polyhedrom</div>
  </q-card-section>
  <q-card-section class="text-caption text-center">
    We have sent a verification link to your email. Please click the link to
    verify your account. Once your account is verified, this window will close
    automatically.
  </q-card-section>
  <q-span class="flex flex-center">
    <q-linear-progress indeterminate />
  </q-span>
</template>
<style scoped></style>
<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore, AuthState } from "src/stores/sessionStore";
const session = useSessionStore();

const data = ref({
  code: "",
});
</script>
