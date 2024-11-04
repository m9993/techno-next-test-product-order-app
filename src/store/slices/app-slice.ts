import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDrawerOpen: false,
  isDarkTheme: false,
  // isDarkTheme: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleAppTheme: state => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    toggleDrawer: state => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { toggleAppTheme, toggleDrawer } = appSlice.actions;
export default appSlice.reducer;
