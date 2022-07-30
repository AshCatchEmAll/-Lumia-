import type { NextPage, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";

import styles from "../styles/Login.module.css";

import logo from "../assets/logo.svg";
import LumiaTextField from "../components/common/LumiaTextField";
import LumiaPasswordTextfield from "../components/common/LumiaPasswordTextfield";
import { Button, Box, CircularProgress } from "@mui/material";
import { NextRouter, useRouter } from "next/router";
import { createUser, fetchFirebaseUser, loginUser, setUser } from "../redux/slices/authSlice";

import { useDispatch } from "react-redux";
import ProtectedComponent from "../components/auth/ProtectedComponent";
import { Store } from "@mui/icons-material";
import Home from "./home";
import {
  getCurrentUserUID,
  verifyToken,
} from "../components/auth/firebaseHelpers";
import { useAuth } from "../components/auth/AuthProvider";

import nookies from "nookies";

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  console.log("COOKIES : ", cookies);
  if (cookies.token === "") {
    return {
      props: {
        user: null,
      },
    };
  } else {
    const token = await verifyToken(cookies);

    // Pass data to the page via props
    return {
      props: {
        user: token,
      },
    };
  }
}

type Props = {
  user: any;
};
const LandingPage: NextPage<Props> = ({ user }) => {
  const router = useRouter();
  const auth: any = useAuth();
  useEffect(() => {
    if (user !== null && user.uid !== undefined) {
      router.replace("/home");
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Lumia</title>
        <meta name="description" content="Being a student made easy" />
        <link rel="icon" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div style={{ marginTop: "50px" }}></div>
      {user === null || user.uid === null || user.uid === undefined ? (
        <SignupOrLogin />
      ) : null}
    </div>
  );
};
function SignupOrLogin() {
  const [showSignup, setShowSignup] = useState<boolean>(false);

  if (showSignup) {
    return <RegisterPageColumn setShowSignup={setShowSignup}/>;
  } else {
    return <LoginPageColumn setShowSignup={setShowSignup}/>;
  }
}
function LoginPageColumn({setShowSignup}:any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const loginApi = async () => {
    try {
      //@ts-ignore
      const user = dispatch(loginUser({ email, password }));
      console.log("Login result", user.payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.login_column}>
      <img src={logo.src} className={styles.logo} />
      <h1 className={styles.lumia_title}>Lumia</h1>
      <div className={styles.top_rounded_container}>
        <h2 className={styles.welcome_back}>Welcome back</h2>
        <LumiaTextField
          className={styles.email_textfield}
          label={"email"}
          id={"email"}
          controller={email}
          controllerFunction={setEmail}
          width={"80%"}
          hidden={true}
        />

        <Box className={styles.box} sx={{ height: "15px" }} />
        <LumiaPasswordTextfield
          className={styles.email_textfield}
          label={"password"}
          id={"password"}
          controller={password}
          controllerFunction={setPassword}
          width={"80%"}
        />

        <p className={styles.forgot_password}>Forgot password?</p>
        <Button
          className={styles.login_button}
          variant="contained"
          sx={{
            width: "80%",
            height: "50px",
            margin: "0px",
            backgroundColor: "#EEBBC3",
            color: "#222845",
          }}
          onClick={async () => {
            try {
              await loginApi();
            } catch (e) {
              console.log(e);
            }

            router.push("/home");
          }}
        >
          Login
        </Button>
        <p className={styles.sign_up_text}>
          Dont have an account? <Button onClick={()=>setShowSignup(true)}>Create one</Button>
        </p>
        <Footer/>
      </div>
    </div>
  );
}

function RegisterPageColumn({setShowSignup}:any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const loginApi = async () => {
    try {
      //@ts-ignore
      const user = dispatch(createUser({ username, email, password }));
      console.log("Register result", user.payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.login_column}>
      <img src={logo.src} className={styles.logo} />
      <h1 className={styles.lumia_title}>Lumia</h1>
      <div className={styles.top_rounded_container}>
        <h2 className={styles.welcome_back}>Hello 👋</h2>
        <LumiaTextField
          className={styles.email_textfield}
          label={"Username"}
          id={"username"}
          controller={username}
          controllerFunction={setUsername}
          width={"80%"}
        />

        <LumiaTextField
          className={styles.email_textfield}
          label={"email"}
          id={"email"}
          controller={email}
          controllerFunction={setEmail}
          width={"80%"}
          hidden={true}
        />

        <Box className={styles.box} sx={{ height: "15px" }} />
      
        <LumiaPasswordTextfield
          className={styles.email_textfield}
          label={"password"}
          id={"password"}
          controller={password}
          controllerFunction={setPassword}
          width={"80%"}
        />

        <Button
          className={styles.login_button}
          variant="contained"
          sx={{
            width: "80%",
            height: "50px",
            margin: "0px",
            backgroundColor: "#EEBBC3",
            color: "#222845",
          }}
          onClick={async () => {
            try {
              await loginApi();
            } catch (e) {
              console.log(e);
            }

            router.push("/home");
          }}
        >
          Register
        </Button>
        <p className={styles.sign_up_text}>Already have an account? <Button onClick={()=>setShowSignup(false)}>Login</Button></p>
       
          <Footer/>
      </div>
    
    </div>
  );
}

function Footer(){
  return (
    <div className={styles.footer}>
    <p><Button 
      onClick={()=>{window.open("https://hashnode.com/", "_blank")}}
    sx={{color:"#2962ff"}}>Hashnode</Button> x <Button 
    onClick={()=>{window.open("https://planetscale.com/", "_blank")}}
    sx={{color:"#111111"}}>Planetscale</Button></p>
  </div>)
}

export default LandingPage;
