import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import { Badge, IconButton, useMediaQuery } from "@mui/material";

import { useAuth } from "../auth/AuthProvider";
import { useRouter } from "next/router";
import { loadSelectedQuestion } from "../../redux/slices/questionSlice";
import { Bookmark, BookmarkRemove, DeleteForever } from "@mui/icons-material";
import ConfirmDialog from "../common/ConfirmDialog";
import { addQuestionActionString } from "../../redux/slices/dynamicQuestionReducer";
import { DEV_API_URL } from "../config/urls";

export default function NotificationCard({ className, notification }) {
  const mobileScreen = useMediaQuery("(max-width:400px)");
  const dispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  function handleClose(event) {
    event.stopPropagation();
    event.preventDefault();
    setOpen(false);
  }

  const elapsedTime = (createdAt) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const current = new Date();
    const elapsed = current - createdAt;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  };

  const handleClick = (event) => {
    if (event.defaultPrevented) return;
    if (notification.questionId) {
      router.push({
        pathname: `/questions/${notification.questionId}`,
        query: { questionId: notification.questionId },
      });
    } else {
      router.push({
        pathname: `/questions/${notification.answer.questionId}`,
        query: { questionId: notification.answer.questionId },
      });
    }
  };
  const onIconClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(true);
  };
  const deleteNotification = async (event) => {
    try {
      event.stopPropagation();
      event.preventDefault();
      const url = new URL(
        //@ts-ignore
        "/api/notifications",
        DEV_API_URL
      );
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: notification.id,})
      };
      const response = await fetch(url, options);
      const data = await response.json();
      
      
   
      setVisible(false);
    } catch (e) {
      throw new Error(e);
    }
  };
  return visible === false ? (
    <div></div>
  ) : (
    <Card
      key={notification.id}
      onClick={handleClick}
      className={className}
      sx={{ minWidth: 350 }}
    >
      <CardHeader
        action={
          <IconButton onClick={onIconClick}>
            <DeleteForever sx={{ color: "red" }} />
          </IconButton>
        }
        title={notification.title}
        subheader={elapsedTime(new Date(notification.createdAt))}
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontSize: mobileScreen ? "14px" : "16px" }}
        >
          {notification.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
      <ConfirmDialog
        title="Delete Bookmark"
        content={<p>Are you sure you want to delete this notification?</p>}
        open={open}
        handleClose={handleClose}
        handleSave={deleteNotification}
        confirmButtonText="Delete"
      ></ConfirmDialog>
    </Card>
  );
}
