// src/service/api.axios.ts
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

// Tạo instance axios cơ bản
const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gắn token
AXIOS.interceptors.request.use(async (config) => {
  const { getToken } = useAuth();
  
  try {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Lỗi khi lấy token:', error);
    return config;
  }
});

// Xử lý response lỗi
AXIOS.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi 401 Unauthorized
    if (error.response?.status === 401) {
      console.error('Lỗi xác thực:', error.response.data?.message || 'Unauthorized');
      // Có thể thêm logic redirect đến trang login ở đây
    }
    
    // Xử lý lỗi 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Không có quyền truy cập:', error.response.data?.message || 'Forbidden');
    }
    
    return Promise.reject(error);
  }
);

export default AXIOS;