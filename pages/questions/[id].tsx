import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Box, Button, TextField } from "@mui/material";
import LumiaAppBarWithPostButton from "../../components/common/LumiaAppBarWithPostButton";
import { useRouter } from "next/router";
import LumiaAppBarWithBackButton from "../../components/common/LumiaAppBarWithBackButton";
import Comments from "../../components/comments/Comment";
import { Answer } from "@prisma/client";
import { useSelector, useDispatch } from "react-redux";
import { loadRootComments } from "../../redux/slices/commentSlice";
import { Answer as AnswerComponent } from "../../components/answers/Answer";
import AnswerList from "../../components/answers/AnswerList";
import AnswerTextField from "../../components/answers/AnswerTextField";
import { rootVariant } from "../../components/answers/variants";
import { loadDynamicCommentsActionString } from "../../redux/slices/dynamicCommentReducer";
import ProtectedComponent from "../../components/auth/ProtectedComponent";
import {
  getCurrentUserUID,
  verifyToken,
} from "../../components/auth/firebaseHelpers";
import nookies from "nookies";
import { addQuestionActionString } from "../../redux/slices/dynamicQuestionReducer";
//@ts-ignore
export async function getServerSideProps(context: any) {
  const { query } = context;
  const cookies = nookies.get(context);
  const token = await verifyToken(cookies);
  const url = new URL(
    "/api/answer?questionId=" + query.questionId + "&userId=" + token.uid,
    process.env.DEV_API_URL
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const questionurl = new URL(
    "/api/question?id=" + query.questionId,
    process.env.DEV_API_URL
  );
  const questionRes = await fetch(questionurl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const question = await questionRes.json();
  
  

  return {
    props: {
      answers: data["answers"],
      question: question["question"],
    },
  };
}

const SingleQuestionPage: NextPage = (props: any) => {
  const selectedQuestion = props.question;
  const dispatch = useDispatch();
  const router = useRouter();
  const questionId = router.query.questionId;

  const [answers, setAnswers] = useState<Answer[]>(props.answers);
  useEffect(() => {
    if(selectedQuestion){
      dispatch({
        type: addQuestionActionString,
        payload: selectedQuestion,
      });
    }
    
    dispatch(loadRootComments(props.answers));
    dispatch({ type: loadDynamicCommentsActionString, payload: props.answers });
  }, []);

  return (
    <div className={styles.home_container}>
      <LumiaAppBarWithBackButton
        showSearch={false}
        onBackClick={() => {
          router.back();
        }}
      />
      <Box height={20} />
      <Post
        className={styles.post_cards}
        onClick={() => {}}
        content={selectedQuestion.content}
        question={selectedQuestion}
        key={1}
      />
      <Box height={20} />
      <hr style={{ width: "100vw" }} />
      <Box height={20} />
      <AnswerTextField variant={rootVariant} questionId={questionId} />
      <AnswerList answers={answers} />
    </div>
  );
};

export default SingleQuestionPage;
