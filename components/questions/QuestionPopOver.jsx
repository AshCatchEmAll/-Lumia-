import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton, ListItem } from "@mui/material";
import { Bookmark, DeleteForever, Edit, MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
    errorSnackbar,
  infoSnackbar,
  showSnackbar,
  successSnackbar,
} from "../../redux/slices/snackbarSlice";
import { deleteDynamicCommentActionString } from "../../redux/slices/dynamicCommentReducer";
import { deleteDynamicQuestionActionString } from "../../redux/slices/dynamicQuestionReducer";
import { getCurrentUserUID } from "../auth/firebaseHelpers";

export default function MoreOptions({ question }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const uid = getCurrentUserUID()
 
  const user = {
    userId:uid,
  };
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const iconButtonStyling = {
    p: 2,
    fontSize: "16px",
    width: "100%",
    borderRadius: "0",
    justifyContent: "start",
  };

  const onBookmark = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const body = {
      userId: user.userId,
      id: question.id,
      type:"questionBookmark",
    };
    const response = await fetch("/api/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("Bookmarked : ", data);
    if (data["message"]) {
      dispatch(
        showSnackbar({
          message: data["message"],
          type: infoSnackbar,
          open: true,
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Bookmarked Sucessfully",
          type: successSnackbar,
          open: true,
        })
      );
    }
    handleClose(event)
  };
  const onDelete = async (event) => {
    event.stopPropagation();
    event.preventDefault();
   
   
    try {
      const body = {
        userId: user.userId,
        questionId: question.id,
      };
      const response = await fetch("/api/question/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("Deleted : ", data);
      if (data["message"]) {
        dispatch(
          showSnackbar({
            message: data["message"],
            type: infoSnackbar,
            open: true,
          })
        );
      } else {
        dispatch(
          showSnackbar({
            message: "Deleted Sucessfully",
            type: successSnackbar,

            open: true,
          })
        );
        dispatch({ type: deleteDynamicQuestionActionString, payload: question });
      }
    } catch (e) {
        console.log("Error deleting answer", e);
      dispatch(
        showSnackbar({
          message: "Something went wrong",
          type: errorSnackbar,
          open: true,
        })
      );
    }
    handleClose(event)
  };
  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div>
          <IconButton sx={iconButtonStyling} onClick={onBookmark}>
            <Bookmark sx={{ color: "#000000" }} />
            Bookmark
          </IconButton>
        </div>
        {user.userId === question.userId ? (
          <div>
            <IconButton sx={iconButtonStyling}>
              <Edit sx={{ color: "#52bcdb" }} />
              Edit{" "}
            </IconButton>
          </div>
        ) : null}
        {user.userId === question.userId ? (
          <div>
            <IconButton sx={iconButtonStyling} onClick={onDelete}>
              <DeleteForever sx={{ color: "red" }} />
              Delete{" "}
            </IconButton>
          </div>
        ) : null}
      </Popover>
    </div>
  );
}
