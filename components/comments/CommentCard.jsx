import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Grid, Avatar, IconButton, TextField, CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import commentStyle from "../../styles/CommentCard.module.css";
import { openReplyTextField } from "../../redux/slices/commentSlice";
import CommentTextField from "./CommentTextField"
import {
  ThumbUpSharp,
  ThumbDownSharp,
  SendRounded,
  More,
  MoreHoriz,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Home.module.css";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { getCurrentUserUID } from "../auth/firebaseHelpers";
export default function CommentCard({ answer }) {
  const [OpenReply, setOpenReply] = useState(false);
  const dispatch = useDispatch();
  const [CommentValue, setCommentValue] = useState("");
  const [likes, setLikes] = useState(answer.likes);
  const [dislikes, setDislikes] = useState(answer.dislikes);
  const [showMore,setShowMore] = useState(false);
  const uid = getCurrentUserUID()
 
  const user = {
    userId: uid
  };
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onHover = () => {
    setShowMore(true);
  }
  const onLeave = () => {
    setShowMore(false);
  }
  const onLike = async () => {
    const body = {
      userId: user.userId,
      answerId: answer.id,
      questionId: answer.questionId,
    };
    const response = await fetch("/api/answer/upvotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    
    setLikes(data["answer"]["likes"])
  }

  const onDislike = async () => {
    const body = {
      userId: user.userId,
      answerId: answer.id,
      questionId: answer.questionId,
    };
    const response = await fetch("/api/answer/downvotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    
    setDislikes(data["answer"]["dislikes"])
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      content: CommentValue,
      questionId: answer.questionId,
      userId: user.userId,
      isDraft: false,
      isRootAnswer: false,
      parentAnswerId: answer.id,
    };

    

    const response = await fetch(`/api/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    
    setCommentValue("");
    openReply();
    dispatch(openReplyTextField({
      open:true,
      parentAnswerId:answer.id,
    }));
  };
  return (
    <div>
      <Card
      onMouseOver={onHover}
      onMouseLeave={onLeave}
     elevation={0}
    
      className={styles.comment_cards} >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
          showMore===true? <MoreHoriz />:<Box/>
        
        }
          title={answer.userId}
          subheader={new Date(answer.createdAt).toISOString().split("T")[0]}
        />
        <CardContent>
          
          <p style={{ textAlign: "left" }}>{answer.content}</p>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              color: "#7c99bb",
            }}
            onClick={openReply}
          >
            Reply
          </Button>
          <IconButton onClick={onLike}>
            <ThumbUpSharp /> {likes}
          </IconButton>

          <IconButton onClick={onDislike}>
            <ThumbDownSharp /> {dislikes}
          </IconButton>
        </CardActions>
      </Card>
      {OpenReply && (
        <div className={`${commentStyle.comment_row_container} ${commentStyle.comment_reply_row_container}`}>
        <Avatar className={commentStyle.comment_avatar} />
        <div className={commentStyle.comment_container}>

          <CommentTextField
             onChange={handleChange}
             value={CommentValue}
             onClick={onSubmit}
          />
          {/* <TextField
            className={styles.comment_text_field}
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
            rows={5}
            multiline
          />
          <Button
            onClick={onSubmit}
            className={styles.comment_send_btn}
            variant="contained"
            sx={{backgroundColor:"#7c99bb",
            ":hover":{
                backgroundColor:"#EEBBC3",
                color: "#0C0D13"
            }
          }}
            fullWidth
          
          >
            Post
          </Button> */}
        </div>
      </div>
      )}
    </div>
  );
}
