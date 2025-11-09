<template>
  <v-card-text class="text-caption text-center pa-0">Please login to continue</v-card-text>

  <v-card-text class="pb-0 pt-0">
    <v-form
      ref="formRef"
      @submit.prevent="login">
      <v-text-field
        v-model="data.email"
        label="Email"
        type="email"
        autocomplete="email"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details="auto"
        class="mb-4" />

      <v-text-field
        v-model="data.password"
        label="Password"
        type="password"
        autocomplete="password"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details="auto"
        class="mb-2" />

      <a
        href="#"
        class="text-caption text-primary text-decoration-none"
        @click.prevent="session.setAuthState(AuthState.Reset)">
        Forgot password?
      </a>
    </v-form>
  </v-card-text>

  <v-card-text class="d-flex justify-center pb-0 pt-2 ma-0">
    <v-btn
      color="primary"
      type="submit"
      size="large"
      class="w-75"
      @click="login">
      Continue
    </v-btn>
  </v-card-text>

  <v-card-text class="d-flex justify-center align-center ma-0 pt-2 pb-2">
    <span class="text-body-2">
      Don't have an account?
      <a
        href="#"
        class="text-primary text-decoration-none ml-2"
        @click.prevent="session.setAuthState(AuthState.Register)">
        Register
      </a>
    </span>
  </v-card-text>

  <v-divider class="mb-0" />

  <v-card-text class="d-flex justify-center text-body-2 pa-0 mt-3 mb-3">Sign in with</v-card-text>

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
import { useSessionStore, AuthState, UserState } from '@/stores/sessionStore'
import { useSignIn } from '@clerk/vue'

const session = useSessionStore()
const formRef = ref()
const loading = ref(false)
const error = ref<string | null>(null)
const { signIn, setActive } = useSignIn()

const data = ref({
  email: '',
  password: '',
})

const login = async () => {
  if (!signIn.value || !setActive.value) return

  loading.value = true
  error.value = null

  try {
    const result = await signIn.value.create({
      identifier: data.value.email,
      password: data.value.password,
    })

    if (result.status === 'complete') {
      // Set the active session
      await setActive.value({ session: result.createdSessionId })
      session.setUserState(UserState.Active)
      session.setAuthState(AuthState.None)
    } else {
      // Handle other statuses (needs verification, etc.)
      console.log('Sign in status:', result.status)
      error.value = 'Additional verification required'
    }
  } catch (err: any) {
    console.error('Sign in error:', err)

    // Handle Clerk errors
    if (err.errors) {
      error.value =
        err.errors[0]?.longMessage || err.errors[0]?.message || 'Invalid email or password'
    } else {
      error.value = 'An error occurred during sign in'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.w-75 {
  width: 75%;
}
</style>
