import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";

export interface IFBUser {
  loggedInUser: firebase.default.User;
  signUpFn: (email: string, password: string) => Promise<unknown>;
  loginFn: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>;
  logoutFn: () => void;
}

const AuthContext = React.createContext<IFBUser | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<firebase.default.User | null>(null);

  function signUp(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      // return usersRef.("users").doc(cred.user?.uid).set({ test: cred.user?.uid });
      return db.ref(`users/` + cred.user?.uid).set({ id: cred.user?.uid });
    });
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setCurrentUser(null);
    return auth.signOut();
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
    logoutFn: () => logout(),
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
