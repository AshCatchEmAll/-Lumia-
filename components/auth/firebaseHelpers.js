import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import app from "../../config/initAuth";
import { DEV_API_URL } from "../../config/urls";
export function getCurrentUserUID() {
  const auth = getAuth(app);
  console.log("Called user UID: ", auth.currentUser?.uid);
  if (auth.currentUser) {
    return auth.currentUser.uid;
  } else {
    return null;
  }
}

export async function signInWithEmailAndPassword(email, password) {
  try {
    const auth = getAuth(app);
    const credentials = await auth.signInWithEmailAndPassword(email, password);
    if (credentials && credentials.user) {
      return {
        uid: credentials.user.uid.toString(),
        email: credentials.user.email.toString(),
        photoURL: credentials.user.photoURL,
        displayName: credentials.user.displayName,
      };
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function authStateObserver(setUID) {
  const auth = getAuth(app);
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      return {
        uid: user.uid.toString(),
        email: user.email.toString(),
        photoURL: user.photoURL,
        displayName: user.displayName,
      };
    } else {
      setUID(null);
      // User is signed out
      // ...
    }
  });
}

export async function verifyToken(cookies) {
  try {
    const url = new URL("/api/auth/firebaseAdmin", process.env.DEV_API_URL);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ cookies }),
    });
    const data = await response.json();
    console.log("Data from verifyToken: ", data);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateUserAvatar(avatar) {
  const auth = getAuth(app);

  try {
    if (auth.currentUser === null || auth.currentUser === undefined) {
      throw Error("No user is signed in");
    }
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
    //call api to update avatar
    const url = new URL("/api/account/avatar", DEV_API_URL);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: auth.currentUser.uid, avatar }),
    });
    const data = await response.json();
    console.log("User updated: ", data);
  } catch (e) {
    console.log("Error updating user: ", e);
    throw e;
  }
}

export async function createNewUser(username, email) {
  const auth = getAuth(app);
  try {
    if (auth.currentUser === null || auth.currentUser === undefined) {
      throw Error("No user is signed in");
    }
    const url = new URL("/api/account/create", DEV_API_URL);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: auth.currentUser.uid,
        name: username,
        email: email,
      }),
    });
    const data = await response.json();
    console.log("User name created: ", data);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
  } catch (e) {
    console.log("Error Creating user: ", e);
    throw e;
  }
}

export async function updateUserDisplayName(name) {
  const auth = getAuth(app);

  try {
    if (auth.currentUser === null || auth.currentUser === undefined) {
      throw Error("No user is signed in");
    }
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    //call api to update avatar
    const url = new URL("/api/account/displayName", DEV_API_URL);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: auth.currentUser.uid, name }),
    });
    const data = await response.json();
    console.log("User name updated: ", data);
  } catch (e) {
    console.log("Error updating user name: ", e);
    throw e;
  }
}
export async function signOut() {
  const auth = getAuth(app);
  await auth.signOut();
}
