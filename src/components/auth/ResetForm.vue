<template>
  <v-card-text class="d-flex text-caption text-center pa-0 pr-4 pl-4">
    Please enter your account email address in the form below. If your account exists, you will
    receive an email with instructions to reset your password.
  </v-card-text>

  <v-card-text class="pb-0 pt-0">
    <v-form
      ref="formRef"
      @submit.prevent="handleReset">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        autocomplete="email"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details="auto"
        :rules="emailRules" />

      <v-otp-input
        v-if="showOtp"
        v-model="otp"
        length="6"
        variant="outlined" />
    </v-form>
  </v-card-text>

  <v-card-text class="d-flex justify-center pb-0 pt-2 ma-0">
    <div class="d-flex flex-column w-75">
      <v-btn
        variant="outlined"
        color="primary"
        size="large"
        class="mb-2"
        @click="session.setAuthState(AuthState.Login)">
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        type="submit"
        size="large"
        :loading="isSubmitting"
        @click="handleReset">
        Submit
      </v-btn>
    </div>
  </v-card-text>

  <v-card-text class="d-flex justify-center align-center ma-0 pt-0 pb-4">
    <span class="text-body-2">
      Remember your password?
      <a
        href="#"
        class="text-primary text-decoration-none ml-2"
        @click.prevent="session.setAuthState(AuthState.Login)">
        Login
      </a>
    </span>
  </v-card-text>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore, AuthState } from '@/stores/sessionStore'

const session = useSessionStore()
const formRef = ref()

const email = ref('')
const otp = ref('')
const showOtp = ref(false)
const isSubmitting = ref(false)

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

async function handleReset() {
  // Validate form
  const { valid } = await formRef.value.validate()
  if (!valid) return

  isSubmitting.value = true

  try {
    // Implement your password reset logic here
    console.log('Reset password for:', email.value)

    // After successful email submission, show OTP input
    // showOtp.value = true
  } catch (error) {
    console.error('Password reset error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped></style>
