import { createSlice } from "@reduxjs/toolkit";


export const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    ...{},
    comments: [],
    openReplyTextField: {
      open: false,
      parentAnswerId: -1,
    },
    openReplies: {
      open: false,
      parentAnswerId: -1,
    },
    
  },
  reducers: {
    loadRootComments: (state, action) => {
     
     
      state.comments = action.payload;
    },

    addRootComment: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.comments = [action.payload, ...state.comments];
    },
    openReplyTextField: (state, action) => {
      state.openReplyTextField = action.payload;
    },
    openReplies: (state, action) => {
      state.openReplies = action.payload;
    },
    hideReplies: (state) => {
      state.openReplyTextField = {
        open: false,
        parentAnswerId: -1,
      };
    },
    deleteReply: (state, action) => {
      state = {
        ...state,
        [action.payload.id]: {
          state: removedComment,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadRootComments,
  addRootComment,
  openReplyTextField,
  openReplies,
  hideReplies,
} = commentSlice.actions;

export default commentSlice.reducer;
