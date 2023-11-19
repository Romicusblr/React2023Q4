import { configureStore } from '@reduxjs/toolkit';
import laureateReducer, {
  LaureateState,
} from '@/features/laureates/laureatesSlice';

export const createMockStore = (initialState: LaureateState) => {
  return configureStore({
    reducer: {
      laureate: laureateReducer,
    },
    preloadedState: {
      laureate: initialState,
    },
  });
};
