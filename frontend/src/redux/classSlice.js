import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [],
  filteredClasses: [],
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClasses(state, action) {
      state.classes = action.payload;
      state.filteredClasses = action.payload;
    },
    filterClasses(state, action) {
      state.filteredClasses = state.classes.filter((cls) =>
        cls.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setClasses, filterClasses } = classSlice.actions;

export default classSlice.reducer;
