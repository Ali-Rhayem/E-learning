import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  enrolledClasses: [],
  filteredEnrolledClasses: [], 
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
      state.filteredEnrolledClasses.push(action.payload);
    },
    withdrawClass: (state, action) => {
      state.enrolledClasses = state.enrolledClasses.filter(
        (classId) => classId !== action.payload
      );
      state.filteredEnrolledClasses = state.filteredEnrolledClasses.filter(
        (classId) => classId !== action.payload
      );
    },
    setEnrolledClasses: (state, action) => {
      state.enrolledClasses = action.payload;
      state.filteredEnrolledClasses = action.payload;
    },
    filterEnrolledClasses: (state, action) => {
      state.filteredEnrolledClasses = state.enrolledClasses.filter((cls) =>
        cls.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setUser, logoutUser, enrollClass, withdrawClass, setEnrolledClasses, filterEnrolledClasses } = userSlice.actions;
export default userSlice.reducer;
