import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import otpReducer from '../slices/otpSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    otp: otpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
