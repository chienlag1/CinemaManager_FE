// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Typings cho root state và dispatch (dùng cho TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
