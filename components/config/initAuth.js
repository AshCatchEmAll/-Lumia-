import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseAPI } from "./firebase";

const firebaseConfig = {
  apiKey: firebaseAPI,

  authDomain: "lumia-685bb.firebaseapp.com",

  projectId: "lumia-685bb",

  storageBucket: "lumia-685bb.appspot.com",

  messagingSenderId: "1023718558466",

  appId: "1:1023718558466:web:c1e7dfcc5da3a71253501b",

  measurementId: "G-F5B3FWP3MN",
};

let app;
let auth;


  if (getApps().length == 0) {
    app = initializeApp(firebaseConfig);
    
    auth = getAuth(app);
  
  } else {
    app = getApp();
    auth = getAuth(app);
  }


export default app;
