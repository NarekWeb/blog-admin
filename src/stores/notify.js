import { defineStore } from 'pinia'

export const useNotifyStore = defineStore('notify', {
  state: () => ({
    notification: null,
    options: {
      duration: 3000,
      title: '',
      message: '',
      type: 'success',
    },
  }),
  getters: {
    getOptions: state => state.options,
  },
  actions: {
    async setNotification (element) {
      this.$patch((state) => {
        state.notification = element
      })
    },
    async notifyShow (tittle, message, type) {
      await this.$patch((state) => {
        state.options.title = tittle
        state.options.message = message
        state.options.type = type
      })
      await this.notification.showToast()
    },
  },
})
