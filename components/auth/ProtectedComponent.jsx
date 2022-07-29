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
      console.log("FGOING CRAZY")
      return {
        props: {
          user: token,
        },
      };
    } else {
      console.log("FGOING CRAZY INNER")
      return {
        props: {
          user: null,
        },
      };
    }
  }catch(e){
    console.log(e)
    throw e;
  }
  
}

function ProtectedComponent(props) {
  const router = useRouter();

  // useEffect(() => {
  //   console.log("ProtectedComponent ", props.user);
  //   if (props.user === null|| props.user === undefined ) {
  //     router.push("/");
  //   }
  // }, []);
  console.log(props.user)
  return props.user!==undefined ? (
    props.children
  ) : (
    <div style={{ margin: "auto" }}>
      <CircularProgress />
    </div>
  );
}

export default ProtectedComponent;
