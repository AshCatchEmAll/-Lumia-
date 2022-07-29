import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import AccountListTile from "../../components/accounts/AccountsListTile";
import { Avatar, Button, Box } from "@mui/material";
import FirebaseUpload from "../../components/avatar/FirebaseUpload";
import BadgeAvatar from "../../components/avatar/BadgeAvatar";
import {
  getCurrentUserUID,
  verifyToken,
} from "../../components/auth/firebaseHelpers";
import nookies from "nookies";
import { useRouter } from "next/router";

//@ts-ignore

export async function getServerSideProps(context: any) {
  try{
    const cookies = nookies.get(context);
    const token = await verifyToken(cookies);
  
    if (token.uid) {
      return {
        props: {
          user: token,
        },
      };
    } else {
      return {
        user: null,
      };
    }
  }catch(e){
    return {
      user: null,
    };
  }
  
  // Pass data to the page via props
}

const AccountPage: NextPage = ({ user }: any) => {
  const router = useRouter();

 
    return (
      <div
        className={styles.account_container}
        style={{ backgroundColor: "#d4d8f0" }}
      >
        <LumiaStickyBars item={4}>
          {" "}
          <>
            <Box height={20} />
            <div style={{ margin: "auto", width: "100px", height: "100px" }}>
              <BadgeAvatar />
            </div>

            <Box height={20} />
            <AccountListTile />
          </>
        </LumiaStickyBars>
      </div>
    );

};

export default AccountPage;
