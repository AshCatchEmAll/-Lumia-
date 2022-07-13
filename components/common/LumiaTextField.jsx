import React from "react";
import { TextField ,styled} from '@mui/material';

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({theme, value}) => 
      !value && theme.palette.background.grey01};
  }
`

function LumiaTextField({label,id,defaultValue,width="100%",className=""}){
    return <TextField
    className={className}
    sx={{width:width,margin:"0 auto 0 auto",color:"#222845",input: {
        color: "red",
        background: "#D4D8F0"
      }}}
    
    required
    id={id}
    label={label}
    defaultValue={defaultValue}
  />
}

export default LumiaTextField;