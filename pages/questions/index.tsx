import type { NextPage } from "next";
import { useEffect, useState } from "react";
import  Page  from "../../components/home/Page";
import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Button } from "@mui/material";

const Questions: NextPage = () => {
  const [cnt, setCnt] = useState(2);
  let pages : any = [];
  useEffect(() => {
    // for (let i = 0; i < cnt; i++) {
    //   pages.push(<Page index={i} key={i} />);
    // }
   pages = Page()

  }, []);
  return (
  
    <div className={styles.home_container}>
       
      
        <LumiaStickyBars item={1}> <> <Post className={`${styles.post_cards}  ${styles.first_post_card}`}/>
        <Post className={styles.post_cards}/>
        <Post className={styles.post_cards}/>
        <Post className={styles.post_cards}/>
        <Post className={styles.post_cards}/>
        <Button  sx={{alignSelf:"center",margin:"auto",width:"100%"}} onClick={() => setCnt(cnt + 1)}>Questions</Button></></LumiaStickyBars>
     
      </div>
   
  );
};

export default Questions;
