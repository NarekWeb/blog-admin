import axios from 'axios'
import JWTService from '../../common/jwt.service'
import { API_URL } from '@/common/config'
import {useNotifyStore} from "@/stores/notify";

export class ValidationError extends Error {
  constructor (response) {
    super()
    this.errors = response.data.errors
  }

  hasError (key) {
    return !!this.errors[key]
  }

  getError (key) {
    return this.hasError(key) ? this.errors[key][0] : undefined
  }

  getErrors () {
    return Object.keys(this.errors).reduce(
      (agg, key) => ({ ...agg, [key]: this.errors[key] }),
      {}
    )
  }
}

/**
 * @returns {AxiosInstance}
 */
export const getInstance = () => {
  const apiToken = JWTService.getToken()
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: apiToken ? `Bearer ${apiToken}` : null
    }
  })

  axiosInstance.interceptors.response.use((r) => r, (err) => {
    const notifications = useNotifyStore()
    if (err.response.status === 422) {
      notifications.notifyShow(Object.values(err.response.data.errors)[0][0], 'error', 'error')
    }

    if (err.response.status === 500) {
      notifications.notifyShow('Server Error');

      throw new ValidationError(err.response)
    }

    throw err
  })

  return axiosInstance
}
