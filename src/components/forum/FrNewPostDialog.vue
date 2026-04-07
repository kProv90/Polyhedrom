<template>
  <PolyDialog
    :model-value="modelValue"
    title="New Post"
    max-width="600"
    persistent
    cancel-text="Cancel"
    submit-text="Post"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="resetForm"
    @submit="handleCreate">

    <v-card-text class="pt-4">
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model="form.title"
            label="Title"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            :rules="[v => !!v || 'Required']" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="form.category"
            :items="postCategories"
            label="Category"
            variant="outlined"
            density="comfortable"
            hide-details />
        </v-col>
        <v-col cols="12" sm="6">
          <v-combobox
            v-model="form.tags"
            label="Tags"
            variant="outlined"
            density="comfortable"
            multiple
            chips
            closable-chips
            hide-details
            placeholder="Add tags..." />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.body"
            label="Body"
            variant="outlined"
            density="comfortable"
            rows="6"
            hide-details="auto"
            :rules="[v => !!v || 'Required']" />
        </v-col>
      </v-row>
    </v-card-text>

  </PolyDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PolyDialog } from '@/components/ui'
import { categories } from './constants'

defineProps<{ modelValue: boolean }>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  create: [thread: Omit<ForumThread, 'id' | 'replies' | 'views' | 'upvotes' | 'createdAt' | 'lastActivity'>]
}>()

const postCategories = categories.filter(c => c !== 'All')

const emptyForm = () => ({
  title: '',
  category: 'General',
  tags: [] as string[],
  body: '',
})

const form = ref(emptyForm())

function resetForm() {
  form.value = emptyForm()
}

function handleCreate() {
  if (!form.value.title.trim() || !form.value.body.trim()) return
  emit('create', {
    title: form.value.title,
    category: form.value.category,
    tags: form.value.tags,
    excerpt: form.value.body.slice(0, 160),
    author: 'You',
    avatar: 'https://i.pravatar.cc/150?u=me',
    isPinned: false,
    isLocked: false,
  })
  emit('update:modelValue', false)
  resetForm()
}
</script>
