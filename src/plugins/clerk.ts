import { clerkPlugin } from '@clerk/vue'
import type { App } from 'vue'

const publishableKey: string | undefined = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export function createClerk() {
  if (!publishableKey) {
    const errorMessage =
      'Missing VITE_CLERK_PUBLISHABLE_KEY environment variable. The application cannot start without proper Clerk configuration.'

    // Log error for debugging
    console.error('🚨 CLERK CONFIGURATION ERROR:', errorMessage)

    // Hard stop - throw immediately
    throw new Error(errorMessage)
  }

  // Initialize Clerk plugin
  console.log('[clerk] plugin initialized')

  // Return a configured plugin function
  return {
    install(app: App) {
      app.use(clerkPlugin, {
        publishableKey,
      })
    },
  }
}
