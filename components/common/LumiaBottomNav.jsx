import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Paper from "@mui/material/Paper";

import {
  AddCircle,
  Home,
  QuestionAnswer,
  NotificationsActive,
  AccountCircle,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { Badge, useMediaQuery } from "@mui/material";
import { DEV_API_URL, GRAPHQL_API_URL } from "../../config/urls";
import { useDispatch, useSelector } from "react-redux";
import { updateUnread } from "../../redux/slices/notifiSlice";
import { useAuth } from "../auth/AuthProvider";
function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}

export default function LumiaBottomNav({ children, item = 0 }) {
  const [value, setValue] = React.useState(item);
  const ref = React.useRef(null);
  const router = useRouter();
  const mobileScreen = useMediaQuery("(max-width:400px)");

  const styling = mobileScreen ? { fontSize: "0px" } : {};
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />

      {children}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            "& .MuiButtonBase-root": {
              padding: 0,
            },
            "& .MuiBottomNavigationAction-label": {
              ...styling,
            },
            backgroundColor: "#222845",
            "& .Mui-selected, .Mui-selected > svg": {
              color: "#FF748A",
            },
            "& .Mui-selected, .Mui-selected > .MuiBottomNavigationAction-label":
              {
                color: "#FF748A",
              },
            "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
              color: "#EEBBC3",
            },
          }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            sx={styling}
            label="Home"
            onClick={() => {
              router.push("/home");
            }}
            icon={<Home sx={{ color: "#222845" }} />}
          />
          <BottomNavigationAction
            label="Questions"
            onClick={() => {
              router.push("/questions");
            }}
            icon={<QuestionAnswer sx={{ color: "#222845" }} />}
          />
          <BottomNavigationAction
            label="Add"
            sx={styling}
            onClick={() => {
              router.push("/addquestion");
            }}
            icon={<AddCircle sx={{ color: "#222845" }} />}
          />
          <BottomNavigationAction
            label="Notification"
            sx={styling}
            onClick={() => {
              router.push("/notifications");
            }}
            icon={<NotificationBadge />}
          />
          <BottomNavigationAction
            label="Account"
            onClick={() => {
              router.push("/account");
            }}
            icon={<AccountCircle sx={{ color: "#222845" }} />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

function NotificationBadge() {
  const auth = useAuth();
  const unread = useSelector((state) => state.notifReducer.unread);
  const dispatch = useDispatch();

  async function getInitialUnreadCount() {
    const url = new URL(
      "/api/notifications?userId=" + auth.user.uid,
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
    dispatch(updateUnread(data["count"]));
  }
  useEffect(() => {
    try {
      getInitialUnreadCount();
    } catch (e) {
      console.log("Error in getting initial unread count : ", e);
    }
  }, []);
  useEffect(() => {
    const url = new URL(GRAPHQL_API_URL);
    url.searchParams.append(
      "query",
      /* GraphQL */ `
        subscription Notifications($uid: String!) {
          unread(uid: $uid) {
            unread
          }
        }
      `
    );

    url.searchParams.append(
      "variables",
      //@ts-ignore
      JSON.stringify({ uid: auth.user.uid })
    );

    const eventsource = new EventSource(url.toString(), {
      withCredentials: true, // This is required for cookies
    });

    eventsource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);

      dispatch(updateUnread(data.data.unread.unread));
    };
  }, []);
  return (
    <Badge badgeContent={unread} color={"secondary"}>
      <NotificationsActive sx={{ color: "#222845" }} />
    </Badge>
  );
}
