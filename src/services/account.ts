// src/service/account.ts
import type {
  LoginPayload,
  RegisterPayload,
  UpdatePasswordPayload,
} from '../types/account.type'
import apiAxios from './api.axios'

export const accountService = {
  register: (data: RegisterPayload) => apiAxios.post('/auth/register', data),
  login: (data: LoginPayload) => apiAxios.post('/auth/login', data),
  logout: () => apiAxios.get('/auth/logout'),
  getProfile: () => apiAxios.get('/auth/profile'),
  verifyEmail: (token: string) => apiAxios.get(`/auth/verify-email/${token}`),
  forgotPassword: (email: string) =>
    apiAxios.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, newPassword: string) =>
    apiAxios.patch(`/auth/reset-password/${token}`, { password: newPassword }),
  updatePassword: (data: UpdatePasswordPayload) =>
    apiAxios.patch('/auth/update-password', data),
}
