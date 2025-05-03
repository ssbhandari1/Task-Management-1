import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { verifyAuth } from '../thunk';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action: PayloadAction<{ authenticated: boolean; user?: User }>) => {
        state.isAuthenticated = action.payload.authenticated;
        state.user = action.payload.user ?? null;
        state.loading = false;
    })
    
      .addCase(verifyAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      });
  },
});


export default authSlice.reducer;