import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: true,
};

const LoaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.show = action.payload;
    },
  },
});
export const { showLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;
