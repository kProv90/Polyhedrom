<template>
  <v-card-text class="text-caption text-center pa-0 mb-3">
    A verification link has been sent to your email.
    <br />
    Click the link in your inbox, then press the button below.
  </v-card-text>

  <v-card-text class="pb-0 pt-0">
    <v-form
      ref="formRef"
      @submit.prevent="handleVerify">
      <!-- Email Display (read-only) -->
      <v-text-field
        :model-value="email"
        type="email"
        density="compact"
        variant="outlined"
        disabled
        hide-details="auto"
        class="mb-4 centered-email" />

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="text-error text-caption mt-2 mb-2">
        {{ errorMessage }}
      </div>

      <!-- Resend Link -->
      <div class="text-center mt-3 mb-2">
        <a
          v-if="!isResending && canResend"
          href="#"
          class="text-caption text-primary text-decoration-none"
          @click.prevent="handleResend">
          Didn't receive an email? Resend
        </a>
        <span
          v-else-if="!canResend"
          class="text-caption text-medium-emphasis">
          Resend available in {{ resendTimer }}s
        </span>
        <span
          v-else
          class="text-caption text-medium-emphasis">
          Sending email...
        </span>
      </div>
    </v-form>
  </v-card-text>

  <v-card-text class="d-flex justify-center pb-0 pt-2 ma-0">
    <v-btn
      color="primary"
      type="submit"
      size="large"
      class="w-75"
      :loading="isVerifying"
      @click="handleVerify">
      I've Verified My Email
    </v-btn>
  </v-card-text>

  <v-card-text class="d-flex justify-center align-center ma-0 pt-2 pb-4">
    <span class="text-body-2">
      Wrong email?
      <a
        href="#"
        class="text-primary text-decoration-none ml-2"
        @click.prevent="session.setAuthState(AuthState.Register)">
        Go back
      </a>
    </span>
  </v-card-text>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSessionStore, AuthState, UserState } from '@/stores/sessionStore'
import { sendEmailVerification, reload } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const session = useSessionStore()
const formRef = ref()

const email = computed(() => auth.currentUser?.email || '')
const isVerifying = ref(false)
const isResending = ref(false)
const errorMessage = ref('')
const resendTimer = ref(0)
let resendInterval: number | null = null

const canResend = computed(() => resendTimer.value === 0 && !isResending.value)

const startResendTimer = () => {
  resendTimer.value = 60
  resendInterval = window.setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0 && resendInterval) {
      clearInterval(resendInterval)
      resendInterval = null
    }
  }, 1000)
}

async function handleVerify() {
  const user = auth.currentUser
  if (!user) return

  errorMessage.value = ''
  isVerifying.value = true

  try {
    await reload(user)
    if (user.emailVerified) {
      // Register user in Firestore via API
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          plan: 'free',
        }),
      })
      session.setUserState(UserState.Active)
      session.setAuthState(AuthState.None)
    } else {
      errorMessage.value =
        'Email not yet verified. Please check your inbox and click the verification link.'
    }
  } catch (error: any) {
    console.error('Verification check error:', error)
    errorMessage.value = 'Failed to check verification status. Please try again.'
  } finally {
    isVerifying.value = false
  }
}

async function handleResend() {
  const user = auth.currentUser
  if (!canResend.value || !user) return

  isResending.value = true
  errorMessage.value = ''

  try {
    await sendEmailVerification(user)
    startResendTimer()
  } catch (error: any) {
    console.error('Resend error:', error)
    errorMessage.value = error.message || 'Failed to resend email. Please try again.'
  } finally {
    isResending.value = false
  }
}

onMounted(() => {
  startResendTimer()
})

onUnmounted(() => {
  if (resendInterval) clearInterval(resendInterval)
})

// Cleanup on unmount
onUnmounted(() => {
  if (resendInterval) {
    clearInterval(resendInterval)
  }
})
</script>

<style scoped>
.w-75 {
  width: 75%;
}

.centered-email :deep(input) {
  text-align: center;
  font-weight: 500;
}
</style>
