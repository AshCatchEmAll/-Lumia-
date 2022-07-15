import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Page from "../../components/home/Page";
import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Box, Button, TextField } from "@mui/material";
import LumiaAppBarWithPostButton from "../../components/common/LumiaAppBarWithPostButton";
import { useRouter } from "next/router";
import LumiaAppBarWithBackButton from "../../components/common/LumiaAppBarWithBackButton";

const SingleQuestionPage: NextPage = () => {
  const [cnt, setCnt] = useState(2);
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  let pages: any = [];
  useEffect(() => {
    // for (let i = 0; i < cnt; i++) {
    //   pages.push(<Page index={i} key={i} />);
    // }
    pages = Page();
  }, []);
  return (
    <div className={styles.home_container}>
      <LumiaAppBarWithBackButton
        showSearch={false}
        onBackClick={() => {
          router.back();
        }}
        
      />
      <Box height={20} />
      <TextField
        id="outlined-multiline-flexible"
        label="Ask a question"
     
        multiline
        sx={{ width: "90%", height: "80vh" }}
        maxRows={15}
        rows={10}
        value={value}

        
        onChange={handleChange}
      />
     
    </div>
  );
};

export default SingleQuestionPage;
