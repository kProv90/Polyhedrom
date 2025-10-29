<template>
  <q-card-section class="flex flex-center column q-pa-none">
    <q-avatar size="128px" class="q-ma-none" square style="height: 80px">
      <img src="/src/assets/logo.svg" />
    </q-avatar>
  </q-card-section>
  <q-card-section class="flex flex-center q-pa-sm">
    <div class="text-h6">Password Reset</div>
  </q-card-section>
  <q-card-section class="text-caption text-center">
    Please enter your account email address in the form below. If you account
    exists, you will receive an email with instructions to reset your password.
  </q-card-section>
  <q-card-section>
    <q-input
      v-model="email"
      label="Email"
      type="email"
      autocomplete="email"
      dense
      outlined
    />
  </q-card-section>
  <span class="flex flex-center q-mb-lg q-gutter-md">
    <q-btn
      label="Cancel"
      outline
      color="primary"
      @click="session.auth = AuthState.Login"
      style="width: 35%"
    />
    <q-btn label="Submit" color="primary" style="width: 35%" />
  </span>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore, AuthState } from "src/stores/sessionStore";
const session = useSessionStore();

const email = ref("");
</script>
