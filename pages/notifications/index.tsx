import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import NotificationCard from "../../components/notifications/NotificationCard";
import { Button } from "@mui/material";
import { useAuth } from "../../components/auth/AuthProvider";
import { DEV_API_URL } from "../../components/config/urls";
import { useDispatch, useSelector } from "react-redux";
import { updateUnread } from "../../redux/slices/notifiSlice";
import EmptyState from "../../components/common/EmptyState";

const Notifications: NextPage = () => {
  const auth = useAuth();
  //@ts-ignore
  const dispatch = useDispatch();
  const [notification, setNotification] = useState([]);

  async function resetNotification() {
    const url = new URL(
      //@ts-ignore
      "/api/notifications/seen?userId=" + auth.user.uid,
      DEV_API_URL
    );
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)

  }

  async function getNotifications() {
    const url = new URL(
      //@ts-ignore
      "/api/notifications/all?userId=" + auth.user.uid,
      DEV_API_URL
    );
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
    dispatch(updateUnread(0));
    setNotification(data["notifications"])

  }
  useEffect(() => {
    resetNotification()
  }, []);


  useEffect(()=>{
    getNotifications()
    
  },[])
  return (
    <div className={styles.home_container}>
      <LumiaStickyBars item={3}>
        {" "}
        <>
          {" "}
          { notification.length>0?notification.map((item, index) => {
            return (
              <div key={index}>
                <NotificationCard
                  notification={item}
                  className={styles.post_cards}
                />
              </div>
            );
          }): <EmptyState text={"You got no notifications"}/>}
         
        </>
      </LumiaStickyBars>
    </div>
  );
};

export default Notifications;
