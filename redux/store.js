import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./slices/commentSlice";
import questionReducer from "./slices/questionSlice";
import snackbarReducer from "./slices/snackbarSlice";
import draftReducer from "./slices/draftSlice";
import homeReducer from "./slices/homeSlice";
import notifReducer from "./slices/notifiSlice";
import { dynamicCommentReducer } from "./slices/dynamicCommentReducer";
import { dynamicQuestionReducer } from "./slices/dynamicQuestionReducer";

export default configureStore({
  reducer: {
    commentReducer,
    dynamicCommentReducer,

    questionReducer,
    dynamicQuestionReducer,

    draftReducer,

    homeReducer,
    
    notifReducer,
    
    snackbarReducer,
  },
});
