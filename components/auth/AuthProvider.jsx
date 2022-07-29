import React, { createContext, useContext, useState ,useEffect} from "react";
import nookies from "nookies";
import app from "../../config/initAuth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const AuthContext =
  createContext({
    user: null,
  });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter()
  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return getAuth(app) .onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        console.log("Nookies ");
        nookies.set(undefined, "token", "", { path: "/" });
        router.replace("/");
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getAuth(app).currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
