import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

import { useAuth } from "./AuthProvider";
import { useRouter } from "next/router";
import {
  getCurrentUserUID,
  verifyToken,
} from "./firebaseHelpers";
import nookies from "nookies";
export async function getServerSideProps(context) {
  try{
    const cookies = nookies.get(context);
   
    const token = await verifyToken(cookies);
  
    if (token.uid) {
      
      return {
        props: {
          user: token,
        },
      };
    } else {
      
      return {
        props: {
          user: null,
        },
      };
    }
  }catch(e){
    
    throw e;
  }
  
}

function ProtectedComponent(props) {
  const router = useRouter();

  // useEffect(() => {
  //   
  //   if (props.user === null|| props.user === undefined ) {
  //     router.push("/");
  //   }
  // }, []);
  
  return props.user!==undefined ? (
    props.children
  ) : (
    <div style={{ margin: "auto" }}>
      <CircularProgress />
    </div>
  );
}

export default ProtectedComponent;
