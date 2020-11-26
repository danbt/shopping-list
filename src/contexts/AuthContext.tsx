import React, { useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export interface IFBUser {
  loggedInUser: firebase.default.User;
  signUpFn: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>;
  loginFn: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>;
}

const AuthContext = React.createContext<IFBUser | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<firebase.default.User | null>(null);

  function signUp(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, []);

  const value: IFBUser = {
    loggedInUser: currentUser!,
    signUpFn: (email, password) => signUp(email, password),
    loginFn: (email, password) => login(email, password),
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
