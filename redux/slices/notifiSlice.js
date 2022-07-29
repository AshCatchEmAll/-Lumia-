import { createSlice } from "@reduxjs/toolkit";

export const notifSlice = createSlice({
  name: "notifSlice",
  initialState: {
    unread: 0,
  },
  reducers: {
    updateUnread: (state, action) => {
      state.unread  = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUnread, searchQuery } = notifSlice.actions;

export default notifSlice.reducer;
