<template>
  <v-card rounded="lg">
    <v-card-title class="d-flex align-center pa-4 pb-0">
      <v-icon class="mr-2" color="primary">mdi-calendar-month</v-icon>
      {{ calendarTitle }}
    </v-card-title>
    <v-card-text class="pa-3">

      <!-- Nav -->
      <div class="d-flex align-center justify-space-between mb-2">
        <v-btn icon="mdi-chevron-left" size="x-small" variant="text" @click="prevMonth" />
        <span class="text-caption font-weight-bold text-uppercase">{{ calendarTitle }}</span>
        <v-btn icon="mdi-chevron-right" size="x-small" variant="text" @click="nextMonth" />
      </div>

      <!-- Day headers -->
      <div class="db-cal-grid db-cal-headers">
        <span v-for="d in ['Su','Mo','Tu','We','Th','Fr','Sa']" :key="d" class="text-caption text-medium-emphasis text-center">{{ d }}</span>
      </div>

      <!-- Days -->
      <div class="db-cal-grid mt-1">
        <div
          v-for="(cell, i) in calendarCells"
          :key="i"
          class="db-cal-cell"
          :class="{
            'db-cal-cell--today': cell.isToday,
            'db-cal-cell--session': cell.hasSession,
          }">
          <span v-if="cell.day">{{ cell.day }}</span>
          <div v-if="cell.hasSession" class="db-cal-dot" />
        </div>
      </div>

      <div class="d-flex align-center mt-2" style="gap: 8px">
        <div class="db-cal-dot" style="position:static; background: rgb(var(--v-theme-secondary))" />
        <span class="text-caption text-medium-emphasis">Session scheduled</span>
      </div>

    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  sessions: { month: string; day: number }[]
}>()

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const today = new Date()
const calendarYear = ref(today.getFullYear())
const calendarMonth = ref(today.getMonth())

const sessionDays = computed(() =>
  props.sessions
    .filter(s => MONTHS.indexOf(s.month) === calendarMonth.value && calendarYear.value === today.getFullYear())
    .map(s => s.day)
)

const calendarTitle = computed(() =>
  new Date(calendarYear.value, calendarMonth.value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
)

const calendarCells = computed(() => {
  const firstDay = new Date(calendarYear.value, calendarMonth.value, 1).getDay()
  const daysInMonth = new Date(calendarYear.value, calendarMonth.value + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push({ day: null, isToday: false, hasSession: false })
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isToday: d === today.getDate() && calendarMonth.value === today.getMonth() && calendarYear.value === today.getFullYear(),
      hasSession: sessionDays.value.includes(d),
    })
  }
  return cells
})

function prevMonth() {
  if (calendarMonth.value === 0) { calendarMonth.value = 11; calendarYear.value-- }
  else calendarMonth.value--
}

function nextMonth() {
  if (calendarMonth.value === 11) { calendarMonth.value = 0; calendarYear.value++ }
  else calendarMonth.value++
}
</script>

<style scoped>
.db-cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.db-cal-headers span {
  display: block;
  padding: 2px 0;
}

.db-cal-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 0.75rem;
  position: relative;
  cursor: default;
}

.db-cal-cell--today {
  background: rgb(var(--v-theme-primary));
  color: white;
  font-weight: bold;
}

.db-cal-cell--session:not(.db-cal-cell--today) {
  background: rgba(var(--v-theme-secondary), 0.15);
}

.db-cal-dot {
  position: absolute;
  bottom: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgb(var(--v-theme-secondary));
}

.db-cal-cell--today .db-cal-dot {
  background: white;
}
</style>
