<template>
  <v-navigation-drawer
    class="position-fixed"
    :permanent="!mobile"
    width="275">
    <v-list-item
      height="77"
      :prepend-avatar="profile.avatar"
      :subtitle="profile.handle"
      :title="profile.email">
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
            <v-list-item @click="clerk?.signOut()">
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
      :lines="false"
      density="comfortable"
      nav>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        @click.prevent="router.push(item.route)"
        color="primary">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
      <div class="text-subtitle-1 mt-3 mb-2">Tools</div>
      <v-list-item
        v-for="(tool, i) in tools"
        :key="i"
        :value="tool"
        color="primary">
        <template v-slot:prepend>
          <v-icon :icon="tool.icon"></v-icon>
        </template>
        <v-list-item-title v-text="tool.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style>
.v-list-item-subtitle {
  min-height: 20px;
}
</style>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore, UserState } from '@/stores/sessionStore'
import { useDisplay } from 'vuetify'
import { useUser, useClerk } from '@clerk/vue'

const clerk = useClerk()
const { user } = useUser()
const router = useRouter()
const session = useSessionStore()
const { mobile } = useDisplay()

const profile = computed(() => {
  return {
    email: user.value?.emailAddresses[0]?.emailAddress.split('@')[0] || 'ERROR',
    handle: '@' + user.value?.username || 'ERROR',
    avatar: user.value?.imageUrl || 'https://cdn.vuetifyjs.com/images/john.png',
  }
})

export interface NavItemProps {
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
]

const tools: NavItemProps[] = [{ text: 'Dice Roller', icon: 'mdi-dice-6', route: '/dice' }]

const handleNavClick = (item: NavItemProps) => {
  if (item.action) {
    item.action()
  } else if (item.route) {
    router.push(item.route)
  }
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
