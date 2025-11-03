
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: '/', // keep this; call /api/... from your code
  headers: { 'Content-Type': 'application/json' },
})

// Add Token to Request Headers
const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Signup
export const signup = async (userData) => {
    return axios.post(`${API_URL}signup/`, userData);
};

// Login
export const login = async (credentials) => {
    return axios.post(`${API_URL}login/`, credentials);
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Token ${token}` // DRF Token
  return config
})

export default api
