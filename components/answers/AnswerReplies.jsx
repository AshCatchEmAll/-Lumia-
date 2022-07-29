import { Typography,Button, useMediaQuery } from "@mui/material";
import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEV_API_URL } from "../../config/urls";
import { openReplies } from "../../redux/slices/commentSlice";
import { loadDynamicCommentsActionString } from "../../redux/slices/dynamicCommentReducer";
import { Answer } from "./Answer";
import AnswerGroup from "./AnswerGroup";
import { replyVariant } from "./variants";
import answerStyle from "../../styles/Answers.module.css";
import { getCurrentUserUID } from "../auth/firebaseHelpers";
function AnswerReplies({ answer }) {
  const mobileScreen = useMediaQuery("(max-width:400px)");
  console.log("Mobile screen: ", mobileScreen);
  const dispatch =   useDispatch();
  const [viewReplies, setViewReplies] = useState(false);
  const [answers, setAnswers] = useState([]);
  const uid = getCurrentUserUID()
 
 
 
  
  const fetchReplyComments = async () => {
   
    console.log(process.env.DEV_API_URL);
    const url = new URL(
      "/api/answer?questionId=" +
        answer.questionId +
        "&answerId=" +
        answer.id + "&userId=" + uid,
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
    setAnswers(data["answers"]);
    setViewReplies(true);
    dispatch({ type: loadDynamicCommentsActionString, payload: data["answers"] });
    // Pass data to the page via props
  };
  return (
    <div>
      {viewReplies === false? (
        <Button 
        sx={{paddingLeft:0, marginLeft: mobileScreen ? "15px" : "0"}}
        onClick={fetchReplyComments}>View Replies</Button>
      ) : (
        <>
          <Button
            onClick={() => {
              setViewReplies(false);
            //   dispatch(
            //     openReplies({
            //         parentAnswerId: -1,
            //         open: false,
            //     })
            // )
            }}
            sx={{paddingLeft:0,marginLeft: mobileScreen ? "15px" : "0"}}
          >
            Hide replies
          </Button>
          {answers.map((ans, index) => (
            <React.Fragment className={answerStyle.answer_container} key={index}>
              <div key={index} style={{ width: "80%"}}>
              
                <Answer answer={ans} variant={replyVariant}/>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
}

export default AnswerReplies;
