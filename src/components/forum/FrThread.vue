<template>
  <v-card class="fr-thread on-hover" rounded="lg" elevation="1" @click="$emit('open', thread)">
    <div class="fr-thread-inner">

      <!-- Left: avatar + upvotes -->
      <div class="fr-thread-left">
        <v-avatar :image="thread.avatar" size="36" class="mb-2" />
        <v-icon size="16" color="medium-emphasis">mdi-arrow-up-bold-outline</v-icon>
        <span class="text-caption text-medium-emphasis">{{ thread.upvotes }}</span>
        <v-icon v-if="thread.isLocked" size="14" color="error" class="mt-2">mdi-lock-outline</v-icon>
      </div>

      <!-- Center: content -->
      <div class="fr-thread-content flex-grow-1">
        <div class="d-flex align-center mb-1" style="gap: 6px">
          <v-icon v-if="thread.isPinned" size="14" color="accent">mdi-pin</v-icon>
          <span class="font-weight-bold text-body-1 fr-thread-title">{{ thread.title }}</span>
        </div>
        <div class="text-caption text-medium-emphasis mb-2 fr-thread-excerpt">{{ thread.excerpt }}</div>
        <div class="d-flex align-center flex-wrap" style="gap: 4px">
          <v-chip
            v-for="tag in thread.tags"
            :key="tag"
            size="x-small"
            variant="outlined"
            class="fr-tag">
            {{ tag }}
          </v-chip>
        </div>
        <div class="text-caption text-disabled mt-2">
          by <span class="text-medium-emphasis">{{ thread.author }}</span> · {{ thread.createdAt }}
        </div>
      </div>

      <!-- Right: stats + category + last activity -->
      <div class="fr-thread-stats">
        <v-chip
          size="x-small"
          :color="categoryColor(thread.category)"
          variant="flat"
          class="mb-3">
          {{ thread.category }}
        </v-chip>
        <div class="d-flex align-center mb-1" style="gap: 4px">
          <v-icon size="14" color="medium-emphasis">mdi-comment-outline</v-icon>
          <span class="text-caption text-medium-emphasis">{{ thread.replies }}</span>
        </div>
        <div class="d-flex align-center mb-2" style="gap: 4px">
          <v-icon size="14" color="medium-emphasis">mdi-eye-outline</v-icon>
          <span class="text-caption text-medium-emphasis">{{ thread.views }}</span>
        </div>
        <div class="text-caption text-disabled">{{ thread.lastActivity }}</div>
      </div>

    </div>
  </v-card>
</template>

<script setup lang="ts">
import { categoryColor } from './constants'

defineProps<{ thread: ForumThread }>()
defineEmits<{ open: [thread: ForumThread] }>()
</script>

<style scoped>
.fr-thread {
  cursor: pointer;
}

.fr-thread-inner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 14px 16px;
}

.fr-thread-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  min-width: 40px;
}

.fr-thread-content {
  min-width: 0;
}

.fr-thread-title {
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fr-thread-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fr-thread-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  min-width: 90px;
}

.fr-tag {
  opacity: 0.75;
}
</style>
