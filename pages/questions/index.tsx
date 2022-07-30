import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Button, Typography } from "@mui/material";
import { Question } from "@prisma/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loadSelectedQuestion } from "../../redux/slices/questionSlice";
import { loadDynamicQuestionsActionString } from "../../redux/slices/dynamicQuestionReducer";

import {
  getCurrentUserUID,
  verifyToken,
} from "../../components/auth/firebaseHelpers";
import nookies from "nookies";
import EmptyState from "../../components/common/EmptyState";
//@ts-ignore

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const token = await verifyToken(cookies);
  const url = new URL(
    "/api/question?userId=" + token.uid,
    process.env.DEV_API_URL
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);

  // Pass data to the page via props
  return {
    props: {
      questions: data,
    },
  };
}

const Questions: NextPage = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: loadDynamicQuestionsActionString,
      payload: props.questions,
    });
  }, []);
  return (
    <div className={styles.home_container}>
      <LumiaStickyBars item={1}>
        {" "}
        <>
          {props.questions.length > 0 ? (
            props.questions.map((question: Question, index: number) => {
              console.log(question);
              return (
                <Post
                  key={index}
                  className={styles.post_cards}
                  content={question.content}
                  question={question}
                  onClick={async () => {
                    console.log("CLocled");
                    dispatch(loadSelectedQuestion(question));
                    router.push({
                      pathname: "/questions/" + question.id,
                      query: { questionId: question.id },
                    });
                  }}
                />
              );
            })
          ) : (
           <EmptyState text={"No questions added yet"}/>
          )}
        </>
      </LumiaStickyBars>
    </div>
  );
};

export default Questions;
