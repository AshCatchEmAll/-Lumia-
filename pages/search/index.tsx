import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Page from "../../components/home/Page";
import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Button } from "@mui/material";
import LumiaSearchAppBar from "../../components/common/LumiaSearchAppBar";
import { useRouter } from "next/router";
import LumiaAppBar from "../../components/common/LumiaAppBar";

const Bookmarks: NextPage = () => {
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
        <LumiaSearchAppBar  onBackClick={
            ()=> router.back()
        } />
        
     
    </div>
  );
};

export default Bookmarks;
