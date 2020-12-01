import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

interface IAppState {
  getSelectedList: () => string;
  setSelectedList: (newList: string) => void;
}

export const AppStateContext = createContext<IAppState | null>(null);

export function useAppState() {
  return useContext(AppStateContext);
}

const AppStateContextProvider = ({ children }: any) => {
  const [selectedListState, setSelectedListState] = useState("");

  function getSelectedList() {
    return selectedListState;
  }

  function setSelectedList(newList: string) {
    setSelectedListState(newList);
  }

  const appState: IAppState = {
    getSelectedList: () => getSelectedList(),
    setSelectedList: (newList) => setSelectedList(newList),
  };

  return <AppStateContext.Provider value={appState}>{children}</AppStateContext.Provider>;
};

export default AppStateContextProvider;
