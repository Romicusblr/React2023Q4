import { configureStore } from '@reduxjs/toolkit';
import laureateReducer from '@/features/laureates/laureatesSlice';
import { laureatesApi } from '@/api/laureates';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    laureate: laureateReducer,
    [laureatesApi.reducerPath]: laureatesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(laureatesApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
