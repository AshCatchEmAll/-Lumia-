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
import { Bookmark, BookmarkRemove } from "@mui/icons-material";
import ConfirmDialog from "../common/ConfirmDialog";
import { addQuestionActionString } from "../../redux/slices/dynamicQuestionReducer";

export default function BookmarkCard({ className, bookmark }) {
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
    if (bookmark.questionId) {
      router.push({
        pathname: `/questions/${bookmark.questionId}`,
        query: { questionId: bookmark.questionId },
      });
    } else {
      router.push({
        pathname: `/questions/${bookmark.answer.questionId}`,
        query: { questionId: bookmark.answer.questionId },
      });
    }
  };
  const onIconClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(true);
  };
  const deleteBookmark = async (event) => {
    try {
      event.stopPropagation();
      event.preventDefault();
      const response = await fetch(`/api/bookmarks/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bookmark.id, type: "questionBookmark" }),
      });

      
      setVisible(false);
    } catch (e) {
      throw new Error(e);
    }
  };
  return visible === false ? (
    <div></div>
  ) : (
    <Card
      key={bookmark.id}
      onClick={handleClick}
      className={className}
      sx={{ minWidth: 350 }}
    >
      <CardHeader
        action={
          <IconButton onClick={onIconClick}>
            <BookmarkRemove sx={{ color: "red" }} />
          </IconButton>
        }
        title={
          <Badge sx={{ fontSize: "16px" }}>
            {bookmark.questionId ? "Question" : "Answer"}
          </Badge>
        }
        subheader={elapsedTime(new Date(bookmark.createdAt))}
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontSize: mobileScreen ? "14px" : "16px" }}
        >
          {bookmark.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
      <ConfirmDialog
        title="Delete Bookmark"
        content={<p>Are you sure you want to delete this bookmark?</p>}
        open={open}
        handleClose={handleClose}
        handleSave={deleteBookmark}
        confirmButtonText="Delete"
      ></ConfirmDialog>
    </Card>
  );
}
