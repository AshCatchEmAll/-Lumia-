import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({open,handleSave,handleClose,content,title,confirmButtonText="Save",cancelButtonText="Cancel"}) {
 
  return (
    <div>
      <Dialog
         
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         {title}
        </DialogTitle>
        <DialogContent style={{margin:"auto"}}>
          <DialogContentText id="alert-dialog-description">
           {
            content
           }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"#222845"}} onClick={handleClose}>{cancelButtonText}</Button>
          <Button onClick={handleSave} autoFocus variant="contained" sx={{color:"white",backgroundColor:"#222845"}}>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
