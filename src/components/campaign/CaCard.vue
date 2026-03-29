<template>
  <v-card class="ca-card" rounded="lg" elevation="2">

    <v-img :src="campaign.image" height="140" cover class="ca-card-img">
      <div class="ca-card-status">
        <v-chip size="x-small" :color="statusColor" variant="flat">{{ campaign.status }}</v-chip>
      </div>
    </v-img>

    <v-card-text class="pb-2">
      <div class="font-weight-bold text-body-1 mb-1 text-truncate">{{ campaign.title }}</div>
      <div class="text-caption text-medium-emphasis mb-3 ca-desc">{{ campaign.description }}</div>

      <v-tooltip location="top">
        <template #activator="{ props }">
          <div class="ca-avatars" v-bind="props">
            <v-avatar
              v-for="(player, i) in campaign.players"
              :key="player.name"
              :image="player.avatar"
              size="28"
              :style="{ marginLeft: i === 0 ? '0' : '-8px', zIndex: campaign.players.length - i }"
              class="ca-avatar" />
            <div v-if="campaign.players.length > 4" class="ca-avatar-more text-caption">
              +{{ campaign.players.length - 4 }}
            </div>
          </div>
        </template>
        <span>{{ campaign.players.map(p => p.name).join(', ') }}</span>
      </v-tooltip>
    </v-card-text>

    <v-card-actions class="pt-0 px-3 pb-3">
      <v-menu location="bottom start">
        <template #activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props" />
        </template>
        <v-list density="compact">
          <v-list-item prepend-icon="mdi-eye-outline" title="View Details" />
          <v-list-item prepend-icon="mdi-share-variant-outline" title="Share" />
          <v-list-item prepend-icon="mdi-account-plus-outline" title="Invite Players" />
          <v-list-item prepend-icon="mdi-archive-outline" title="Archive" />
          <v-divider />
          <v-list-item prepend-icon="mdi-delete-outline" title="Delete" class="text-error" />
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn prepend-icon="mdi-pencil-outline" variant="outlined" size="small" rounded="pill">Edit</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ campaign: Campaign }>()

const statusColor = computed(() =>
  props.campaign.status === 'Active' ? 'success'
  : props.campaign.status === 'Paused' ? 'warning'
  : 'surface'
)
</script>

<style scoped>
.ca-card {
  display: flex;
  flex-direction: column;
  transition: background-color 0.15s ease;
}

.ca-card:hover {
  background-color: rgba(255, 255, 255, 0.06) !important;
}

.ca-card-img {
  position: relative;
}

.ca-card-status {
  position: absolute;
  top: 8px;
  right: 8px;
}

.ca-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ca-avatars {
  display: flex;
  align-items: center;
}

.ca-avatar {
  border: 2px solid rgb(var(--v-theme-surface));
}

.ca-avatar-more {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgb(var(--v-theme-surface));
  border: 2px solid rgb(var(--v-theme-surface));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
  color: rgb(var(--v-theme-on-surface));
  font-size: 10px;
}
</style>
