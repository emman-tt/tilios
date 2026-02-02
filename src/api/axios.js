import axios from 'axios'
const API_URL = import.meta.env.VITE_PORT_URL
export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
