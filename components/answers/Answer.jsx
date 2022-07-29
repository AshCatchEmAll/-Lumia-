import {
  Avatar,
  Typography,
  Box,
  Button,
  IconButton,
  Icon,
  useMediaQuery,
} from "@mui/material";
import { MoreHoriz, MoreVert, ThumbDown, ThumbUp } from "@mui/icons-material";
import styles from "../../styles/Home.module.css";
import answerStyle from "../../styles/Answers.module.css";
import AnswerReplies from "./AnswerReplies";
import AnswerReplyTextField from "./AnswerReplyTextField";
import ReadMore from "./ReadMore";
import AnswerPopOver from "./AnswerPopOver";
import { useDispatch, useSelector } from "react-redux";
import { openReplyTextField } from "../../redux/slices/commentSlice";
import React, { useEffect, useState } from "react";
import { rootVariant } from "./variants";
import { Card } from "@mui/material";
import { addCommentActionString } from "../../redux/slices/dynamicCommentReducer";
import { VoteType } from "@prisma/client";
import { getCurrentUserUID } from "../auth/firebaseHelpers";
import { useAuth } from "../auth/AuthProvider";
import {  useMutation } from '@apollo/client';
import {publishUnreadMutation} from "../../pages/questions/graphqlHelpers";

export function Answer({ answer, variant = rootVariant }) {
  const thisAnswer = useSelector(
    (state) => state.dynamicCommentReducer[answer.id]
  );
  const mobileScreen = useMediaQuery("(max-width:400px)");
  const currentUser = useAuth()
 
  const user = {
    userId: currentUser.user.uid,
  };
  const dispath = useDispatch();

  let isReplyTextFieldOpen = false;

  const handleOpenReplies = () => {
    if (isReplyTextFieldOpen === false) {
      dispath(
        openReplyTextField({
          open: true,
          parentAnswerId: answer.id,
        })
      );
    } else {
      dispath(
        openReplyTextField({
          open: false,
          parentAnswerId: -1,
        })
      );
    }
    isReplyTextFieldOpen = !isReplyTextFieldOpen;
  };
  //Get how many minutes ago the answer was posted
  const elapsedTime = (createdAt) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const current = new Date();
    const elapsed = current - createdAt;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  };
  const renderReplies = (visibility, sx) => {
    if (visibility === true) {
      return (
        <React.Fragment>
          <AnswerReplyTextField answer={answer} />
          {/* View Replies */}

          <AnswerReplies answer={answer} />
        </React.Fragment>
      );
    }
  };

  return (
    thisAnswer && (
      <Card
        elevation={0}
        className={styles.post_cards}
        sx={{ position: "relative" }}
      >
        <div className={answerStyle.answer_container} key={answer.id}>
          {variant === rootVariant ? (
            <Avatar src={answer.user.avatar}/>
          ) : (
            <Avatar src={answer.user.avatar} sx={{ width: 35, height: 35 }} />
          )}
          <div className={answerStyle.answer_content_container}>
            <div className={answerStyle.answer_content_container}>
              <div className={answerStyle.answer_header_container}>
                <Typography sx={{ fontSize: mobileScreen ? "14px" : "16px" }}>
                  {answer.user.name}
                </Typography>
                <Box width={10} />
                <Typography
                  sx={{
                    whiteSpace: "pre-line",
                    fontSize: mobileScreen ? "14px" : "16px",
                    flex: 1,
                  }}
                >
                  {elapsedTime(new Date(answer.createdAt))}
                </Typography>
                <div style={{ position: "absolute", top: 15, right: 8 }}>
                  <AnswerPopOver answer={answer} />
                </div>
              </div>
              <ReadMore content={answer.content} />
              <div className={answerStyle.answer_btn_container}>
                <ThumbUpComponent answer={answer} user={user} />

                <Box width={10} />
                <ThumbDownComponent answer={answer} user={user} />

                <Box width={18} />
                <Button
                  onClick={handleOpenReplies}
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  Reply
                </Button>
              </div>
              {renderReplies(mobileScreen === false)}
            </div>
          </div>
        </div>
        {renderReplies(mobileScreen === true, { marginLeft: "10px" })}
      </Card>
    )
  );
}

function ThumbDownComponent({ answer ,user}) {

  const dislike = useSelector(
    (state) => state.dynamicCommentReducer[answer.id].dislikes
  );
  const userVoted = useSelector(
    (state) =>
      state.dynamicCommentReducer[answer.id].votes !== undefined &&
      state.dynamicCommentReducer[answer.id].votes.length > 0 &&
      state.dynamicCommentReducer[answer.id].votes[0].type == VoteType.DISLIKE
  );
  const [isVoted, setIsVoted] = useState(userVoted);
  useEffect(() => {
    if (userVoted !== isVoted) {
      setIsVoted(userVoted);
    }
  }, [userVoted,dislike]);
  const dispatch = useDispatch();
  const onDislike = async () => {
  
    const body = {
      userId: user.userId,
      answerId: answer.id,
      questionId: answer.questionId,
      content: answer.content,

    };
    const response = await fetch("/api/answer/downvotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("Downvoted : ", data);
   
    dispatch({ type: addCommentActionString, payload: data["answer"] });
    setIsVoted(!isVoted);
  };
  return (
    <>
      <IconButton onClick={onDislike}>
        <ThumbDown sx={{ fontSize: "16px", color: isVoted ? "#222845" : "" }} />
      </IconButton>
      <Typography>{dislike}</Typography>
    </>
  );
}

function ThumbUpComponent({ answer,user }) {
  
  const [publishUnread, { data, loading, error }] = useMutation(publishUnreadMutation());

  const likes = useSelector(
    (state) => state.dynamicCommentReducer[answer.id].likes
  );

  const userVoted = useSelector(
    (state) =>
      state.dynamicCommentReducer[answer.id].votes !== undefined &&
      state.dynamicCommentReducer[answer.id].votes.length > 0 &&
      state.dynamicCommentReducer[answer.id].votes[0].type == VoteType.LIKE
  );
  const [isVoted, setIsVoted] = useState(userVoted);
  useEffect(() => {
    
    if (userVoted !== isVoted) {
      setIsVoted(userVoted);
    }
  }, [userVoted, likes]);
  const dispatch = useDispatch();
  const onLike = async () => {
   
    const body = {
      userId: user.userId,
      answerId: answer.id,
      questionId: answer.questionId,
      answer: answer,
      content : answer.content,
      sendTo:answer.userId,
    };
    const response = await fetch("/api/answer/upvotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("Upvoted : ", data);
    dispatch({ type: addCommentActionString, payload: data["answer"] });
    if(data["answer"]["publish"]===true){
      publishUnread({variables:{uid:answer.userId,unread:data["answer"]["count"]}})
    }
    setIsVoted(!isVoted);
  };
  console.log("isVoted : ", userVoted);
  return (
    <>
      {" "}
      <IconButton onClick={onLike}>
        <ThumbUp sx={{ fontSize: "16px", color: isVoted ? "#222845" : "" }} />
      </IconButton>
      <Typography>{likes}</Typography>
    </>
  );
}
