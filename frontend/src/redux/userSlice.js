import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  enrolledClasses: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    enrollClass: (state, action) => {
      state.enrolledClasses.push(action.payload);
    },
    withdrawClass: (state, action) => {
      state.enrolledClasses = state.enrolledClasses.filter(
        (classId) => classId !== action.payload
      );
    },
    setEnrolledClasses: (state, action) => {
      state.enrolledClasses = action.payload;
    },
  },
});

export const { setUser, logoutUser, enrollClass, withdrawClass, setEnrolledClasses } = userSlice.actions;
export default userSlice.reducer;
