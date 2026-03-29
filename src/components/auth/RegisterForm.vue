<template>
  <v-card-text class="text-caption text-center pa-0 mb-3">
    Please fill out the form below
    <br />
    to create a new account
  </v-card-text>

  <v-card-text class="pb-0 pt-0">
    <v-form
      ref="formRef"
      @submit.prevent="register">
      <v-text-field
        v-model="handle"
        label="Handle"
        type="text"
        autocomplete="username"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details="auto"
        :error="!!errors.handle"
        :error-messages="errors.handle"
        :rules="handleRules"
        @update:model-value="errors.handle = ''"
        class="mb-4">
        <template v-slot:prepend-inner>
          <v-icon icon="mdi-at" />
        </template>
      </v-text-field>

      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        autocomplete="email"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details="auto"
        :error="!!errors.email"
        :error-messages="errors.email"
        :rules="emailRules"
        @update:model-value="errors.email = ''"
        class="mb-4" />

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        autocomplete="new-password"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details="auto"
        :error="!!errors.password"
        :error-messages="errors.password"
        :rules="passwordRules"
        @update:model-value="errors.password = ''"
        class="mb-4" />

      <v-text-field
        v-model="confPass"
        label="Confirm Password"
        type="password"
        autocomplete="new-password"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details="auto"
        :error="!!errors.confPass"
        :error-messages="errors.confPass"
        :rules="[(val: string) => val === password || 'Passwords do not match']"
        class="mb-2" />
    </v-form>
  </v-card-text>

  <v-card-text class="d-flex justify-center pb-0 pt-2 ma-0">
    <v-btn
      color="primary"
      type="submit"
      size="large"
      class="w-75"
      :loading="isRegistering"
      @click="register">
      Continue
    </v-btn>
  </v-card-text>

  <v-card-text class="d-flex justify-center align-center ma-0 pt-2 pb-2">
    <span class="text-body-2">
      Already have an account?
      <a
        href="#"
        class="text-primary text-decoration-none ml-2"
        @click.prevent="session.setAuthState(AuthState.Login)">
        Login
      </a>
    </span>
  </v-card-text>

  <v-divider class="mb-0" />

  <v-card-text class="d-flex justify-center text-body-2 pa-0 mt-3 mb-3">Sign up with</v-card-text>

  <v-card-text class="d-flex justify-center pa-0 mb-4">
    <div class="d-flex ga-2">
      <div class="dummy-box">Google</div>
      <div class="dummy-box">Apple</div>
      <div class="dummy-box">Discord</div>
      <div class="dummy-box">GitHub</div>
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore, AuthState } from '@/stores/sessionStore'
import { handleRules, emailRules, passwordRules } from './constants'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const session = useSessionStore()
const formRef = ref()

const handle = ref('')
const email = ref('')
const password = ref('')
const confPass = ref('')
const isRegistering = ref(false)

const errors = ref({
  handle: '',
  email: '',
  password: '',
  confPass: '',
})

async function register() {
  try {
    errors.value = { handle: '', email: '', password: '', confPass: '' }

    const { valid } = await formRef.value.validate()
    if (!valid) return

    isRegistering.value = true

    const credential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await updateProfile(credential.user, { displayName: handle.value })
    await sendEmailVerification(credential.user)
    session.setAuthState(AuthState.Verify)
  } catch (error: any) {
    console.error(error)
    const code = error.code || ''
    switch (code) {
      case 'auth/email-already-in-use':
        errors.value.email = 'This email is already registered'
        break
      case 'auth/weak-password':
        errors.value.password = 'Password should be at least 6 characters'
        break
      case 'auth/invalid-email':
        errors.value.email = 'Invalid email address'
        break
      default:
        errors.value.email = error.message || 'Registration failed. Please try again.'
    }
  } finally {
    isRegistering.value = false
  }
}
</script>

<style scoped>
.w-75 {
  width: 75%;
}
</style>
