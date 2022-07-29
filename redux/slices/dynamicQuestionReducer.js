import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {};
export const loadDynamicQuestionsActionString = "loadDynamicQuestions";
export const deleteDynamicQuestionActionString = "deleteDynamicQuestionAction";
export const addQuestionActionString = "addQuestionAction";

const deleteQuestionsAction = createAction(deleteDynamicQuestionActionString);
const refreshQuestionAction = createAction("refreshQuestionAction");
const loadQuestionsAction = createAction(loadDynamicQuestionsActionString);
const addQuestionAction = createAction(addQuestionActionString);

export const dynamicQuestionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadQuestionsAction, (state, action) => {
      const questionIds = action.payload.reduce(
        (accumulator, current) => ({ ...accumulator, [current.id]: current }),
        {}
      );

      return {
        ...state,
        ...questionIds,
      };
    })
    .addCase(deleteQuestionsAction, (state, action) => {
      state[action.payload.id] = undefined;
    }).addCase(addQuestionAction, (state, action) => {
      
      state[action.payload.id] = action.payload;
    });
});
