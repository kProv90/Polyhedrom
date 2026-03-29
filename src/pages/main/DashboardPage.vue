<template>
  <div class="db-page">
    <PolyBanner
      title="Dashboard"
      subtitle="Welcome back, Adventurer"
      icon="mdi-view-dashboard-outline"
      gradient="linear-gradient(135deg, #BD93F9 0%, #FF79C6 100%)" />

    <div class="pa-6 db-content">
      <v-row>

        <!-- ── Stat Cards ─────────────────────────────── -->
        <v-col class="pt-0" cols="6" sm="3" v-for="stat in stats" :key="stat.label">
          <v-card class="db-stat-card" variant="tonal" :color="stat.color" rounded="lg" @click="router.push({ name: stat.route })">
            <v-card-text class="d-flex align-center pa-4" style="gap: 16px">
              <v-icon :icon="stat.icon" size="32" />
              <div>
                <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
                <div class="text-caption text-medium-emphasis">{{ stat.label }}</div>
              </div>
              <div v-if="stat.details" class="ml-auto text-right">
                <div v-for="d in stat.details" :key="d.label" class="text-caption lh-sm">
                  <span class="font-weight-bold">{{ d.value }}</span>
                  <span class="text-medium-emphasis ml-1">{{ d.label }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- ── Left Column ────────────────────────────── -->
        <v-col cols="12" md="8" class="pt-0 pr-0">

          <!-- Upcoming Sessions -->
          <v-card rounded="lg" class="mb-4">
            <v-card-title class="d-flex align-center pa-4 pb-2">
              <v-icon class="mr-2" color="secondary">mdi-calendar-clock</v-icon>
              Upcoming Sessions
              <v-spacer />
              <v-btn size="x-small" variant="text" color="secondary" append-icon="mdi-open-in-new">
                Sync Google Calendar
              </v-btn>
            </v-card-title>

            <v-list lines="two" class="pa-2">
              <v-list-item
                v-for="session in upcomingSessions"
                :key="session.id"
                rounded="lg"
                class="mb-1">
                <template #prepend>
                  <div class="db-session-date mr-4" :class="`bg-${session.color}`">
                    <div class="text-caption font-weight-bold text-uppercase">{{ session.month }}</div>
                    <div class="text-h6 font-weight-bold">{{ session.day }}</div>
                  </div>
                </template>
                <v-list-item-title class="font-weight-medium">{{ session.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon size="12" class="mr-1">mdi-clock-outline</v-icon>{{ session.time }}
                  <span class="mx-2">·</span>
                  <v-icon size="12" class="mr-1">mdi-account-group-outline</v-icon>{{ session.players }} players
                  <span class="mx-2">·</span>
                  {{ session.campaign }}
                </v-list-item-subtitle>
                <template #append>
                  <v-chip size="x-small" :color="session.color" variant="tonal">{{ session.type }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Recent Activity -->
          <v-card rounded="lg">
            <v-card-title class="d-flex align-center pa-4 pb-2">
              <v-icon class="mr-2" color="primary">mdi-history</v-icon>
              Recent Activity
            </v-card-title>
            <v-list density="compact" class="pa-2">
              <v-list-item
                v-for="event in recentActivity"
                :key="event.id"
                rounded="lg"
                class="mb-1">
                <template #prepend>
                  <v-avatar size="32" :color="event.color" variant="tonal" class="mr-3">
                    <v-icon size="16" :icon="event.icon" />
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2">{{ event.text }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">{{ event.time }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- ── Right Column ───────────────────────────── -->
        <v-col cols="12" md="4" class="pt-0">

          <!-- Mini Calendar -->
          <DbMiniCalendar :sessions="upcomingSessions" class="mb-4" />

        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { PolyBanner } from '@/components/ui'
import DbMiniCalendar from '@/components/dashboard/DbMiniCalendar.vue'
import { fakeDashboardStats, fakeUpcomingSessions, fakeRecentActivity } from '@/lib/api/fake'

const router = useRouter()

const stats = fakeDashboardStats
const upcomingSessions = fakeUpcomingSessions
const recentActivity = fakeRecentActivity


</script>

<style scoped>
.db-page {
  height: 100vh;
  overflow-y: auto;
  background: rgb(var(--v-theme-background));
  display: flex;
  flex-direction: column;
}

.db-content {
  flex: 1;
}

.db-stat-card {
  transition: background-color 0.15s ease;
  cursor: pointer;
}
.db-stat-card:hover {
  background-color: rgba(255, 255, 255, 0.06) !important;
}

.db-session-date {
  min-width: 44px;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  flex-shrink: 0;
}


</style>
