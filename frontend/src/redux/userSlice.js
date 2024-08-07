import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  enrolledClasses: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    enrollClass: (state, action) => {
      state.enrolledClasses.push(action.payload);
    },
    withdrawClass: (state, action) => {
      state.enrolledClasses = state.enrolledClasses.filter(
        (classId) => classId !== action.payload
      );
    },
  },
});

export const { setUser, enrollClass, withdrawClass } = userSlice.actions;
export default userSlice.reducer;
