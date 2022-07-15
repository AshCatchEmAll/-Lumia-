import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Page from "../../components/home/Page";
import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import AccountListTile from "../../components/accounts/AccountsListTile";
import { Avatar, Button ,Box} from "@mui/material";

const AccountPage: NextPage = () => {
  const [cnt, setCnt] = useState(2);
  let pages: any = [];
  useEffect(() => {
    // for (let i = 0; i < cnt; i++) {
    //   pages.push(<Page index={i} key={i} />);
    // }
    pages = Page();
  }, []);
  return (
    <div className={styles.account_container}>
      <LumiaStickyBars item={4}>
        {" "}
        <>
        <Box height={20}/>  
          <Avatar  sx={{width:"100px",height:"100px",margin:"auto"}}/>
          <Box height={20}/>
          <AccountListTile/>
         
        </>
      </LumiaStickyBars>
    </div>
  );
};

export default AccountPage;
