<template>
  <div class="mg-sidebar d-flex flex-column">
    <div class="pa-4 pb-2">
      <v-text-field
        v-model="search"
        placeholder="Search..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        variant="outlined"
        hide-details />
    </div>

    <v-list density="compact" class="overflow-y-auto flex-grow-1 px-2 py-1">
      <v-list-item
        v-for="convo in filteredConversations"
        :key="convo.id"
        :active="selected?.id === convo.id"
        color="secondary"
        rounded="lg"
        class="mb-1 py-2"
        @click="$emit('select', convo)">
        <template #prepend>
          <v-badge
            :model-value="!!convo.unread"
            :content="convo.unread"
            color="secondary"
            offset-x="-4"
            offset-y="-4">
            <v-avatar :image="convo.avatar" size="40" class="mr-2" />
          </v-badge>
        </template>
        <v-list-item-title class="font-weight-medium text-body-2 mb-1">
          {{ convo.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-caption">
          {{ convo.lastMessage }}
        </v-list-item-subtitle>
        <template #append>
          <span class="text-caption text-medium-emphasis">{{ convo.time }}</span>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  conversations: Conversation[]
  selected: Conversation | null
}>()

defineEmits<{ select: [convo: Conversation] }>()

const search = ref('')

const filteredConversations = computed(() => {
  const q = search.value.toLowerCase()
  return props.conversations.filter(
    c => c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.mg-sidebar {
  width: 300px;
  min-width: 300px;
  height: 100%;
  background: rgb(var(--v-theme-surface));
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  overflow: hidden;
}
</style>
