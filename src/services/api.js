import axios from 'axios'

// Base URL for backend DRF
const API_URL = 'http://127.0.0.1:8000/api/'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Login function
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('login/', credentials)
    return response.data
  } catch (error) {
    // Return error response
    if (error.response) {
      return { error: error.response.data.detail || 'Login failed' }
    }
    return { error: 'Network error' }
  }
}


// SIGNUP API
export const signupUser = async (userData) => {
  try {
    const response = await api.post('signup/', userData)
    return response.data // { token, user }
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.detail || 'Signup failed' }
    }
    return { error: 'Network error' }
  }
}