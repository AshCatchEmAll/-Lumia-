import { createSlice } from "@reduxjs/toolkit";

export const draftSlice = createSlice({
  name: "draftSlice",
  initialState: {
    selectedDraft: undefined
  },
  reducers: {
    loadSelectedDraft: (state, action) => {
      state.selectedDraft = action.payload;
    },
  
  },
});


// Action creators are generated for each case reducer function
export const {
    loadSelectedDraft,

} = draftSlice.actions;

export default draftSlice.reducer;
