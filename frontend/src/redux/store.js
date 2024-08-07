import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import classReducer from './classSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    classes: classReducer,
  },
});
