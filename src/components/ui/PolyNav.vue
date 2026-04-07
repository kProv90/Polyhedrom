<template>
  <v-navigation-drawer
    class="position-fixed"
    :rail="!isExpanded"
    :permanent="!mobile"
    width="275">
    <v-list
      :lines="false"
      density="comfortable"
      color="primary"
      nav>
      <!-- Logo — home button -->
      <v-list-item
        class="nav-logo-item"
        :ripple="false"
        @click.prevent="router.push('/')">
        <template #prepend>
          <img src="@/assets/logo.svg" class="nav-logo" alt="Polyhedrom" />
        </template>
        <v-list-item-title class="font-weight-bold text-body-1">Polyhedrom</v-list-item-title>
      </v-list-item>
      <v-divider class="mt-2 mb-2" />
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        :active="isRouteActive(item.route)"
        @click.prevent="router.push(item.route)"
        color="primary">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
      <div
        v-if="isExpanded"
        class="text-subtitle-1 mt-3 mb-2">
        Tools
      </div>
      <v-divider
        class="mt-4 mb-4"
        v-else />
      <v-list-item
        v-for="(tool, i) in tools"
        :key="i"
        :value="tool"
        :active="isRouteActive(tool.route)"
        @click.prevent="router.push(tool.route)"
        color="primary">
        <template v-slot:prepend>
          <v-icon :icon="tool.icon"></v-icon>
        </template>
        <v-list-item-title v-text="tool.text"></v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list :lines="false" density="comfortable" nav>
        <v-list-item
          :prepend-icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="toggleTheme">
          <v-list-item-title>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list-item
        :prepend-avatar="profile.avatar"
        class="mb-2">
        <template v-slot:append>
          <v-menu location="bottom right">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-menu-down"
                size="small"
                variant="text" />
            </template>

            <v-list density="compact">
              <v-list-item>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              <v-list-item @click="handleSignOut">
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>
<style>
.v-list-item-subtitle {
  min-height: 20px;
}

.nav-logo-item {
  cursor: pointer;
}

.nav-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
}
</style>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useSessionStore, UserState } from '@/stores/sessionStore'
import { useDisplay } from 'vuetify'
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const firebaseUser = ref<User | null>(null)
onAuthStateChanged(auth, (user) => {
  firebaseUser.value = user
})

const router = useRouter()
const session = useSessionStore()
const { mobile } = useDisplay()
const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)
function toggleTheme() {
  theme.change(isDark.value ? 'light' : 'dark')
}

const isExpanded = ref(false)

const profile = computed(() => ({
  email: firebaseUser.value?.email?.split('@')[0] || 'User',
  handle: '@' + (firebaseUser.value?.displayName || firebaseUser.value?.email?.split('@')[0] || 'user'),
  avatar: firebaseUser.value?.photoURL || 'https://cdn.vuetifyjs.com/images/john.png',
}))

const handleSignOut = () => fbSignOut(auth)

interface NavItemProps {
  text: string
  icon: string
  action?: () => void
  route: string
}

const items: NavItemProps[] = [
  { text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dashboard' },
  { text: 'Characters', icon: 'mdi-account', route: '/characters' },
  { text: 'Campaigns', icon: 'mdi-book', route: '/campaigns' },
  { text: 'Bazaar', icon: 'mdi-storefront', route: '/bazaar' },
  { text: 'Forum', icon: 'mdi-forum', route: '/forum' },
  { text: 'Messages', icon: 'mdi-email', route: '/messages' },
  { text: 'Virtual Drive', icon: 'mdi-folder-multiple', route: '/drive' },
]

const tools: NavItemProps[] = [
  { text: 'The Workshop', icon: 'mdi-hammer-wrench', route: '/workshop' },
  { text: 'Dice Roller', icon: 'mdi-dice-6', route: '/dice' },
]

const handleNavClick = (item: NavItemProps) => {
  if (item.action) {
    item.action()
  } else if (item.route) {
    router.push(item.route)
  }
}

const isRouteActive = (route: string): boolean => {
  const current = router.currentRoute.value.path
  return current === route || current.startsWith(route + '/')
}

const toggleUserMenu = () => {
  // Implement user menu dropdown
  console.log('User menu clicked')
}

const handleLogout = () => {
  // Implement logout logic
  console.log('Logout clicked')
  session.setUserState(UserState.None)
}
</script>
