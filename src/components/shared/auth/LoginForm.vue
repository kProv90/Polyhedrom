<template>
  <q-card-section class="flex flex-center q-pa-none">
    <q-avatar size="128px" class="q-ma-none" square style="height: 80px">
      <img src="/src/assets/logo.svg" />
    </q-avatar>
  </q-card-section>
  <q-card-section class="flex flex-center q-pa-sm">
    <div class="text-h6">Polyhedrom</div>
  </q-card-section>
  <q-card-section class="text-caption text-center q-pa-none">
    Please login to continue
  </q-card-section>

  <q-card-section>
    <q-form class="q-gutter-md">
      <q-input
        v-model="data.email"
        label="Email"
        type="email"
        autocomplete="email"
        dense
        outlined
        clearable
      />
      <q-input
        v-model="data.password"
        label="Password"
        type="password"
        autocomplete="current-password"
        dense
        outlined
        clearable
      />
      <a href="#" class="text-caption">Forgot password?</a>
    </q-form>
  </q-card-section>
  <span class="flex flex-center q-mb-lg q-gutter-md">
    <q-btn label="Continue" color="primary" style="width: 75%" />
  </span>
  <span class="flex flex-center q-mb-md q-gutter-md">
    Don't have an account?
    <a
      href="#"
      @click="session.auth = AuthState.Register"
      class="q-mt-none q-ml-sm"
      >Register</a
    >
  </span>
  <q-separator class="q-mb-sm" />
  <span class="flex flex-center q-mb-sm">Sign in with</span>
  <q-card-section class="flex flex-center q-pa-none q-mb-md q-gutter-sm">
    <div class="dummy-box"></div>
    <div class="dummy-box"></div>
    <div class="dummy-box"></div>
  </q-card-section>
</template>
<style scoped>
.dummy-box {
  height: 64px;
  width: 64px;
  background-color: #f5f5f5;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
}
</style>
<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore, AuthState } from "src/stores/sessionStore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const session = useSessionStore();
const auth = getAuth();

const data = ref({
  email: "",
  password: "",
});
</script>
