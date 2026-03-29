<template>
  <PolyDialog
    :model-value="modelValue"
    title="New Campaign"
    max-width="560"
    persistent
    cancel-text="Cancel"
    submit-text="Create"
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
        <v-col cols="12">
          <v-textarea
            v-model="form.description"
            label="Description"
            variant="outlined"
            density="comfortable"
            rows="3"
            hide-details />
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            v-model="form.image"
            label="Banner Image URL"
            variant="outlined"
            density="comfortable"
            placeholder="https://..."
            hide-details />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="form.status"
            :items="['Active', 'Paused', 'Completed']"
            label="Status"
            variant="outlined"
            density="comfortable"
            hide-details />
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="form.players"
            :items="playerSearchResults"
            :loading="playerSearchLoading"
            :rules="[v => v.length > 0 || 'At least 1 player is required']"
            label="Players"
            variant="outlined"
            density="comfortable"
            multiple
            chips
            closable-chips
            hide-details="auto"
            no-filter
            placeholder="Search players (3+ letters)..."
            @update:search="onPlayerSearch" />
        </v-col>
      </v-row>
    </v-card-text>

  </PolyDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { PolyDialog } from '@/components/ui'

defineProps<{ modelValue: boolean }>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  create: [campaign: Omit<Campaign, 'id'>]
}>()

const emptyForm = () => ({
  title: '',
  description: '',
  image: '',
  status: 'Active' as Campaign['status'],
  players: [] as string[],
})

const form = ref(emptyForm())

function resetForm() {
  form.value = emptyForm()
}

const playerSearchResults = ref<string[]>([])
const playerSearchLoading = ref(false)

async function onPlayerSearch(input: string) {
  if (!input || input.length < 3) {
    playerSearchResults.value = []
    return
  }
  playerSearchLoading.value = true
  try {
    const q = query(
      collection(db, 'users'),
      orderBy('displayName'),
      where('displayName', '>=', input),
      where('displayName', '<', input + '\uf8ff'),
      limit(10)
    )
    const snap = await getDocs(q)
    playerSearchResults.value = snap.docs.map(d => d.data().displayName as string)
  } finally {
    playerSearchLoading.value = false
  }
}

function handleCreate() {
  if (!form.value.title || form.value.players.length === 0) return
  emit('create', {
    title: form.value.title,
    description: form.value.description,
    image: form.value.image || `https://picsum.photos/seed/${Date.now()}/600/300`,
    status: form.value.status,
    players: form.value.players.map(name => ({
      name,
      avatar: `https://i.pravatar.cc/150?u=${(name.split(' ')[0] ?? name).toLowerCase()}`,
    })),
  })
  resetForm()
  emit('update:modelValue', false)
}
</script>
