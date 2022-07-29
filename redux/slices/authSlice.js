import { createSlice } from "@reduxjs/toolkit";

export const loadingStateString = "loading";
export const loggedInStateString = "loggedIn";
export const loggedOutStateString = "loggedOut";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { createNewUser, updateUserDisplayName } from "../../components/auth/firebaseHelpers";
import app from "../../config/initAuth";
// import  getAuth  from "../../config/initAuth";
export const authSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    user: {
        uid: undefined,
        email: undefined,
        photoURL: undefined,
        displayName: undefined,
    },
    loading: false,
    error: null,
  },
  reducers: {
    fetchingUser: (state, action) => {
      state.loading = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error =null
    },
    unsetUser: (state) => {
      state.user = {
        uid: undefined,
        email: undefined,
        photoURL: undefined,
        displayName: undefined,
      };
      state.loading = false;
      state.error =null
    },
    authError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, unsetUser } = authSlice.actions;

export default authSlice.reducer;

export const fetchFirebaseUser = () => async (dispatch) => {
  try {
    dispatch(authSlice.actions.fetchingUser());
    const auth = getAuth(app)
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     dispatch(authSlice.actions.setUser(user));
    //   } else {
    //     // User is signed out
    //     // ...
    //     dispatch(authSlice.actions.unsetUser());
    //   }
    // });

    const currentUser = auth.currentUser;
   
    if (currentUser) {
        
      return dispatch(authSlice.actions.setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
      }));
    } else {
      return dispatch(authSlice.actions.unsetUser());
    }
  } catch (err) {
    console.log(err);
    return dispatch(authSlice.actions.authError(err.message));
  }
};

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      console.log("Email: ", email);
      dispatch(authSlice.actions.fetchingUser());
      const auth = getAuth(app);

      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Credentials: ", credentials);
      if (credentials && credentials.user) {
        return dispatch(
          authSlice.actions.setUser({
            uid: credentials.user.uid.toString(),
            email: credentials.user.email.toString(),
            photoURL: credentials.user.photoURL,
            displayName: credentials.user.displayName,
          })
        );
      }
    } catch (err) {
      console.log(err);
      return dispatch(authSlice.actions.authError(err.code));
    }
  };


export const createUser = ({ username,email, password }) => async (dispatch) => {
  try {
    dispatch(authSlice.actions.fetchingUser());
    const auth = getAuth(app);

    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User: ", user);
    if (user) {
      //update user profile
     
      await createNewUser(username,email);
      return dispatch(
        authSlice.actions.setUser({
          uid: user.user.uid.toString(),
          email: user.user.email.toString(),
          photoURL: user.user.photoURL,
          displayName: user.user.displayName,
        })
      );
    }
  } catch (err) {
    console.log(err);
    return dispatch(authSlice.actions.authError(err.code));
  }
}
