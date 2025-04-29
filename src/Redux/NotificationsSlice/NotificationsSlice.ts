import { createSlice } from "@reduxjs/toolkit";

interface NotificationsState {
  showNotifications: boolean;
}

const initialState: NotificationsState = {
  showNotifications: false,
};

const NotificationsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setShowNotifications(state, action) {
      state.showNotifications = action.payload;
    },
  },
});

export const { setShowNotifications } = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
