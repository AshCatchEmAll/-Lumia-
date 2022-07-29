import { useMediaQuery } from "@mui/material";
import { Typography } from "antd";
import React, { useState } from "react";
import answerStyles from "../../styles/Answers.module.css";

const ReadMore = ({ content = "" }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const [showButtons,setShowButtons] = useState(content!==undefined && content.trim().length>150);
 
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const mobileScreen = useMediaQuery("(max-width:400px)");
  return (
    <Typography
      className={answerStyles.answer_content_text}
      sx={{ fontSize: mobileScreen ? "14px" : "16px" }}
    >
      {isReadMore ? content.trim().slice(0, 150) : content}
      {showButtons && <span onClick={toggleReadMore} className={answerStyles.read_or_hide}>
        {isReadMore ? "...read more" : " show less"}
      </span>}
    </Typography>
  );
};


export default ReadMore;