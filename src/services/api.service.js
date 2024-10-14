import axios from 'axios'
import { API_URL } from '@/common/config'
import store from '../store'
import JwtService from '../common/jwt.service'
import { ValidationError } from './api/axios'

const ApiService = {
  init () {
    axios.defaults.baseURL = API_URL
  },

  setHeader () {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${JwtService.getToken()}`
    }
  },

  getInstance () {
    const axiosInstance = axios.create({
      // eslint-disable-next-line no-undef
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${JwtService.getToken()}`
      }
    })

    axiosInstance.interceptors.response.use((r) => r, (err) => {
      if (err.response.status === 422) {
        return Promise.reject(new ValidationError(err.response))
      }

      if (err.response.status === 403 && err.response.data.code === 3) {
        store.dispatch('auth/ACT_TOGGLE_TFA_MODAL', true)
      }

      return Promise.reject(err)
    })

    return axiosInstance
  },

  get (resource, slug = '') {
    const path = slug !== '' ? `/${slug}` : ''
    return this.getInstance().get(`${resource}${path}`)
  },

  post (resource, params, headers = {}, progress = {}) {
    return this.getInstance().post(`${resource}`, params, headers)
  },

  put (resource, params, headers = {}, progress = {}) {
    return this.getInstance().put(`${resource}`, params, headers)
  },

  delete (resource, headers = {}, progress = {}) {
    return this.getInstance().delete(`${resource}`, headers)
  },

  patch (resource, params, headers = {}, progress = {}) {
    return this.getInstance().patch(`${resource}`, params, headers)
  }
}

export default ApiService
