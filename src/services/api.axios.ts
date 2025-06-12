// src/services/api.axios.ts
import axios from 'axios';

// Lấy URL API từ biến môi trường của Vite
export const API_URL = import.meta.env.VITE_API_URL;

// Tạo một instance Axios
const api = axios.create({
  baseURL: API_URL, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Biến để lưu trữ hàm getToken từ Clerk
let authTokenGetter: (() => Promise<string | null | undefined>) | null = null; // Cập nhật type để bao gồm undefined

// Hàm để thiết lập authTokenGetter. Sẽ được gọi từ UserProvider.
export const setAuthTokenGetter = (getter: () => Promise<string | null | undefined>) => { // Cập nhật type
  authTokenGetter = getter;
};

// Clear bất kỳ interceptor request nào đã được thêm trước đó (để tránh trùng lặp)
api.interceptors.request.clear(); 

// Thêm một request interceptor (bộ chặn yêu cầu) mới
api.interceptors.request.use(
  async (config) => {
    // Nếu có authTokenGetter (được inject từ UserProvider)
    if (authTokenGetter) {
      // Gọi hàm getter để lấy token Clerk
      const token = await authTokenGetter(); // Lấy token từ Clerk
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Nếu không có token, đảm bảo không có header Authorization nào được gửi
        delete config.headers.Authorization;
      }
    } else {
      // Nếu authTokenGetter chưa được thiết lập (ví dụ: Clerk chưa tải, hoặc chưa đăng nhập),
      // đảm bảo không có header Authorization nào được gửi.
      delete config.headers.Authorization;
    }
    return config; // Trả về cấu hình đã sửa đổi
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor vẫn giữ nguyên
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.warn('Unauthorized: Token might be invalid or expired. Please re-authenticate.');
        // Bạn có thể thêm logic để chuyển hướng người dùng về trang đăng nhập
        // hoặc làm mới token ở đây, nhưng cẩn thận với loop chuyển hướng.
        // Ví dụ: window.location.href = '/login'; 
      }
    } else if (error.request) {
      console.error('API Error: No response received from server.');
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error); 
  }
);

export default api;
