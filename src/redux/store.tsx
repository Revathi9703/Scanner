import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import qrReducer from './qrSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    qr: qrReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

