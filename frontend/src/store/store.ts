import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import basketReducer from './slices/basketSlice';

export const store = configureStore({
  reducer: {
    categoryReducer,
    basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
