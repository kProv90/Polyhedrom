<template>
  <div class="d-flex flex-column h-100">
    <!-- Navigation Links -->
    <v-list
      density="compact"
      nav
      class="bg-transparent pa-0"
      mandatory
      style="min-height: 220px"
      v-model:selected="selectedNav">
      <v-list-item
        v-for="item in navItems"
        @click="selectRoot(item.value)"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        rounded
        color="secondary"></v-list-item>
    </v-list>

    <VdUpload />

    <!-- Storage Widget -->
    <div class="px-2 pb-2 text-center">
      <v-progress-circular
        :model-value="storagePercentage"
        color="secondary"
        size="128"
        width="8"
        rounded
        class="mb-2">
        {{ storagePercentage.toFixed(0) }}%
      </v-progress-circular>

      <div class="text-caption text-medium-emphasis mb-4">
        {{ storageUsed }} of {{ storageLimit }} used
      </div>

      <v-btn
        variant="outlined"
        block
        rounded="pill"
        class="text-capitalize">
        Get more storage
      </v-btn>
    </div>
  </div>
</template>
<style scoped>
.spacer {
  min-height: 24px;
}
</style>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useSessionStore } from '@/stores/sessionStore'
import { useDriveStore } from '@/stores/driveStore'
import VdUpload from './VdUpload.vue'

const session = useSessionStore()
const drive = useDriveStore()
const selectedNav = ref(['my-drive'])

const navItems = [
  { title: 'My Drive', icon: 'mdi-cloud-outline', value: 'my-drive', folder: drive.data?.root },
  {
    title: 'Shared with me',
    icon: 'mdi-account-group-outline',
    value: 'shared',
    folder: drive.data?.shared,
  },
  { title: 'Recent', icon: 'mdi-clock-outline', value: 'recent', folder: drive.data?.recent },
  { title: 'Favorites', icon: 'mdi-star-outline', value: 'starred', folder: drive.data?.favorites },
  { title: 'Trash', icon: 'mdi-delete-outline', value: 'trash', folder: drive.data?.trash },
]

const storagePercentage = computed(() => {
  if (!drive.storageLimit) return 0
  return (drive.storageUsed / drive.storageLimit) * 100
})

const storageUsed = computed(() => {
  return formatBytes(drive.storageUsed)
})

const storageLimit = computed(() => {
  return formatBytes(drive.storageLimit)
})

function formatBytes(bytes: number, decimals = 2) {
  if (!bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function selectRoot(item: string) {
  if (!drive.data) return
  switch (item) {
    case 'my-drive':
      drive.navigateTo(drive.data.root.id)
      break
    case 'trash':
      if (!drive.data.trash) return
      drive.navigateTo(drive.data.trash.id)
      break
    case 'shared':
      if (!drive.data.shared) return
      drive.navigateTo(drive.data.shared.id)
      break
    case 'recent':
      if (!drive.data.recent) return
      drive.navigateTo(drive.data.recent.id)
      break
    case 'starred':
      if (!drive.data.favorites) return
      drive.navigateTo(drive.data.favorites.id)
      break
  }
}

onMounted(async () => {
  if (!session.user) {
    await session.fetchUser()
  }
})
</script>
