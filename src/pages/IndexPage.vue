<template>
  <q-page class="poly-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="text-center">
          <h1 class="hero-title">
            Welcome to <span class="animated-text">Polyhedrom</span>
          </h1>
          <p class="hero-subtitle">
            Your digital toolkit for tabletop RPG campaigns
          </p>
          <div class="hero-actions q-mt-lg">
            <q-btn
              size="lg"
              color="primary"
              rounded
              label="Get Started"
              class="q-mr-md"
              @click="handleSignUp"
            />
            <q-btn
              size="lg"
              outline
              color="primary"
              rounded
              label="Learn More"
              @click="scrollToFeatures"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section" id="features">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="section-title">Everything You Need</h2>
          <p class="section-subtitle">Tools to enhance your D&D experience</p>
        </div>

        <div class="row q-col-gutter-lg">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="col-12 col-md-6 col-lg-4"
          >
            <q-card class="feature-card">
              <q-card-section class="text-center">
                <q-icon
                  :name="feature.icon"
                  size="48px"
                  :color="feature.color"
                  class="q-mb-md"
                />
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <q-card class="cta-card">
          <q-card-section class="text-center">
            <h2 class="cta-title">Ready to Start Your Adventure?</h2>
            <p class="cta-subtitle">
              Join other DMs and players using Polyhedrom
            </p>
            <q-btn
              size="lg"
              color="primary"
              rounded
              label="Create Account"
              class="q-mt-md"
              @click="handleSignUp"
            />
          </q-card-section>
        </q-card>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white">
      <div class="container q-pa-lg">
        <div class="row q-col-gutter-lg">
          <!-- Company Info -->
          <div class="col-12 col-md-4">
            <div class="text-h6 q-mb-md">
              <q-icon name="mdi-dice-6" size="24px" class="q-mr-sm" />
              Polyhedrom
            </div>
            <p class="text-body2">
              Your digital toolkit for tabletop RPG campaigns. Built by gamers,
              for gamers.
            </p>
            <p class="text-caption">
              © 2024 Tableside LLC. All rights reserved.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="col-12 col-sm-6 col-md-2">
            <div class="text-h6 q-mb-md">Product</div>
            <div class="column">
              <q-btn
                flat
                align="left"
                no-caps
                label="Features"
                class="text-body2 q-pa-none q-mb-xs"
                @click="scrollToFeatures"
              />
              <q-btn
                flat
                align="left"
                no-caps
                label="Pricing"
                class="text-body2 q-pa-none q-mb-xs"
                @click="router.push('/pricing')"
              />
              <q-btn
                flat
                align="left"
                no-caps
                label="Changelog"
                class="text-body2 q-pa-none q-mb-xs"
                @click="router.push('/changelog')"
              />
            </div>
          </div>

          <!-- Support Links -->
          <div class="col-12 col-sm-6 col-md-2">
            <div class="text-h6 q-mb-md">Support</div>
            <div class="column">
              <q-btn
                flat
                align="left"
                no-caps
                label="Help Center"
                class="text-body2 q-pa-none q-mb-xs"
                @click="router.push('/help')"
              />
              <q-btn
                flat
                align="left"
                no-caps
                label="Contact Us"
                class="text-body2 q-pa-none q-mb-xs"
                @click="router.push('/contact')"
              />
              <q-btn
                flat
                align="left"
                no-caps
                label="Bug Report"
                class="text-body2 q-pa-none q-mb-xs"
                @click="router.push('/bug-report')"
              />
            </div>
          </div>

          <!-- Legal Links -->
          <div class="col-12 col-sm-6 col-md-2">
            <div class="text-h6 q-mb-md">Legal</div>
            <div class="column">
              <q-btn
                flat
                align="left"
                no-caps
                label="Privacy Policy"
                class="text-body2 q-pa-none q-mb-xs"
                @click="router.push('/privacy')"
              />
              <q-btn
                flat
                align="left"
                no-caps
                label="Terms of Service"
                class="text-body2 q-pa-none q-mb-xs"
                @click="router.push('/terms')"
              />
              <q-btn
                flat
                align="left"
                no-caps
                label="Cookie Policy"
                class="text-body2 q-pa-none q-mb-xs"
                @click="router.push('/cookies')"
              />
            </div>
          </div>

          <!-- Social & Connect -->
          <div class="col-12 col-sm-6 col-md-2">
            <div class="text-h6 q-mb-md">Connect</div>
            <div class="row q-gutter-sm q-mb-md">
              <q-btn
                flat
                round
                icon="mdi-twitter"
                size="sm"
                @click="openLink('https://twitter.com/tableside')"
              />
              <q-btn
                flat
                round
                icon="mdi-discord"
                size="sm"
                @click="openLink('https://discord.gg/tableside')"
              />
              <q-btn
                flat
                round
                icon="mdi-reddit"
                size="sm"
                @click="openLink('https://reddit.com/r/tableside')"
              />
            </div>
            <p class="text-caption">
              Join our community of tabletop enthusiasts!
            </p>
          </div>
        </div>

        <!-- Bottom Bar -->
        <q-separator class="q-my-md" />
        <div class="row items-center">
          <div class="col-12 col-md-6">
            <p class="text-caption q-ma-none">
              Made with ❤️ for the tabletop gaming community
            </p>
          </div>
          <div class="col-12 col-md-6 text-right">
            <p class="text-caption q-ma-none">
              Version 1.0.0 | Built with Quasar & Vue
            </p>
          </div>
        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore, AuthState } from "src/stores/sessionStore";
