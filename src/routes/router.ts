import { createRouter, createWebHistory } from 'vue-router'
import * as Pages from '@/pages'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Pages.IndexPage,
  },
  {
    path: '/editor',
    name: 'Template Editor',
    component: Pages.TemplatePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bazaar',
    name: 'Bazaar',
    component: Pages.BazaarPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Pages.MessagePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Pages.DashboardPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/characters',
    name: 'Characters',
    component: Pages.CharacterPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    component: Pages.CampaignPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Pages.ForumPage,
    meta: {
      requiresAuth: true,
    },
  },
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
