// interface Product {
//   id: number,
//   name: string,
//   mrp: number,
//   quantity: number  // Updated field
// }

import { createSlice } from '@reduxjs/toolkit';
import { deleteProductFromDb, fetchProductsFromDb } from '../database/db';

const initialState = {
  items: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log('Setting products in Redux:', action.payload);
      state.items = action.payload;
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;  // Adjusted to update quantity instead of amount
      const product = state.items.find(item => item.id === id);
      if (product) {
        product.quantity = quantity; // Update quantity for the selected product
      }
    },
  },
});

// Thunk for deleting a product from the database and Redux store
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await deleteProductFromDb(id);
    dispatch(removeProduct(id));
  } catch (error) {
    console.log('Error deleting product:', error);
  }
};

export const { setProducts, removeProduct, updateProductQuantity } = productSlice.actions;
export default productSlice.reducer;
