// src/service/api.axios.ts
import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL

const AXIOS = axios.create({
  baseURL: API_URL, // 👉 Sẽ là http://localhost:5000/api
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default AXIOS
