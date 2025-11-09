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
        @click.prevent="session.auth = AuthState.Login">
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
import { useSignUp } from '@clerk/vue'

const session = useSessionStore()
const formRef = ref()
const { signUp, isLoaded } = useSignUp()

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
    if (!isLoaded.value || !signUp.value) {
      throw new Error('[clerk] Error: signUp is not loaded')
    }
    // Clear previous errors
    errors.value = {
      handle: '',
      email: '',
      password: '',
      confPass: '',
    }

    // Validate form
    const { valid } = await formRef.value.validate()
    if (!valid) return

    isRegistering.value = true

    // Step 1: Create the sign-up
    await signUp.value.create({
      emailAddress: email.value,
      password: password.value,
      username: handle.value,
    })

    // Step 2: Prepare email verification
    await signUp.value.prepareEmailAddressVerification({
      strategy: 'email_code',
    })

    // Step 3: Store email and switch to verify state
    session.email = email.value // Store for VerifyForm
    session.setAuthState(AuthState.Verify)
  } catch (error: any) {
    console.error(error)

    if (error.errors && error.errors.length > 0) {
      error.errors.forEach((err: any) => {
        switch (err.meta?.paramName) {
          case 'password':
            errors.value.password = err.message
            break
          case 'email_address':
            errors.value.email = err.message
            break
          case 'username':
            errors.value.handle = err.message
            break
          default:
            console.error('Unhandled error:', err)
            break
        }
      })
    } else {
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
