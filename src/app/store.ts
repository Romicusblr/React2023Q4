import { configureStore } from '@reduxjs/toolkit';
import laureateReducer from './laureatesSlice';
import { laureatesApi } from '@/api/laureates';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      laureate: laureateReducer,
      [laureatesApi.reducerPath]: laureatesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(laureatesApi.middleware),
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
