import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = getToken('token')
  if (token) config.headers.Authorization = `Token ${token}`
  return config
})

export default api
