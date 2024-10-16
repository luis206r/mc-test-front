import { createSlice } from '@reduxjs/toolkit';

// Estado inicial del usuario
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Exportar las acciones
export const { loginSuccess, logout } = authSlice.actions;

// Selector para obtener el estado de autenticación
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
