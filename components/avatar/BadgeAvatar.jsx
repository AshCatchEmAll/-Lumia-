import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import { Edit, Label } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../config/initAuth";
import { useAuth } from "../auth/AuthProvider";
import { updateUserAvatar } from "../auth/firebaseHelpers";
const storage = getStorage(app);
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function BadgeAvatar() {
  const auth = useAuth();
  const [file, setFile] = useState(null);
  const [url, setURL] = useState(auth.user!==null? auth.user.photoURL:"");
  const [image, setImage] = useState("");
  const fileInputRef = useRef();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
      handleClickOpen();
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    const path = `${auth.user.uid}/images/${file.name}`;
    const fileRef = ref(storage, path);
    const task = await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);
    setURL(downloadURL);

    setFile(null);
    handleClose();
    updateUserAvatar(downloadURL);
  }
  function onEditClick() {
    fileInputRef.current.click();
  }
  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <label htmlFor="avatar-image-input">
            <IconButton
              onClick={onEditClick}
              sx={{
                color: "white",
                backgroundColor: "black",
                width: "20px",
                height: "20px",
              }}
            >
              <Edit sx={{ width: "15px", height: "15px" }}>
                <input type="file" onChange={handleChange} />
              </Edit>
            </IconButton>
          </label>
        }
      >
        <input
          ref={fileInputRef}
          onChange={handleChange}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="avatar-image-input"
        />
        <Avatar
          alt="Travis Howard"
          src={url}
          sx={{ width: "100px", height: "100px", margin: "auto" }}
        />
        <ConfirmDialog
          open={open}
          content={
            <img
              src={image}
              style={{
                margin: "auto",
                maxWidth: "100px",
                maxHeight: "100px",
                objectFit: "cover",
                borderRadius: "100%",
              }}
            />
          }
          handleSave={handleUpload}
          handleClose={handleClose}
          title="Choose this picture as your avatar?"
        />
      </Badge>
    </>
  );
}
