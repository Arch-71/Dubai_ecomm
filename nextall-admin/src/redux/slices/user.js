import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

// initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  count: 0,
  isInitialized: false,
  followingShops: []
};

// slice
const slice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setCount(state) {
      state.count = state.count + 1;
    },
    setInitialize(state) {
      state.isInitialized = true;
    },
    updateStatus(state, action) {
      state.user.status = action.payload;
    },
    verifyUser(state) {
      state.user.isVerified = true;
    },
    updateUserRole(state) {
      state.user.role = 'vendor';
    },
    updateFollowShop(state, action) {
      const filtered = state.followingShops.filter((v) => v === action.payload);
      if (filtered.length) {
        const removedShop = state.followingShops.filter((v) => v !== action.payload);
        state.followingShops = removedShop;
      } else {
        state.followingShops = [...state.followingShops, action.payload];
      }
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLoading,
  loginSuccess,
  hasError,
  logout,
  setCount,
  setInitialize,
  updateStatus,
  verifyUser,
  updateUserRole,
  updateFollowShop
} = slice.actions;

// ----------------------------------------------------------------------
