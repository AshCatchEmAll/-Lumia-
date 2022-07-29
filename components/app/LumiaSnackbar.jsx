import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '../../redux/slices/snackbarSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const open = useSelector((state) => state.snackbarReducer.open);
  const message = useSelector((state) => state.snackbarReducer.message);
  const type = useSelector((state) => state.snackbarReducer.type);
  // const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar())
   
  };

  return (
    
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      
    
  );
}
