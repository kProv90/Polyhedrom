<template>
  <div class="ca-page">

    <PolyBanner
      title="Campaigns"
      subtitle="Track and organize your active campaigns"
      icon="mdi-book-outline"
      gradient="linear-gradient(135deg, #FF79C6 0%, #BD93F9 100%)">
      <v-btn prepend-icon="mdi-plus" variant="flat" rounded="pill" class="poly-banner-btn" style="background: rgba(0,0,0,0.35); color: white" @click="newDialog = true">
        New Campaign
      </v-btn>
    </PolyBanner>

    <CaNewDialog v-model="newDialog" @create="addCampaign" />

    <div class="pa-6">
      <div class="ca-grid">
        <CaCard v-for="c in campaigns" :key="c.id" :campaign="c" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PolyBanner } from '@/components/ui'
import CaCard from '@/components/campaign/CaCard.vue'
import CaNewDialog from '@/components/campaign/CaNewDialog.vue'
import { fakeCampaigns } from '@/lib/api/fake'

const newDialog = ref(false)

function addCampaign(data: Omit<Campaign, 'id'>) {
  campaigns.value.push({ id: Date.now(), ...data })
}

const campaigns = ref<Campaign[]>(fakeCampaigns)
</script>

<style scoped>
.ca-page {
  height: 100vh;
  overflow-y: auto;
  background: rgb(var(--v-theme-background));
}

.ca-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
</style>
