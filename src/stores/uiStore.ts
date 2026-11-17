import { defineStore } from 'pinia'

interface SnackbarState {
  show: boolean
  message: string
  color: string
  timeout: number
}

export const useUiStore = defineStore('ui', {
  state: (): SnackbarState => ({
    show: false,
    message: '',
    color: 'info',
    timeout: 3000,
  }),
  actions: {
    showSnackbar(message: string, color = 'info', timeout = 3000) {
      this.message = message
      this.color = color
      this.timeout = timeout
      this.show = true
    },
  },
})
