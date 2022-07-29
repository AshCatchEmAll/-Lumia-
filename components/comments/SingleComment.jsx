import React, { useState } from "react";

import CommentCard from "./CommentCard";
import LikeDislikes from "./LikeDislikes";
import ReplyComment from "./ReplyComment";
import Button from "@mui/material/Button";
import { DEV_API_URL } from "../../config/urls";
import { useDispatch, useSelector } from "react-redux";
import { hideReplies as dispatchHideReplies} from "../../redux/slices/commentSlice";
function SingleComment(props) {
  const [replies, setReplies] = useState(false);
  const [replyAnswers, setReplyAnswers] = useState([]);
   const dispatch =  useDispatch();

  const showReplies = async () => {
    if(replies===true) return;
    setReplies(true);

    await fetchReplyComments();
  };
 
  const hideReplies = async () => {
    setReplies(false);
    setReplyAnswers([]);
    dispatch(dispatchHideReplies());
  };

  const fetchReplyComments = async () => {
    console.log(process.env.DEV_API_URL);
    const url = new URL(
      "/api/answer?questionId=" +
        props.questionId +
        "&answerId=" +
        props.answer.id,
      DEV_API_URL
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
    setReplyAnswers(data["answers"]);
    setReplies(true);
    // Pass data to the page via props
  };

  const openReplies = useSelector((state) => {
    if(state.commentReducer.openReplies.parentAnswerId===props.answer.id){
        showReplies();
    }
  });
  return (
    <div style={{marginBottom:"25px"}}>
      <CommentCard answer={props.answer}/>
      {replies === false ?(
        <>
          <Button
            sx={{ fontSize: "12px", marginLeft: "22px", color: "#0C0D13" }}
            onClick={showReplies}
          >
            View Replies
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={hideReplies}
            sx={{ fontSize: "12px", marginLeft: "22px", color: "#0C0D13" }}
          >
            Hide Reply
          </Button>
          <ReplyComment
            answers={replyAnswers}
            parentAnswerId={props.answer.id}
            questionId={props.questionId}
            refreshComments={props.refreshComments}
          />
        </>
      )}
    </div>
  );
}

export default SingleComment;
