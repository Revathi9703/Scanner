// interface Product {
//   id:number,
//   name:string,
//   mrp:number,
//   amount:number
// }

import { createSlice } from '@reduxjs/toolkit';
import { deleteProductFromDb, fetchProductsFromDb } from '../database/db'; // Ensure this function exists and fetches correctly

const initialState = {
  items: [],
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log('Setting products in Redux:', action.payload); // Log the action payload
      state.items = action.payload;
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await deleteProductFromDb(id);
    dispatch(removeProduct(id));
  } catch (error) {
    console.log('Error deleting product:', error);
  }
};

export const { setProducts, removeProduct } = productSlice.actions;
export default productSlice.reducer;

