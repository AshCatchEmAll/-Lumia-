import { createSlice } from "@reduxjs/toolkit";
export const successSnackbar = "success";
export const errorSnackbar = "error";
export const infoSnackbar = "info";
export const warningSnackbar = "warning";
export const hiddenSnackbar = "hidden";
export const snackbarSlice = createSlice({
  name: "snackbarSlice",
  initialState: {
    message: "",
    type:successSnackbar,
    open:false,
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.message = action.payload.message;
        state.type = action.payload.type;
        state.open = true;
    },
    
    hideSnackbar: (state) => {
        state.message = "";
        state.type = successSnackbar;
        state.open = false;
    }
    
  },
});


// Action creators are generated for each case reducer function
export const {
    showSnackbar,
    hideSnackbar,

} = snackbarSlice.actions;

export default snackbarSlice.reducer;
