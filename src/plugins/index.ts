/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import { createPinia } from 'pinia'
import { createClerk } from './clerk'
import { clerkPlugin } from '@clerk/vue'
import router from '@/routes/router'

// Constants
const _pk: string = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(router)
  app.use(createPinia())
  app.use(clerkPlugin, { publishableKey: _pk })
}
