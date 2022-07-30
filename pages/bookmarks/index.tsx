import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Post from "../../components/home/Post";
import BookmarkCard from "../../components/bookmarks/BookmarkCard";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Button } from "@mui/material";
import LumiaAppBarWithBackButton from "../../components/common/LumiaAppBarWithBackButton";
import { useRouter } from "next/router";
import {
  
  verifyToken,
} from "../../components/auth/firebaseHelpers";
import nookies from "nookies";
import EmptyState from "../../components/common/EmptyState";

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const token = await verifyToken(cookies);
  
  const url = new URL(
    "/api/bookmarks?userId=" + token.uid ,
    process.env.DEV_API_URL
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  
  
    return {
      props: {
        bookmarks: data["bookmarks"],
      },
    };
  

}



const Bookmarks: NextPage = ({bookmarks}:any) => {

  const router = useRouter();
 
  return (
    <div className={styles.home_container}>
        <LumiaAppBarWithBackButton onBackClick={()=>{
            router.back();
        }} />
       
       {
        bookmarks.length>0? bookmarks.map((bookmark:any, index:number)=>{

            return (
                <div key={index}>
                    <BookmarkCard bookmark={bookmark} className={styles.post_cards}/>
                </div>
            )
        }
        ) : <EmptyState text={"You've got no bookmarks"}/>
       }
        

       
       
     
    </div>
  );
};

export default Bookmarks;
