import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  userId: '63701cc1f03239b7f700000e',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: function (state, action) {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
