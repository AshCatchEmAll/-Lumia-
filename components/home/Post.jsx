import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import QuestionPopOver from "../questions/QuestionPopOver";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { getCurrentUserUID } from "../auth/firebaseHelpers";
import { VoteType } from "@prisma/client";
import { addQuestionActionString } from "../../redux/slices/dynamicQuestionReducer";
import { useAuth } from "../auth/AuthProvider";
import {  useMutation ,gql} from '@apollo/client';

export default function Post({
  className,
  question = {},
  onClick = () => {},
  key = 1,
  content = "",
}) {
  const mobileScreen = useMediaQuery("(max-width:400px)");
  const thisQuestion = useSelector(
    (state) => state.dynamicQuestionReducer[question.id]
  );

  const auth = useAuth();
  const  uid  = auth.user ===null ? "" : auth.user.uid;
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

  const handleClick = (event) => {
    
    if (event.defaultPrevented) return;
    onClick(event);
  };
  return (
    thisQuestion && (
      <Card
        key={key}
        onClick={handleClick}
        className={className}
        sx={{ minWidth: 350 }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={question.user.avatar}
            />
          }
          action={<QuestionPopOver question={question} />}
          title={question.user.name}
          subheader={elapsedTime(new Date(question.createdAt))}
        />

        <CardContent>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: mobileScreen ? "14px" : "16px" }}
          >
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <QuestionLikes question={question} user={{ userId: uid }} />
          <Box width={10} />
          <QuestionDislikes question={question} user={{ userId: uid }} />
          <Box width={10} />
        </CardActions>
      </Card>
    )
  );
}

function QuestionLikes({ question, user }) {

  const [publishUnread, { data, loading, error }] = useMutation(gql`
  # Increments a back-end counter and gets its resulting value
  mutation updateUnread($uid: String!, $unread: Int!) {
    publishUnread(uid: $uid, unread: $unread) 
  }
`);
  const likes = useSelector(
    (state) => state.dynamicQuestionReducer[question.id].likes
  );
  const userVoted = useSelector(
    (state) =>
      state.dynamicQuestionReducer[question.id].votes !== undefined &&
      state.dynamicQuestionReducer[question.id].votes.length > 0 &&
      state.dynamicQuestionReducer[question.id].votes[0].type == VoteType.LIKE
  );
  const [isVoted, setIsVoted] = useState(userVoted);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userVoted !== isVoted) {
      setIsVoted(userVoted);
    }
  }, [userVoted, likes]);
  const onLike = async (event) => {
    try{
      event.stopPropagation();
      event.preventDefault();
      const body = {
        userId: user.userId,
        questionId: question.id,
        content : question.content,
        sendTo:question.userId
      };
      const response = await fetch("/api/question/upvotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      
      dispatch({ type: addQuestionActionString, payload: data["question"] });
      if(data["question"]["publish"]===true){
        publishUnread({variables:{uid:question.userId,unread:data["question"]["count"]}})
      }
      setIsVoted(!isVoted);
    }catch(e){
      
      throw new Error(e)
    }
    
  };

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

function QuestionDislikes({ question, user }) {
  const dislike = useSelector(
    (state) => state.dynamicQuestionReducer[question.id].dislikes
  );
  const dispatch = useDispatch();
  const userVoted = useSelector(
    (state) =>
      state.dynamicQuestionReducer[question.id].votes !== undefined &&
      state.dynamicQuestionReducer[question.id].votes.length > 0 &&
      state.dynamicQuestionReducer[question.id].votes[0].type ==
        VoteType.DISLIKE
  );
  const [isVoted, setIsVoted] = useState(userVoted);
  useEffect(() => {
    if (userVoted !== isVoted) {
      setIsVoted(userVoted);
    }
  }, [userVoted, dislike]);
  const onDislike = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const body = {
      userId: user.userId,
      questionId: question.id,
      content : question.content,
      sendTo : question.userId,
    };
    const response = await fetch("/api/question/downvotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    
    setIsVoted(!isVoted);
    dispatch({ type: addQuestionActionString, payload: data["question"] });
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
