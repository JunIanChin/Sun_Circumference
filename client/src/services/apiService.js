import { BASE_URL } from '../utils/constants'
const axios = require('axios')

export function apiService() {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return axiosInstance
}
