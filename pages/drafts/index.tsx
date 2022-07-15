import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Page from "../../components/home/Page";
import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Button } from "@mui/material";
import LumiaAppBarWithBackButton from "../../components/common/LumiaAppBarWithBackButton";
import { useRouter } from "next/router";

const Drafts: NextPage = () => {
  const [cnt, setCnt] = useState(2);
  const router = useRouter();
  let pages: any = [];
  useEffect(() => {
    // for (let i = 0; i < cnt; i++) {
    //   pages.push(<Page index={i} key={i} />);
    // }
    pages = Page();
  }, []);
  return (
    <div className={styles.home_container}>
        <LumiaAppBarWithBackButton onBackClick={()=>{
            router.back();
        }} />
        <Post className={`${styles.post_cards}  ${styles.first_post_card}`} />
        <Post className={styles.post_cards} />
        <Button
          sx={{ alignSelf: "center", margin: "auto", width: "100%" }}
          onClick={() => setCnt(cnt + 1)}
        >
          Bookmarks
        </Button>

       
       
     
    </div>
  );
};

export default Drafts;
