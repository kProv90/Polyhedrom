<template>
  <div class="d-flex flex-column align-center justify-center">
    <div class="w-75">
      <!-- Hero Section -->
      <v-container
        class="hero-section"
        fluid>
        <template v-if="!firebaseUser">
          <v-btn
            color="primary"
            class="floating-login-btn bg-surface"
            prepend-icon="mdi-account"
            variant="outlined"
            @click="session.setAuthState(AuthState.Login)">
            Login
          </v-btn>
        </template>
        <v-container>
          <v-row justify="center">
            <v-col
              cols="12"
              class="text-center">
              <h1 class="hero-title">
                Welcome to
                <span class="animated-text">Polyhedrom</span>
              </h1>
              <p class="hero-subtitle pb-8">
                Your digital toolkit and companion for tabletop RPG campaigns
              </p>
              <div class="hero-actions">
                <v-btn
                  size="large"
                  color="primary"
                  rounded
                  class="mr-4 mb-2"
                  @click="handleSignUp">
                  Get Started
                </v-btn>
                <v-btn
                  size="large"
                  variant="outlined"
                  color="primary"
                  rounded
                  class="mb-2"
                  @click="scrollToFeatures">
                  Learn More
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Features Section -->
      <v-container
        class="features-section"
        fluid
        id="features">
        <v-container>
          <v-row justify="center">
            <v-col
              cols="12"
              class="text-center mb-12">
              <h2 class="section-title">Everything You Need</h2>
              <p class="section-subtitle">Tools to enhance your D&D experience</p>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              v-for="feature in features"
              :key="feature.id"
              cols="12"
              md="6"
              lg="3"
              class="d-flex">
              <v-card
                class="feature-card flex-grow-1"
                elevation="2">
                <v-card-text class="text-center pa-6">
                  <v-icon
                    :icon="feature.icon"
                    size="48"
                    :color="feature.color"
                    class="mb-4" />
                  <h3 class="feature-title">{{ feature.title }}</h3>
                  <p class="feature-description">{{ feature.description }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <v-container class="d-flex justify-center align-center text-center">
        <p class="section-subtitle text-center w-75">
          All of these features work hand-in-hand to enhance your D&D experience. Whether you're a
          DM or a player, Polyhedrom has everything you need to make your game more immersive and
          engaging. Our goal is to provide a seamless and enjoyable experience for all users.
        </p>
      </v-container>
      <!-- CTA Section -->
      <v-container
        class="cta-section"
        fluid>
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <v-card
                class="cta-card"
                elevation="4">
                <v-card-text class="text-center pa-8">
                  <h2 class="cta-title">Ready to Start Your Adventure?</h2>
                  <p class="cta-subtitle">Join other DMs and players using Polyhedrom</p>
                  <v-btn
                    size="large"
                    color="primary"
                    rounded
                    class="mt-4"
                    @click="session.setAuthState(AuthState.Register)">
                    Create Account
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </div>
  </div>
  <!-- Footer -->
  <v-footer class="bg-grey-darken-4 text-white pa-8">
    <v-container>
      <v-row>
        <!-- Company Info -->
        <v-col
          cols="12"
          md="4">
          <div class="text-h6 mb-4">
            <v-icon
              icon="mdi-dice-6"
              size="24"
              class="mr-2" />
            Polyhedrom
          </div>
          <p class="text-body-2 mb-4">
            Your digital toolkit for tabletop RPG campaigns. Built by gamers, for gamers.
          </p>
          <p class="text-caption">© 2024 Tableside LLC. All rights reserved.</p>
        </v-col>

        <!-- Quick Links -->
        <v-col
          cols="12"
          sm="6"
          md="2">
          <div class="text-h6 mb-4">Product</div>
          <div class="d-flex flex-column">
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="scrollToFeatures">
              Features
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="router.push('/pricing')">
              Pricing
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="router.push('/changelog')">
              Changelog
            </v-btn>
          </div>
        </v-col>

        <!-- Support Links -->
        <v-col
          cols="12"
          sm="6"
          md="2">
          <div class="text-h6 mb-4">Support</div>
          <div class="d-flex flex-column">
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="router.push('/help')">
              Help Center
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="router.push('/contact')">
              Contact Us
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="router.push('/bug-report')">
              Bug Report
            </v-btn>
          </div>
        </v-col>

        <!-- Legal Links -->
        <v-col
          cols="12"
          sm="6"
          md="2">
          <div class="text-h6 mb-4">Legal</div>
          <div class="d-flex flex-column">
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="router.push('/privacy')">
              Privacy Policy
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="router.push('/terms')">
              Terms of Service
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              class="justify-start pa-0 mb-1 text-body-2"
              @click="router.push('/cookies')">
              Cookie Policy
            </v-btn>
          </div>
        </v-col>

        <!-- Social & Connect -->
        <v-col
          cols="12"
          sm="6"
          md="2">
          <div class="text-h6 mb-4">Connect</div>
          <div class="d-flex mb-4">
            <v-btn
              variant="text"
              icon="mdi-twitter"
              size="small"
              class="mr-2"
              @click="openLink('https://twitter.com/tableside')" />
            <v-btn
              variant="text"
              icon="mdi-discord"
              size="small"
              class="mr-2"
              @click="openLink('https://discord.gg/tableside')" />
            <v-btn
              variant="text"
              icon="mdi-reddit"
              size="small"
              @click="openLink('https://reddit.com/r/tableside')" />
          </div>
          <p class="text-caption">Join our community of tabletop enthusiasts!</p>
        </v-col>
      </v-row>

      <!-- Bottom Bar -->
      <v-divider class="my-6" />
      <v-row align="center">
        <v-col
          cols="12"
          updateAuthState
          md="6">
          <p class="text-caption ma-0">Made with ❤️ for the tabletop gaming community</p>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="text-md-right">
          <p class="text-caption ma-0">Version 1.0.0 | Built with Vuetify & Vue</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>

  <PolyDialog
    v-model="authDlg"
    @close="session.setAuthState(AuthState.None)"
    max-width="400"
    card-style="min-height: 600px">
    <PolyLogo />
    <LoginForm v-if="session.getAuthState() == AuthState.Login" />
    <RegisterForm v-if="session.getAuthState() == AuthState.Register" />
    <ResetForm v-if="session.getAuthState() == AuthState.Reset" />
    <VerifyForm v-if="session.getAuthState() == AuthState.Verify" />
  </PolyDialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useSessionStore, AuthState } from '@/stores/sessionStore'
