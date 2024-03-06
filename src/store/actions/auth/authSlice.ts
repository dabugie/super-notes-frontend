import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    unSetLoading(state) {
      state.isLoading = false;
    },

    authSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    authFailure(state, action) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },

    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setLoading, unSetLoading, authSuccess, authFailure, signOut } = authSlice.actions;
export default authSlice.reducer;
