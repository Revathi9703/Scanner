import { createSlice } from '@reduxjs/toolkit';

const qrSlice = createSlice({
  name: 'qr',         // The name of this slice of state
  initialState: {     // The initial state for the QR slice
    qrCode: '',       // Initially, qrCode is an empty string
  },
  reducers: {         // Reducer functions to handle actions
    setQrCode(state, action) {
      state.qrCode = action.payload;  // Set qrCode to the scanned value
    },
    clearQrCode(state) {
      state.qrCode = '';  // Reset qrCode to an empty string
    },
  },
});

export const { setQrCode, clearQrCode } = qrSlice.actions;  // Export actions for use in components
export default qrSlice.reducer;  // Export the reducer to be included in the store
