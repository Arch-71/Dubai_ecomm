import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

// initial state
const initialState = {
  themeMode: 'dark',
  sidebarOpen: false,
  currency: process.env.BASE_CURRENCY || 'USD',
  rate: 1
};

// slice
const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.sidebarOpen = action.payload;
    },
setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
    handleChangeCurrency(state, action) {
      state.currency = action.payload.currency;
      state.rate = action.payload.rate;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { toggleSidebar, setThemeMode, handleChangeCurrency } = slice.actions;

// ----------------------------------------------------------------------
