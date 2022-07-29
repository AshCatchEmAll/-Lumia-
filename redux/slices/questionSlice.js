import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "questionSlice",
  initialState: {
    selectedQuestion: {},
    searchQuery:""
  },
  reducers: {
    loadSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    searchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
});


// Action creators are generated for each case reducer function
export const {
  loadSelectedQuestion,
  searchQuery
} = questionSlice.actions;

export default questionSlice.reducer;
