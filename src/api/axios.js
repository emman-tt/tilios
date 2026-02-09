import axios from 'axios'
const API_URL = import.meta.env.VITE_PORT_URL
import useToken from '../hooks/useToken'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use(
  config => {
    const { getToken } = useToken()
    const accessToken = getToken()

    // 2. If token exists, add it to the headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
