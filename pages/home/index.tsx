import type { NextPage } from "next";
import { FC, useEffect, useState } from "react";

import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { Question } from "@prisma/client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProtectedComponent from "../../components/auth/ProtectedComponent";
import {
  getCurrentUserUID,
  verifyToken,
} from "../../components/auth/firebaseHelpers";
import nookies from "nookies";
import { loadSelectedQuestion } from "../../redux/slices/questionSlice";
import { loadDynamicQuestionsActionString } from "../../redux/slices/dynamicQuestionReducer";
import { Filter, Sort } from "@mui/icons-material";
import { Typography } from "antd";
import { useAuth } from "../../components/auth/AuthProvider";
import SortDropdown from "../../components/home/SortDropdown";
import { DEV_API_URL } from "../../components/config/urls";
export async function getServerSideProps(context: any) {
  try{
    const cookies = nookies.get(context);
  const token = await verifyToken(cookies);
  if (!token) {
    return {
      props: {
        questions: [],
      },
    };
  }
  const url = new URL(
    "/api/question/all?userId=" + token.uid + "&sort=newest",
    process.env.DEV_API_URL
  );

  console.log(url.pathname);

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
  }catch(e){
    console.log(e);
    return {
      props: {
        questions: [],
      },
    };
  }
  
}

const Home: NextPage = (props: any) => {
  const sort = useSelector((state: any) => state.homeReducer.sort);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState(props.questions);

  const router = useRouter();
  const auth = useAuth();
  useEffect(() => {
    dispatch({
      type: loadDynamicQuestionsActionString,
      payload: props.questions,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      //@ts-ignore
      await grabQuestions(auth.user.uid, sort);
    };
    if (auth.user) {
      fetchData();
    }
  }, [sort]);
  async function grabQuestions(uid: string, sortBy: string) {
    console.log("GRABIING EM ", sort);
    const url = new URL(
      "/api/question/all?" + "sort=" + sortBy + "&userId=" + uid,
      DEV_API_URL
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setQuestions(data);
  }

  return (
    <div className={styles.home_container}>
      <LumiaStickyBars>
        {" "}
        <>
          {" "}
          <Post className={`${styles.post_cards}  ${styles.first_post_card}`} />
          <div
            style={{
              position: "relative",
              height: "60px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ top: "10", right: 0, position: "absolute" }}>
              <SortDropdown />
            </div>
          </div>
          {questions.map((question: Question, index: number) => {
            return (
              <Post
                key={index}
                className={styles.post_cards}
                content={question.content}
                question={question}
                onClick={async () => {
                  dispatch(loadSelectedQuestion(question));
                  router.push({
                    pathname: "/questions/" + question.id,
                    query: { questionId: question.id },
                  });
                }}
              />
            );
          })}
          
        </>
      </LumiaStickyBars>
    </div>
  );
};

export default Home;
