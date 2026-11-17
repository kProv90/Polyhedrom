import { createRouter, createWebHistory } from 'vue-router'
import * as Pages from '@/pages/'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Pages.IndexPage,
  },
  {
    path: '/editor',
    name: 'Template Editor',
    component: Pages.Tools.WorkshopPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bazaar',
    name: 'Bazaar',
    component: Pages.Main.BazaarPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Pages.Main.MessagePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Pages.Main.DashboardPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/characters',
    name: 'Characters',
    component: Pages.Main.CharacterPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    component: Pages.Main.CampaignPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Pages.Main.ForumPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/drive',
    name: 'Virtual Drive',
    component: Pages.Main.VirtualDrivePage,
    meta: {
      requiresAuth: true,
    },
  },
  // Tools
  {
    path: '/workshop',
    name: 'Workshop',
    component: Pages.Tools.WorkshopPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tools/workshop/editor',
    name: 'Workshop Editor',
    component: () => import('@/components/workshop/WsCore.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
