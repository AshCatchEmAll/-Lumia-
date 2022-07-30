import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {};
export const loadDynamicCommentsActionString = "loadDynamicComments";
export const deleteDynamicCommentActionString = "deleteDynamicCommentAction";
export const addCommentActionString = "addCommentAction";
const deleteCommentsAction = createAction(deleteDynamicCommentActionString);
const refreshCommentAction = createAction("refreshCommentAction");
const loadCommentsAction = createAction(loadDynamicCommentsActionString);
const addCommentAction = createAction(addCommentActionString);
export const dynamicCommentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCommentsAction, (state, action) => {
      const commentIds = action.payload.reduce(
        (accumulator, current) => ({ ...accumulator, [current.id]: current }),
        {}
      );
      
      return {
        ...state,
        ...commentIds,
      };
    })
    .addCase(deleteCommentsAction, (state, action) => {
      state[action.payload.id] = undefined;
    })
    .addCase(addCommentAction, (state, action) => {
      
      state[action.payload.id] = action.payload;
    });
});
