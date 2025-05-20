// src/types/account.types.ts

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}


export interface UpdatePasswordPayload {
  currentPassword: string
  newPassword: string
}
