import React, { useState } from "react";

import { Button, IconButton, Input, TextField, Avatar,Box } from "@mui/material";
import { Answer } from "@prisma/client";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { useSelector, useDispatch } from "react-redux";
import { addRootComment } from "../../redux/slices/commentSlice";
import styles from "../../styles/Home.module.css";
import commentStyle from "../../styles/CommentCard.module.css";
import { SendRounded } from "@mui/icons-material";
import CommentTextField from "./CommentTextField";
import { getCurrentUserUID } from "../auth/firebaseHelpers";
function Comments(props) {
  const answers = useSelector((state) => state.commentReducer.comments);
  const dispatch = useDispatch();
  const uid = getCurrentUserUID()
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(props.questionId);

    const body = {
      content: Comment,
      userId: uid,
      questionId: props.questionId,
      isDraft: false,
      isRootAnswer: true,
    };

    const response = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    setComment("");
    // props.refreshComments(data.answer);
    dispatch(addRootComment(data.answer));
  };

  return (
    <div>
      <br />
      {/* <p style={{color:"#7c99bb"}}> Replies</p> */}
      <hr />
      {/* Comment Lists  */}
      {/* Root Comment Form */}
      <div className={commentStyle.comment_row_container}>
        <Avatar className={commentStyle.comment_avatar} />
        <div className={commentStyle.comment_container}>
        <CommentTextField
             onChange={handleChange}
             value={Comment}
             onClick={onSubmit}
          />
        </div>
      </div>
     
      {answers.map((answer, index) => {
        return (
          <div key={index}>
            <SingleComment
              answer={answer}
              questionId={props.questionId}
              refreshComments={props.refreshComments}
            />
            {/* <ReplyComment answers={props.answers} parentAnswerId={answer.id} questionId={props.questionId} refreshComments={props.refreshComments} /> */}
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
