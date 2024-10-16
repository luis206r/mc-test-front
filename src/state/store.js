import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Importar el reducer de auth

export const store = configureStore({
  reducer: {
    auth: authReducer, // Añadir el reducer de auth al store
  },
});
