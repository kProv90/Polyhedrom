<template>
  <q-card-section class="flex flex-center column q-pa-none">
    <q-avatar size="128px" class="q-ma-none" square style="height: 80px">
      <img src="/src/assets/logo.svg" />
    </q-avatar>
  </q-card-section>

  <q-card-section class="flex flex-center q-pa-sm">
    <div class="text-h6">Verify Your Account</div>
  </q-card-section>

  <q-card-section class="text-caption text-center">
    We have sent a verification link to your email. Please click the link to
    verify your account. Once verified, click the button below to continue.
  </q-card-section>

  <span class="flex flex-center q-mb-lg q-gutter-md">
    <q-btn
      color="primary"
      outline
      label="Resend Email"
      @click="resendEmail"
      style="width: 35%"
      :disable="resendCooldown > 0"
    >
      <q-tooltip v-if="resendCooldown > 0">
        Wait {{ resendCooldown }}s before resending
      </q-tooltip>
    </q-btn>
    <q-btn
      :label="buttonLabel"
      color="primary"
      style="width: 35%"
      @click="checkVerification"
      :loading="checking"
      :disable="cooldownActive"
    />
  </span>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useSessionStore, AuthState } from "src/stores/sessionStore";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const auth = getAuth();
const session = useSessionStore();
const router = useRouter();
const $q = useQuasar();

const checking = ref(false);
const cooldownSeconds = ref(0);
const resendCooldown = ref(0);
let cooldownTimer: NodeJS.Timeout | null = null;
let resendTimer: NodeJS.Timeout | null = null;

const cooldownActive = computed(() => cooldownSeconds.value > 0);

const buttonLabel = computed(() => {
  if (checking.value) return "Checking...";
  if (cooldownSeconds.value > 0) return `Wait ${cooldownSeconds.value}s`;
  return "Check Status";
});

async function checkVerification() {
  checking.value = true;

  try {
    // Reload user data to get fresh verification status
    await auth.currentUser?.reload();

    if (auth.currentUser?.emailVerified) {
      session.user = auth.currentUser;

      $q.notify({
        type: "positive",
        message: "Thank you for verifying your email! Welcome to Polyhedrom.",
      });

      // router.push("/dashboard");

      session.auth = AuthState.None;
    } else {
      $q.notify({
        type: "warning",
        message:
          "Email not verified yet. Please check your inbox and click the verification link.",
      });

      // Start 30-second cooldown
      startCooldown();
    }
  } catch (error) {
    console.error("Error checking verification:", error);
    $q.notify({
      type: "negative",
      message: "Error checking verification status",
    });
  } finally {
    checking.value = false;
  }
}

function startCooldown() {
  cooldownSeconds.value = 30;

  cooldownTimer = setInterval(() => {
    cooldownSeconds.value--;

    if (cooldownSeconds.value <= 0) {
      clearInterval(cooldownTimer!);
      cooldownTimer = null;
    }
  }, 1000);
}

async function resendEmail() {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);

      $q.notify({
        type: "positive",
        message: "Verification email resent!",
      });

      // Start 60-second cooldown for resend
      resendCooldown.value = 60;
      resendTimer = setInterval(() => {
        resendCooldown.value--;
        if (resendCooldown.value <= 0) {
          clearInterval(resendTimer!);
          resendTimer = null;
        }
      }, 1000);
    }
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Failed to resend email",
    });
  }
}

// Cleanup timers when component unmounts
onUnmounted(() => {
  if (cooldownTimer) clearInterval(cooldownTimer);
  if (resendTimer) clearInterval(resendTimer);
});
</script>
