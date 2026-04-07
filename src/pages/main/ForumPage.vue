<template>
  <div class="fr-page">

    <PolyBanner
      title="Forum"
      subtitle="Community discussion, LFG boards, and homebrew sharing"
      icon="mdi-forum-outline"
      gradient="linear-gradient(135deg, rgb(var(--v-theme-accent)) 0%, rgb(var(--v-theme-warning)) 100%)">
      <v-btn
        prepend-icon="mdi-plus"
        variant="flat"
        rounded="pill"
        class="poly-banner-btn"
        @click="newPostDialog = true">
        New Post
      </v-btn>
    </PolyBanner>

    <div class="fr-body">

      <FrFilters :filters="filters" @update:filters="filters = $event" />

      <!-- Thread List -->
      <div class="flex-grow-1 overflow-y-auto pa-4" style="min-height: 0">
        <div class="d-flex flex-column" style="gap: 8px">
          <FrThread
            v-for="thread in filteredThreads"
            :key="thread.id"
            :thread="thread"
            @open="openThread" />
          <div v-if="!filteredThreads.length" class="fr-empty">
            <v-icon size="64" color="surface-variant" class="mb-3">mdi-forum-outline</v-icon>
            <div class="text-h6 text-medium-emphasis">No threads found</div>
            <div class="text-caption text-medium-emphasis">Try a different category or search term</div>
          </div>
        </div>
      </div>

    </div>

    <FrNewPostDialog v-model="newPostDialog" @create="addThread" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PolyBanner } from '@/components/ui'
import FrThread from '@/components/forum/FrThread.vue'
import FrFilters from '@/components/forum/FrFilters.vue'
import FrNewPostDialog from '@/components/forum/FrNewPostDialog.vue'
import { SORT_OPTIONS } from '@/components/forum/constants'
import { fakeForumThreads } from '@/lib/api/fake'

const newPostDialog = ref(false)

const filters = ref<FrFiltersState>({
  search: '',
  category: 'All',
  sortBy: 'Latest',
  showPinned: false,
  showLocked: true,
})

const threads = ref<ForumThread[]>(fakeForumThreads)

const filteredThreads = computed(() => {
  const { search, category, sortBy, showPinned, showLocked } = filters.value
  let result = [...threads.value]

  if (category !== 'All') {
    result = result.filter(t => t.category === category)
  }

  if (search.trim()) {
    const q = search.toLowerCase()
    result = result.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.excerpt.toLowerCase().includes(q) ||
      t.author.toLowerCase().includes(q)
    )
  }

  if (showPinned) {
    result = result.filter(t => t.isPinned)
  }

  if (!showLocked) {
    result = result.filter(t => !t.isLocked)
  }

  if (sortBy === 'Top') {
    result.sort((a, b) => b.upvotes - a.upvotes)
  } else if (sortBy === 'Most Replies') {
    result.sort((a, b) => b.replies - a.replies)
  }

  // Pinned threads always float to the top
  return [...result.filter(t => t.isPinned), ...result.filter(t => !t.isPinned)]
})

function openThread(thread: ForumThread) {
  // TODO: navigate to thread detail view
  console.log('open thread', thread.id)
}

function addThread(data: Omit<ForumThread, 'id' | 'replies' | 'views' | 'upvotes' | 'createdAt' | 'lastActivity'>) {
  threads.value.unshift({
    id: Date.now(),
    replies: 0,
    views: 0,
    upvotes: 0,
    createdAt: 'Just now',
    lastActivity: 'Just now',
    ...data,
  })
}
</script>

<style scoped>
.fr-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgb(var(--v-theme-background));
}

.fr-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
}

.fr-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
}
</style>
