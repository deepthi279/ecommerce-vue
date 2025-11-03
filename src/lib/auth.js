import api from './api'

export function storeToken(token) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function clearToken() {
  localStorage.removeItem('token')
}

export function isLoggedIn() {
  return !!getToken()
}

export async function loginUser({ username, password }) {
  const res = await api.post('/api/login/', { username, password })
  const token = res.data.token
  if (token) storeToken(token)
  return res.data
}

export async function signupUser({ username, email, password }) {
  const res = await api.post('/api/signup/', { username, email, password })
  const token = res.data.token
  if (token) storeToken(token)
  return res.data
}
