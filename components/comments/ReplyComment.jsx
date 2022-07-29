import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  

  

  let renderReplyComment = () =>
    props.answers.map((answer, index) => (
      <React.Fragment key={index}>
        <div key={index} style={{ width: "80%", marginLeft: "40px" }}>
          <SingleComment
            answer={answer}
            questionId={answer.questionId}
           
          />
          {/* <ReplyComment
            answers={props.answers}
            parentAnswerId={answer.id}
            questionId={props.questionId}
            refreshComments={props.refreshComments}
          /> */}
        </div>
      </React.Fragment>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={handleChange}
        >
          View more comment(s)
        </p>
      )}

   { renderReplyComment()}
    </div>
  );
}

export default ReplyComment;
