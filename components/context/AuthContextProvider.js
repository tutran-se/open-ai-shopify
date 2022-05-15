import React, { useState, useEffect, useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/firebase";

const AuthContext = React.createContext();

const googleProvider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthStateReady: false,
    isAuthenticated: false,
  });
  const [userInfo, setUserInfo] = useState({});
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const { displayName, photoURL, email, uid } = user;
      setUserInfo({ displayName, photoURL, email, uid });
      setAuthState({ isAuthStateReady: true, isAuthenticated: true });
    } catch (error) {
      setUserInfo({});
      setAuthState({ isAuthStateReady: true, isAuthenticated: false });
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, email, uid } = user;
        setUserInfo({ displayName, photoURL, email, uid });
        setAuthState({ isAuthStateReady: true, isAuthenticated: true });
      } else {
        // User is signed out
        setUserInfo(null);
        setAuthState({ isAuthStateReady: true, isAuthenticated: false });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...authState, userInfo, setUserInfo, loginWithGoogle, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const data = useContext(AuthContext);
  return data;
};