import { PolyDialog, PolyLogo } from '@/components/ui'
import { LoginForm, RegisterForm, ResetForm, VerifyForm } from '@/components/auth'

const firebaseUser = ref<User | null>(null)
onAuthStateChanged(auth, (u) => {
  firebaseUser.value = u
})

const router = useRouter()
const session = useSessionStore()
const authDlg = computed(() => session.getAuthState() != AuthState.None)

interface Feature {
  id: number
  title: string
  description: string
  icon: string
  color: string
}

const features = ref<Feature[]>([
  {
    id: 1,
    title: 'Campaign Management',
    description: 'Organize your campaigns with notes, NPCs, and locations.',
    icon: 'mdi-book-open-variant',
    color: 'primary',
  },
  {
    id: 2,
    title: 'Sheet Designer',
    description: 'Create custom data sheets for any occasion.',
    icon: 'mdi-view-dashboard-variant',
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Dice Rolling',
    description: 'Virtual dice with custom sets and roll history.',
    icon: 'mdi-dice-6',
    color: 'accent',
  },
  {
    id: 4,
    title: 'Inventory Management',
    description: 'Track equipment, loot, and magic items easily.',
    icon: 'mdi-treasure-chest',
    color: 'primary',
  },
  {
    id: 5,
    title: 'World Planning',
    description: 'Design and manage a living breathing world.',
    icon: 'mdi-earth',
    color: 'secondary',
  },
  {
    id: 6,
    title: 'Party Collaboration',
    description: 'Share notes and handouts with your party.',
    icon: 'mdi-account-multiple',
    color: 'accent',
  },
  {
    id: 7,
    title: 'Initiative Tracker',
    description: 'Track initiative order, manage conditions, monitor statistics.',
    icon: 'mdi-sword-cross',
    color: 'primary',
  },
  {
    id: 8,
    title: 'Artificial Intelligence',
    description: 'Enhance your gaming experience with AI-powered features.',
    icon: 'mdi-memory',
    color: 'secondary',
  },
])

const handleSignUp = () => {
  session.setAuthState(AuthState.Register)
}
const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({
    behavior: 'smooth',
  })
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style lang="scss" scoped>
.poly-page {
  min-height: 100vh;
}

// Hero Section
.hero-section {
  padding: 100px 0 40px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.animated-text {
  animation: colorShift 3s ease-in-out infinite;
}

@keyframes colorShift {
  0%,
  100% {
    color: rgb(var(--v-theme-primary));
  }
  33% {
    color: rgb(var(--v-theme-secondary));
  }
  66% {
    color: rgb(var(--v-theme-accent));
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
}

.hero-actions {
  @media (max-width: 600px) {
    .v-btn {
      display: block;
      width: 100%;
      margin: 0.5rem 0;
    }
  }
}

// Features Section
.features-section {
  padding: 40px 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
}

.feature-card {
  height: 100%;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
    cursor: pointer;
  }
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-description {
  line-height: 1.5;
}

// CTA Section
.cta-section {
  padding: 80px 0;
}

.cta-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hero-section,
  .features-section,
  .cta-section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .cta-title {
    font-size: 1.8rem;
  }
}

.floating-login-btn {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 600px) {
    top: 16px;
    right: 16px;
  }
}
</style>
