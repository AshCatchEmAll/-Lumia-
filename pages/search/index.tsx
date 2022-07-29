import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";

import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Button } from "@mui/material";
import LumiaSearchAppBar from "../../components/common/LumiaSearchAppBar";
import { useRouter } from "next/router";
import LumiaAppBar from "../../components/common/LumiaAppBar";

import { DEV_API_URL } from "../../components/config/urls";
import { useDispatch, useSelector } from "react-redux";
import { loadDynamicQuestionsActionString } from "../../redux/slices/dynamicQuestionReducer";
import { searchQuery } from "../../redux/slices/questionSlice";

const Bookmarks: NextPage = () => {
  const router = useRouter();

  const queryString = useSelector(
    (state: any) => state.questionReducer.searchQuery
  );
  const [questions, setQuestions] = useState([]);
  const focusSearch = useRef(null);
  const dispatch = useDispatch();
  // useEffect - FOCUS ON SEARCH INPUT

  useEffect(() => {
    //@ts-ignore
    // if(focusSearch.current!==null){
    //   focusSearch.current.
    // }
  }, []);

  // FETCH API DATA
  const getQuestions = async () => {
    const url = new URL("/api/question/search", DEV_API_URL);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: queryString }),
    });
    const data = await response.json();
    dispatch({
      type: loadDynamicQuestionsActionString,
      payload: data["question"],
    });
    return data["question"];
  };

  // PREVENTS RERENDER FLICKERING AS USER TYPES IN SEARCH
  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // useEffect - ONLY RERENDERS WHEN query IS CHANGED
  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadQuestions = async () => {
      if (!queryString) return setQuestions([]);

      await sleep(350);
      if (currentQuery) {
        const q = await getQuestions();
        console.log("QUESTIONS : ", q);
        setQuestions(q);
      }
    };
    loadQuestions();

    return () => {
      currentQuery = false;
      controller.abort();
     
    };
  }, [queryString]);

  return (
    <div className={styles.home_container}>
      <LumiaSearchAppBar onBackClick={() => router.back()} />
      {questions.map((question: any) => {
        return (
          <Post
            key={question.id}
            className={styles.post_cards}
            content={question.content}
            question={question}
            onClick={() => {
              router.push({
                pathname: "/questions/" + question.id,
                query: { questionId: question.id },
              });
            }}
          />
        );
      })}
    </div>
  );
};

export default Bookmarks;
