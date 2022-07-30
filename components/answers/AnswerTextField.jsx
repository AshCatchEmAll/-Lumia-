import { TextField, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRootComment, openReplies } from "../../redux/slices/commentSlice";
import { addCommentActionString } from "../../redux/slices/dynamicCommentReducer";

import answerStyle from "../../styles/Answers.module.css";
import styles from "../../styles/Home.module.css";
import { useAuth } from "../auth/AuthProvider";
import { getCurrentUserUID } from "../auth/firebaseHelpers";
import { replyVariant, rootVariant } from "./variants";
function AnswerTextField({ answer = {}, variant = rootVariant, questionId }) {
  const [showBtn, setBtn] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const auth = useAuth();
 
  const user = {
    userId: auth.user.uid,
    avatar: auth.user.photoURL,
    name: auth.user.displayName,
  };
  const onCancel = () => {
    setBtn(false);
    setValue("");
  };

  const onPost = async () => {
    if (variant === rootVariant) {
      const body = {
        content: value,
        userId: user.userId,
        questionId: questionId,
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
     
      setValue("");
      // props.refreshComments(data.answer);
      data.answer.user = user;
      dispatch(addRootComment(data.answer));
      dispatch({
        type: addCommentActionString,
        payload: data.answer,
      });
    } else if (variant === replyVariant) {
      const body = {
        content: value,
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
      data.answer.user = user;

      setValue("");

      dispatch(
        openReplies({
          open: true,
          parentAnswerId: answer.id,
        })
      );
    }
  };
  const handleOnChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  };
  return (
    <div
      className={
        variant === rootVariant
          ? answerStyle.answer_root_textfield
          : answerStyle.answer_textfield_container
      }
    >
      {variant === rootVariant ? (
        <Avatar sx={{ marginRight: "5px" }} />
      ) : (
        <Avatar sx={{ width: 35, height: 35 }} />
      )}

      <Box width={18} />
      <div className={answerStyle.answer_textfield_column_container}>
        <TextField
          multiline
          className={answerStyle.answer_textfield}
          onClick={() => {
            setBtn(true);
          }}
          value={value}
          onChange={handleOnChange}
          variant="standard"
          style={{ width: "100%", borderRadius: "5px" }}
          label="Add comment"
        />
        {showBtn === true ? (
          <div className={answerStyle.answer_textfield_btn_container}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button disabled={!enableBtn} onClick={onPost}>
              Post
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AnswerTextField;
