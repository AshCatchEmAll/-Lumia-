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
import { Bookmark, DeleteForever, Drafts } from "@mui/icons-material";
import ConfirmDialog from "../common/ConfirmDialog";
import { addQuestionActionString } from "../../redux/slices/dynamicQuestionReducer";
import { loadSelectedDraft } from "../../redux/slices/draftSlice";

export default function DraftCard({ className, draft }) {
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
    dispatch(loadSelectedDraft(draft));
    router.push({
      pathname: `/addquestion`,
      query: { draftId: draft.id },
    });
  };
  const onIconClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(true);
  };
  const deleteDraft = async (event) => {
    try {
      event.stopPropagation();
      event.preventDefault();
      const response = await fetch(`/api/drafts/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: draft.id, type: "question" }),
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
      key={draft.id}
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
        title={<Badge sx={{ fontSize: "16px" }}>{"Question"}</Badge>}
        subheader={elapsedTime(new Date(draft.createdAt))}
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontSize: mobileScreen ? "14px" : "16px" }}
        >
          {draft.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
      <ConfirmDialog
        title="Delete Draft"
        content={<p>Are you sure you want to delete this draft?</p>}
        open={open}
        handleClose={handleClose}
        handleSave={deleteDraft}
        confirmButtonText="Delete"
      ></ConfirmDialog>
    </Card>
  );
}
