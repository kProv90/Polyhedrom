<template>
  <v-card-text class="text-caption text-center pa-0 mb-3">
    Please enter the verification code
    <br />
    sent to your email address
  </v-card-text>

  <v-card-text class="pb-0 pt-0">
    <v-form
      ref="formRef"
      @submit.prevent="handleVerify">
      <!-- Email Display (read-only) -->
      <v-text-field
        :model-value="'krisprovo0@gmx.com'"
        type="email"
        density="compact"
        variant="outlined"
        disabled
        hide-details="auto"
        class="mb-4 centered-email" />

      <!-- OTP Input -->
      <v-otp-input
        v-model="otp"
        length="6"
        variant="outlined"
        :error="!!errorMessage"
        class="mb-2" />

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="text-error text-caption mt-2 mb-2">
        {{ errorMessage }}
      </div>

      <!-- Resend Code Link -->
      <div class="text-center mt-3 mb-2">
        <a
          v-if="!isResending && canResend"
          href="#"
          class="text-caption text-primary text-decoration-none"
          @click.prevent="handleResend">
          Didn't receive a code? Resend
        </a>
        <span
          v-else-if="!canResend"
          class="text-caption text-medium-emphasis">
          Resend code in {{ resendTimer }}s
        </span>
        <span
          v-else
          class="text-caption text-medium-emphasis">
          Sending code...
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
      :disabled="otp.length !== 6"
      @click="handleVerify">
      Verify
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
import { useSignUp } from '@clerk/vue'

const session = useSessionStore()
const formRef = ref()
const { signUp, setActive, isLoaded } = useSignUp()

const props = defineProps<{
  email?: string
}>()

const otp = ref('')
const isVerifying = ref(false)
const isResending = ref(false)
const errorMessage = ref('')
const resendTimer = ref(0)
let resendInterval: number | null = null

const canResend = computed(() => resendTimer.value === 0 && !isResending.value)

// Start resend timer
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

// Handle verification
async function handleVerify() {
  if (otp.value.length !== 6 || !signUp.value || !isLoaded.value) return

  errorMessage.value = ''
  isVerifying.value = true

  try {
    // Attempt email verification
    const result = await signUp.value.attemptEmailAddressVerification({
      code: otp.value,
    })

    if (result.status === 'complete') {
      // Set the active session
      if (setActive.value) {
        await setActive.value({ session: result.createdSessionId })
      } else {
        // Handle the case when setActive.value is not available
        throw new Error('[clerk] Error: setActive is not available')
      }
      // Update session store
      session.setUserState(UserState.Active)
      session.setAuthState(AuthState.None)
    } else {
      // Handle other statuses
      console.log('Verification status:', result.status)
      errorMessage.value = 'Verification incomplete. Please try again.'
    }
  } catch (error: any) {
    console.error('Verification error:', error)

    if (error.errors && error.errors.length > 0) {
      errorMessage.value = error.errors[0].message
    } else {
      errorMessage.value = 'Invalid verification code. Please try again.'
    }

    otp.value = '' // Clear OTP on error
  } finally {
    isVerifying.value = false
  }
}

// Handle resend code
async function handleResend() {
  if (!canResend.value || !signUp.value) return

  isResending.value = true
  errorMessage.value = ''

  try {
    await signUp.value.prepareEmailAddressVerification({
      strategy: 'email_code',
    })
    startResendTimer()
    console.log('Verification code resent successfully')
  } catch (error: any) {
    console.error('Resend error:', error)
    errorMessage.value = error.message || 'Failed to resend code. Please try again.'
  } finally {
    isResending.value = false
  }
}

// Initialize timer on mount
onMounted(() => {
  startResendTimer()
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
