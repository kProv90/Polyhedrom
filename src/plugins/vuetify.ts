/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0047ab',
          secondary: '#7b2cbf',
          accent: '#e0aaff',
          error: '#b71c1c',
          success: '#21ba45',
          info: '#31ccec',
          warning: '#f2c037',
          background: '#F3F4F6',
          surface: '#FFFFFF',
        },
      },  
      dark: {
        colors: {
          primary: '#BD93F9', // Purple
          secondary: '#FF79C6', // Pink
          accent: '#F1FA8C', // Yellow
          error: '#FF5555', // Red
          success: '#50FA7B', // Green
          info: '#8BE9FD', // Cyan
          warning: '#FFB86C', // Orange
          surface: '#44475A', // Current Line/Selection
          background: '#282A36', // Background
        },
      },
    },
  },
})
