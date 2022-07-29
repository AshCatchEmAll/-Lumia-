import { createSlice } from "@reduxjs/toolkit";
export const newestSort = "newest";
export const mostLiked = "mostLiked";
export const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    sort: newestSort
  },
  reducers: {
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
  
  },
});


// Action creators are generated for each case reducer function
export const {
    changeSort,

} = homeSlice.actions;

export default homeSlice.reducer;
