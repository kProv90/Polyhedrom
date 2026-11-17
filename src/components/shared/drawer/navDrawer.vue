<template>
  <!-- User Profile Section -->
  <q-list>
    <q-item class="q-pt-lg q-mb-sm">
      <q-item-section avatar>
        <q-avatar size="40px">
          <q-img src="/assets/img/default-avatar.svg" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label
          style="
            max-width: 138px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
          class="text-weight-bold text-body1"
          >{{ email }}</q-item-label
        >
        <q-item-label caption>{{ handle }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn dense flat icon="mdi-menu-down">
          <q-menu anchor="bottom end" self="top end">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="mdi-cog" />
                </q-item-section>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item clickable v-close-popup class="text-negative">
                <q-item-section avatar>
                  <q-icon name="mdi-logout" />
                </q-item-section>
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-section>
    </q-item>

    <q-separator />

    <!-- Navigation Items -->
    <q-item
      v-for="(item, index) in mainItems"
      :key="index"
      clickable
      :active="currentRoute === item.route"
      active-class="active-nav-item"
      v-ripple
      @click="navigateTo(item.route)"
      class="q-my-sm nav-item"
    >
      <q-item-section avatar>
        <q-icon
          :name="item.icon"
          :class="currentRoute === item.route ? 'text-primary' : 'text-grey-7'"
          size="24px"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label
          :class="
            currentRoute === item.route
              ? 'text-primary text-weight-medium'
              : 'text-grey-7'
          "
        >
          {{ item.label }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item-label header>Tools</q-item-label>
    <q-item
      v-for="(item, index) in toolItems"
      :key="index"
      clickable
      :active="currentRoute === item.route"
      active-class="active-nav-item"
      v-ripple
      @click="navigateTo(item.route)"
      class="q-my-sm nav-item"
    >
      <q-item-section avatar>
        <q-icon
          :name="item.icon"
          :class="currentRoute === item.route ? 'text-primary' : 'text-grey-7'"
          size="24px"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label
          :class="
            currentRoute === item.route
              ? 'text-primary text-weight-medium'
              : 'text-grey-7'
          "
        >
          {{ item.label }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSessionStore } from "src/stores/sessionStore";
import { useRouter, useRoute } from "vue-router";

const session = useSessionStore();

interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

// Router
const router = useRouter();
const route = useRoute();

const email = computed(() =>
  session.user && session.user.email
    ? session.user.email.split("@")[0]
    : "ERROR"
);
const handle = computed(() =>
  session.handle ? "@" + session.handle : "ERROR"
);
const currentRoute = computed(() => route.path);

// Navigation items
const mainItems = ref<NavigationItem[]>([
  { label: "Dashboard", icon: "mdi-view-dashboard", route: "/files" },
  { label: "Characters", icon: "mdi-account", route: "/shared" },
  { label: "Campaigns", icon: "mdi-book", route: "/starred" },
  { label: "Bazaar", icon: "mdi-storefront", route: "/recent" },
  { label: "Forum", icon: "mdi-forum", route: "/offline" },
  { label: "Messages", icon: "mdi-email", route: "/uploads" },
]);

const toolItems = ref<NavigationItem[]>([
  { label: "Dice Roller", icon: "mdi-dice-d20", route: "/files" },
]);

// Methods
const navigateTo = (route: string) => {
  router.push(route);
};

const handleLogout = () => {
  // Implement logout logic
  console.log("Logout clicked");
};

const handleSettings = () => {
  // Implement settings logic
  console.log("Settings clicked");
};
</script>

<style scoped>
.q-drawer {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.nav-item {
  min-height: 48px;
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
  color: var(--q-primary);
}

.active-nav-item {
  background: rgba(var(--q-primary-rgb), 0.12);
}

.q-item__section--avatar {
  min-width: 40px;
}

.q-list--padding {
  padding: 16px;
}
</style>
