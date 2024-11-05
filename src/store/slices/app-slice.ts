import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkTheme: false,
  currentLocation: { latitude: null, longitude: null, address: null },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleAppTheme: state => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setCurrentLocation: (state, { payload }) => {
      state.currentLocation.latitude = payload.latitude;
      state.currentLocation.longitude = payload.longitude;
      state.currentLocation.address = payload.address;
    },
  },
});

export const { toggleAppTheme, setCurrentLocation } = appSlice.actions;
export default appSlice.reducer;
