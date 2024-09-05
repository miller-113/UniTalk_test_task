import axios from 'axios'
import { Common } from '~/constants/common'

const apiClient = () => {
  const defaultOptions = {
    baseURL: Common.API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false
  }

  const instance = axios.create(defaultOptions)

  return instance
}

export default apiClient()
