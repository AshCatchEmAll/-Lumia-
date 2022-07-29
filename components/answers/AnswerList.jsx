import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Answer as AnswerComponent } from "../../components/answers/Answer";

function AnswerList({ answers }) {
  const answersList = useSelector((state) => state.commentReducer.comments||answers)
  
 

  return answersList.map((answer) => {
    return <AnswerComponent answer={answer} key={answer.id} />;
  });
}

export default AnswerList;