import { useRouter } from "vue-router";

const router = useRouter();
const session = useSessionStore();

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const features = ref<Feature[]>([
  {
    id: 1,
    title: "Campaign Management",
    description: "Organize your campaigns with notes, NPCs, and locations.",
    icon: "mdi-book-open-variant",
    color: "primary",
  },
  {
    id: 2,
    title: "Character Sheets",
    description: "Digital character sheets that sync across devices.",
    icon: "mdi-account-group",
    color: "secondary",
  },
  {
    id: 3,
    title: "Dice Rolling",
    description: "Virtual dice with custom sets and roll history.",
    icon: "mdi-dice-6",
    color: "accent",
  },
  {
    id: 4,
    title: "Inventory Management",
    description: "Track equipment, loot, and magic items easily.",
    icon: "mdi-treasure-chest",
    color: "primary",
  },
  {
    id: 5,
    title: "Session Planning",
    description: "Plan encounters and track initiative order.",
    icon: "mdi-calendar-check",
    color: "secondary",
  },
  {
    id: 6,
    title: "Party Collaboration",
    description: "Share notes and handouts with your party.",
    icon: "mdi-account-multiple",
    color: "accent",
  },
]);

const handleSignUp = () => {
  session.auth = AuthState.Register;
};

const scrollToFeatures = () => {
  document.getElementById("features")?.scrollIntoView({
    behavior: "smooth",
  });
};

const openLink = (url: string) => {
  window.open(url, "_blank");
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Hero Section
.hero-section {
  padding: 120px 0 80px;
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
    color: $primary;
  }
  66% {
    color: $secondary;
  }
  33% {
    color: $accent;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: $grey-7;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
}

.hero-actions {
  @media (max-width: 600px) {
    .q-btn {
      display: block;
      width: 100%;
      margin: 0.5rem 0;
    }
  }
}

// Features Section
.features-section {
  padding: 80px 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: $grey-7;
}

.feature-card {
  height: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: $grey-7;
  line-height: 1.5;
}

// CTA Section
.cta-section {
  padding: 80px 0;
  background: $grey-1;
}

.cta-card {
  padding: 40px 20px;
  border-radius: 12px;
}

.cta-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: $grey-7;
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
</style>
