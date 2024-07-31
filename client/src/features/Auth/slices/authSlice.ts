import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialType = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialUser: InitialType = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
