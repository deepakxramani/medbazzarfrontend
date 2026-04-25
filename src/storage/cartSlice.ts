import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  data: Record<string, any>;
  user: Record<string, any>;
}

const initialState: CartState = {
  data: {},
  user: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<[string, any]>) {
      state.user[action.payload[0]] = action.payload[1];
      localStorage.setItem('user-data', JSON.stringify(state.user));
    },
    addProduct(state, action: PayloadAction<[string, any]>) {
      state.data[action.payload[0]] = action.payload[1];
      localStorage.setItem('cart-products', JSON.stringify(state.data));
    },
    editEmployee(state, action: PayloadAction<[string, any]>) {
      state.data[action.payload[0]] = action.payload[1];
    },
    deleteProduct(state, action: PayloadAction<[string]>) {
      delete state.data[action.payload[0]];
      localStorage.setItem('cart-products', JSON.stringify(state.data));
    },
  },
});

export const { addUser, addProduct, editEmployee, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
