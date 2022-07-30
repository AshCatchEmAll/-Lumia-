import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Post from "../../components/home/Post";
import styles from "../../styles/Home.module.css";
import LumiaStickyBars from "../../components/common/LumiaStickyBars";
import { Box, Button, TextField } from "@mui/material";
import LumiaAppBarWithPostButton from "../../components/common/LumiaAppBarWithPostButton";
import { useRouter } from "next/router";
import SimpleSnackbar from "../../components/common/Snackbar";
import { CheckBoxRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserUID,
  verifyToken,
} from "../../components/auth/firebaseHelpers";
import { useAuth } from "../../components/auth/AuthProvider";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import DraftCard from "../../components/drafts/DraftCard";
import {
  errorSnackbar,
  showSnackbar,
  successSnackbar,
} from "../../redux/slices/snackbarSlice";

const AddQuestionPage: NextPage = () => {
  const router = useRouter();
  const paramDraftId = router.query.draftId;
  const draftContent = useSelector((state: any) => {
   
    if (
      state.draftReducer.selectedDraft !== undefined &&
      state.draftReducer.selectedDraft !== null &&
      state.draftReducer.selectedDraft.content !== undefined &&
      router.query.draftId == state.draftReducer.selectedDraft.id
    ) {
      return state.draftReducer.selectedDraft.content;
    } else {
      return "";
    }
  });
  const dispatch = useDispatch();
  const [value, setValue] = useState(draftContent);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const auth: any = useAuth();

  const user = {
    userId: auth===null || auth.user===null ? null: auth.user.uid,
  };
  const [message, setMessage] = useState("");
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  async function handleDrafts(isDraft:boolean) {
    try {
      if (router.query.draftId) {
        await updateADraftQuestion(isDraft);
        dispatch(
          showSnackbar({
            message: "Draft updated successfully",
            type: successSnackbar,

            open: true,
          })
        );
      } else {
        await handleSubmit(true);
        dispatch(
          showSnackbar({
            message: "Draft created successfully",
            type: successSnackbar,

            open: true,
          })
        );
      }
    } catch (e) {
      
    }
  }

  async function createNewQuestion(isDraft:boolean) {
    try {
      const body = {
        content: value,
        userId: user.userId,
        isDraft: isDraft,
      };
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      dispatch(
        showSnackbar({
          message: "Question added successfully",
          type: successSnackbar,

          open: true,
        })
      );

      
    } catch (e) {
      
      dispatch(
        showSnackbar({
          message: "Error adding question",
          type: errorSnackbar,

          open: true,
        })
      );
    }
  }
  async function handleSubmit(isDraft:boolean) {
    try {
      if(paramDraftId){
        await updateADraftQuestion(isDraft);
      }else{
        await createNewQuestion(isDraft)
      }
      
    } catch (e) {
      
      dispatch(
        showSnackbar({
          message: "Error adding question",
          type: errorSnackbar,

          open: true,
        })
      );
    }
  }

  const handleCancel = () => {
    if (value.length > 0) {
      setOpen(true);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  async function updateADraftQuestion(draft: boolean) {
    const body = {
      content: value,
      userId: user.userId,
      isDraft: draft,
      id: router.query.draftId,
      type: "question",
      
    };
    const response = await fetch("/api/drafts/updateDraft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    
  }
  async function saveAsDraft() {
    try {
      handleDrafts(true);
      handleClose();
    } catch (e) {
      
    }
  }
  return (
    <div className={styles.home_container}>
      <LumiaAppBarWithPostButton
        onBackClick={() => {
          handleCancel();
        }}
        onPostClick={async () => {
          await handleSubmit(false);
        }}
      />
      <Box height={20} />
      <TextField
        id="outlined-multiline-flexible"
        label="Ask a question"
        multiline
        sx={{ width: "90%", height: "80vh" }}
        maxRows={15}
        rows={10}
        value={value}
        onChange={handleChange}
      />
      {snackbarOpen === true ? (
        <CheckBoxRounded sx={{ color: "green" }} />
      ) : null}
      <ConfirmDialog
        open={open}
        title={paramDraftId ? "Update draft" : "Save as draft"}
        content={
          paramDraftId ? (
            <p>Would you like to update this draft?</p>
          ) : (
            <p>Would you like to save this question as Draft?</p>
          )
        }
        handleSave={saveAsDraft}
        handleClose={handleClose}
        cancelButtonText={"No"}
        confirmButtonText={"Yes"}
      />
    </div>
  );
};

export default AddQuestionPage;
