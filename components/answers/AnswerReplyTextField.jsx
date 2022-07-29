import AnswerTextField from "./AnswerTextField";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { replyVariant } from "./variants";
function AnswerReplyTextField({ answer }) {
  const openReplyTexfield = useSelector((state) => {
    return (
      state.commentReducer.openReplyTextField.parentAnswerId === answer.id &&
      state.commentReducer.openReplyTextField.open
    );
  });
  return openReplyTexfield === true ? (
    <div>
      <AnswerTextField variant={replyVariant} answer={answer}/>
    </div>
  ) : (
    <Box />
  );
}

export default AnswerReplyTextField;
