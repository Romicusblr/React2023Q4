import { configureStore } from '@reduxjs/toolkit';
import laureateReducer from '@/features/laureates/laureatesSlice';

export const store = configureStore({
  reducer: {
    laureate: laureateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
