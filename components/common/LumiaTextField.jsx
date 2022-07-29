import React from "react";
import { TextField ,styled} from '@mui/material';

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({theme, value}) => 
      !value && theme.palette.background.grey01};
  }
`

function LumiaTextField({label,id,hidden=false,controller,controllerFunction,width="100%",className=""}){
    return <TextField
    className={className}
    sx={{width:width,margin:"0 auto 0 auto",color:"#222845",input: {
       
        background: "#D4D8F0"
      }}}
    value={controller}
    onChange={(e)=>controllerFunction(e.target.value)}
    required
    id={id}
    label={label}
   hidden
  />
}

export default LumiaTextField;