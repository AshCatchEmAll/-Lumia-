import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //Add your firebase config here
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
