import { defineStore } from 'pinia'
import JwtService, { setToken } from '@/common/jwt.service'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    tokenType: '',
    token: '',
    user: {},
  }),
  actions: {
    async login (credentials) {
      const response = await User.login(credentials)
      setToken(response.access_token)
    },
    async getUser () {
      const user = await User.fetchUser()
      localStorage.setItem('user', `${JSON.stringify(user)}`)
      this.user = user
    },
    async ACT_UPDATE_USER_PASSWORD (context, passwordData) {
      return await User.updateUserPassword(passwordData)
    },
    async ACT_UPDATE_USER_email (context, userEmail) {
      return await User.updateUserPassword(userEmail)
    },
    async ACT_LOGOUT () {
      JwtService.unsetToken()
      localStorage.removeItem('user')
    },

  },
})
