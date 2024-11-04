import { createSlice } from '@reduxjs/toolkit';

type profile = { name: string };

const initialState: { profile: profile | null } = {
  profile: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = authSlice.actions;
export default authSlice.reducer;
