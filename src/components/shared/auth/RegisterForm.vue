<template>
  <q-card-section class="flex flex-center q-pa-none">
    <q-avatar size="128px" class="q-ma-none" square style="height: 80px">
      <img src="/src/assets/logo.svg" />
    </q-avatar>
  </q-card-section>
  <q-card-section class="flex flex-center q-pa-sm">
    <div class="text-h6">Register</div>
  </q-card-section>
  <q-card-section class="text-caption text-center q-pa-none">
    Please fill out the form below <br />
    to create a new account
  </q-card-section>
  <q-card-section>
    <q-form class="q-gutter-md">
      <q-input
        v-model="data.handle"
        label="Handle"
        type="text"
        dense
        outlined
        :hide-bottom-space="!errors.handle"
        :error="!!errors.handle"
        :error-message="errors.handle"
        :rules="handleRules"
      >
        <template v-slot:prepend> <q-icon name="mdi-at" /> </template>
      </q-input>
      <q-input
        v-model="data.email"
        label="Email"
        type="email"
        autocomplete="email"
        dense
        outlined
        :hide-bottom-space="!errors.email"
        :error="!!errors.email"
        :error-message="errors.email"
        :rules="emailRules"
      />
      <q-input
        v-model="data.password"
        label="Password"
        type="password"
        autocomplete="new-password"
        dense
        outlined
        :hide-bottom-space="!errors.password"
        :error="!!errors.password"
        :error-message="errors.password"
        :rules="passwordRules"
      />
      <q-input
        v-model="data.confPass"
        label="Confirm Password"
        type="password"
        autocomplete="repeat-password"
        dense
        outlined
        :hide-bottom-space="!errors.confPass"
        :error="!!errors.confPass"
        :error-message="errors.confPass"
        :rules="[
          (val: string) => val === data.password || 'Passwords do not match',
        ]"
      />
    </q-form>
  </q-card-section>
  <span class="flex flex-center q-mb-lg q-gutter-md">
    <q-btn
      label="Continue"
      color="primary"
      style="width: 75%"
      :loading="isRegistering"
      @click="register"
    />
  </span>
  <span class="flex flex-center q-mb-md q-gutter-md">
    Already have an account?
    <a
      href="#"
      @click="session.auth = AuthState.Login"
      class="q-mt-none q-ml-sm"
      >Login</a
    >
  </span>
  <q-separator class="q-mb-sm" />
  <span class="flex flex-center q-mb-sm">Sign up with</span>
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
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useSessionStore, AuthState } from "src/stores/sessionStore";
import {
  handleRules,
  passwordRules,
  emailRules,
} from "src/utils/system/dataRules";
import {
  registerUser,
  type RegisterError,
} from "src/utils/firebase/auth/register";
import { sendEmailVerification } from "firebase/auth";
import { getUserHandle } from "src/utils/firebase/user/handles";

const session = useSessionStore();
const $q = useQuasar();

const data = ref({
  handle: "",
  email: "",
  password: "",
  confPass: "",
});

const errors = ref({
  handle: "",
  email: "",
  password: "",
  confPass: "",
});

const isRegistering = ref(false);

async function register() {
  try {
    // Clear any previous errors
    Object.keys(errors.value).forEach((key) => {
      errors.value[key as keyof typeof errors.value] = "";
    });

    isRegistering.value = true;

    // Register the user with our new function
    const result = await registerUser(
      data.value.email,
      data.value.password,
      data.value.handle,
    );

    if (result.error) {
      switch (result.error.field) {
        case "email":
          errors.value.email = result.error.message;
          break;
        case "handle":
          errors.value.handle = result.error.message;
          break;
        case "general":
          $q.notify({
            type: "negative",
            message: result.error.message,
          });
          break;
      }
      return;
    }

    if (result.data) {
      // Send verification email
      await sendEmailVerification(result.data.user);

      // Get the handle from Firestore and update session
      session.user = result.data.user;
      session.handle = await getUserHandle(result.data.user.uid);
      session.auth = AuthState.Verify;
    }
  } finally {
    isRegistering.value = false;
  }
}
</script>
