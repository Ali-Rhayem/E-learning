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
      console.log('Setting user:', action.payload);
      state.user = action.payload;
    },
    enrollClass: (state, action) => {
      console.log('Enrolling class:', action.payload);
      state.enrolledClasses.push(action.payload);
    },
    withdrawClass: (state, action) => {
      console.log('Withdrawing from class:', action.payload);
      state.enrolledClasses = state.enrolledClasses.filter(
        (classId) => classId !== action.payload
      );
    },
    setEnrolledClasses: (state, action) => {
      console.log('Setting enrolled classes:', action.payload);
      state.enrolledClasses = action.payload;
    },
  },
});

export const { setUser, enrollClass, withdrawClass, setEnrolledClasses } = userSlice.actions;
export default userSlice.reducer;
