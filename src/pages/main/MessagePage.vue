<template>
  <div class="mg-page">
    <!-- Banner -->
    <PolyBanner
      title="Messages"
      subtitle="Your conversations and party communications"
      icon="mdi-email-outline"
      gradient="linear-gradient(135deg, #8BE9FD 0%, #6272A4 100%)" />

    <div class="mg-body">

    <!-- Conversation Sidebar -->
    <MgConversationList
      :conversations="conversations"
      :selected="selected"
      @select="selectConversation" />

    <!-- Chat Area -->
    <div v-if="selected" class="d-flex flex-column flex-grow-1 overflow-hidden" style="min-height: 0">
      <!-- Chat Header -->
      <div class="mg-chat-header d-flex align-center pa-3">
        <v-avatar :image="selected.avatar" size="38" class="mr-3" />
        <div>
          <div class="font-weight-bold text-body-1">{{ selected.name }}</div>
          <div class="text-caption text-success">● Active now</div>
        </div>
        <v-spacer />
        <v-btn icon="mdi-phone-outline" variant="text" />
        <v-btn icon="mdi-video-outline" variant="text" />
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props" />
          </template>
          <v-list density="compact">
            <v-list-item
              prepend-icon="mdi-pin-outline"
              title="Pinned Messages"
              @click="isPinnedOpen = !isPinnedOpen" />
            <v-list-item prepend-icon="mdi-bell-off-outline" title="Mute Notifications" />
            <v-list-item prepend-icon="mdi-account-outline" title="View Profile" />
            <v-divider />
            <v-list-item prepend-icon="mdi-block-helper" title="Block User" />
          </v-list>
        </v-menu>
      </div>

      <!-- Messages Feed -->
      <div
        ref="messageArea"
        class="flex-grow-1 overflow-y-auto pa-4 mg-feed">
        <template v-for="msg in selected.messages" :key="msg.id">
          <div v-if="msg.dateDivider" class="d-flex align-center my-3">
            <v-divider />
            <span class="text-caption text-medium-emphasis px-3 text-no-wrap">
              {{ msg.dateDivider }}
            </span>
            <v-divider />
          </div>
          <div
            :class="['d-flex align-end mb-2', msg.fromMe ? 'justify-end' : 'justify-start']"
            style="gap: 8px">
            <v-avatar
              v-if="!msg.fromMe"
              :image="selected.avatar"
              size="28" />
            <div
              :class="['mg-bubble', msg.fromMe ? 'mg-bubble-sent' : 'mg-bubble-rcvd']">
              <span class="text-body-2">{{ msg.text }}</span>
              <div class="text-caption text-right mt-1 mg-bubble-time">{{ msg.time }}</div>
            </div>
          </div>
        </template>
      </div>

      <!-- Input Bar -->
      <div class="mg-chat-footer pa-3 d-flex align-center" style="gap: 8px">
        <v-btn icon="mdi-paperclip" variant="text" />
        <v-text-field
          v-model="newMessage"
          placeholder="Type a message..."
          density="compact"
          variant="outlined"
          hide-details
          class="flex-grow-1"
          @keydown.enter.prevent="sendMessage" />
        <v-btn icon="mdi-emoticon-happy-outline" variant="text" />
        <v-btn
          :disabled="!newMessage.trim()"
          icon="mdi-send"
          variant="text"
          color="secondary"
          @click="sendMessage" />
      </div>
    </div>

    <!-- Pinned Messages Drawer -->
    <MgPinnedDrawer v-model="isPinnedOpen" :pinned="selectedPinned" />

    <!-- No conversation selected -->
    <div v-if="!selected" class="flex-grow-1 d-flex flex-column align-center justify-center">
      <v-icon size="80" color="surface-variant" class="mb-4">mdi-message-text-outline</v-icon>
      <div class="text-h6 text-medium-emphasis">Select a conversation</div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { PolyBanner } from '@/components/ui'
import MgConversationList from '@/components/message/MgConversationList.vue'
import MgPinnedDrawer from '@/components/message/MgPinnedDrawer.vue'
import { fakeConversations, fakePinnedMessages } from '@/lib/api/fake'

const newMessage = ref('')
const messageArea = ref<HTMLElement | null>(null)
const isPinnedOpen = ref(false)

const pinnedMessages = fakePinnedMessages

const selectedPinned = computed(() =>
  selected.value ? (pinnedMessages[selected.value.id] ?? []) : []
)

const conversations = ref<Conversation[]>(fakeConversations)

const selected = ref<Conversation | null>(conversations.value[0] ?? null)

function selectConversation(convo: Conversation) {
  isPinnedOpen.value = false
  selected.value = convo
  nextTick(scrollToBottom)
}

function sendMessage() {
  if (!newMessage.value.trim() || !selected.value) return
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  selected.value.messages.push({ id: Date.now(), text: newMessage.value.trim(), time, fromMe: true })
  selected.value.lastMessage = newMessage.value.trim()
  selected.value.time = 'now'
  newMessage.value = ''
  nextTick(scrollToBottom)
}

function scrollToBottom() {
  if (messageArea.value) messageArea.value.scrollTop = messageArea.value.scrollHeight
}

</script>

<style scoped>
.mg-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(var(--v-theme-background));
}

.mg-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
}

.mg-chat-header {
  background: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  min-height: 64px;
}

.mg-chat-footer {
  background: rgb(var(--v-theme-surface));
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.mg-feed {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.mg-bubble {
  max-width: 65%;
  padding: 10px 14px;
  border-radius: 18px;
}

.mg-bubble-sent {
  background: rgb(var(--v-theme-accent));
  color: rgb(var(--v-theme-on-accent));
  border-bottom-right-radius: 4px;
}

.mg-bubble-rcvd {
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  border-bottom-left-radius: 4px;
}

.mg-bubble-time {
  opacity: 0.65;
}


</style>
