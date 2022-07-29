import { TextField ,Button} from "@mui/material";
import { useState } from "react";
import commentStyes from "../../styles/CommentCard.module.css";
import styles from "../../styles/Home.module.css";
function CommentTextField({ onChange, value, onClick }) {
  const [openCommentSpace, setCommentSpace] = useState(false);
const [enableBtn, setEnableBtn] = useState(false);

    const handleChange = (e) => {
       if(e.currentTarget.value.length > 0 && enableBtn === false){
        setEnableBtn(true);
        console.log(e.currentTarget.value.length)
       }else if(e.currentTarget.value.length === 0 && enableBtn === true){
        setEnableBtn(false);
       }
        onChange(e);
    }


    const onCancel = () => {
        setCommentSpace(false);
        
    }
  return openCommentSpace === true ? (
    <div >
      <TextField
       variant="standard"
       style={{ width: "100%", borderRadius: "5px" }}
       label="Add comment"
       className={styles.comment_text_field_standard}
        onChange={handleChange}
        value={value}
      
        placeholder="write some comments"
       
      />
       <div className={commentStyes.comment_button_row}>
       <Button
       
        onClick={onCancel}
        className={styles.comment_send_btn}
        variant="text"
        sx={{
          color:"#0C0D13",
          
        }}
        
      >
        Cancel
      </Button>
      <Button
        onClick={onClick}
        className={styles.comment_send_btn}
        variant="contained"
        disabled={!enableBtn}
        sx={{
          backgroundColor: "#7c99bb",
          ":hover": {
            backgroundColor: "#EEBBC3",
            color: "#0C0D13",
          },
        }}
        
      >
        Post
      </Button>
      
      </div>
    </div>
  ) : (
    <>
      <TextField
      onClick={
        () => {
            setCommentSpace(true);
            }
      }
        variant="standard"
        style={{ width: "100%", borderRadius: "5px" }}
        label="Add comment"
        className={styles.comment_text_field_standard}
      />
    </>
  );
}

export default CommentTextField;
