import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import { Button } from "@mui/material";
import LumiaAppBarWithBackButton from "../../components/common/LumiaAppBarWithBackButton";
import { useRouter } from "next/router";
import { verifyToken } from "../../components/auth/firebaseHelpers";
import DraftCard from "../../components/drafts/DraftCard";
import nookies from "nookies";
import EmptyState from "../../components/common/EmptyState";

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const token = await verifyToken(cookies);

  const url = new URL(
    "/api/drafts?userId=" + token.uid,
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
      drafts: data["drafts"],
    },
  };
}

const Drafts: NextPage = ({ drafts }: any) => {

  const router = useRouter();
 
  return (
    <div className={styles.home_container}>
      <LumiaAppBarWithBackButton
        onBackClick={() => {
          router.back();
        }}
      />

      {drafts.length>0? drafts.map((draft: any, index: number) => {
        return (
          <div key={index}>
            <DraftCard draft={draft} className={styles.post_cards} />
          </div>
        );
      }): <EmptyState text={"You got no drafts"}/>}
     
    </div>
  );
};

export default Drafts;
