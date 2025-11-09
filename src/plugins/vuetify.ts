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
          primary: '0047ab',
          secondary: '7b2cbf',
          accent: 'e0aaff',
          error: '#b71c1c',
          success: '#21ba45',
          info: '#31ccec',
          warning: '#f2c037',
        },
      },
    },
  },
})
