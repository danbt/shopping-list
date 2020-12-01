import React, { createContext, useContext, useState } from "react";

interface IAppState {
  getSelectedList: () => string;
  setSelectedList: (newList: string) => void;
  getAvatarSrc: () => string;
  setAvatarSrc: (newSrcSeed: string) => void;
}

export const AppStateContext = createContext<IAppState | null>(null);

export function useAppState() {
  return useContext(AppStateContext);
}

const AppStateContextProvider = ({ children }: any) => {
  const [selectedListState, setSelectedListState] = useState("");
  const [avatarSrcState, setAvatarSrcState] = useState(
    `https://avatars.dicebear.com/api/avataaars/:${Math.random() * (10000 - 1) + 1}.svg`
  );

  function getSelectedList() {
    return selectedListState;
  }

  function setSelectedList(newList: string) {
    setSelectedListState(newList);
  }

  function getAvatarSrc() {
    return avatarSrcState;
  }

  function setAvatarSrc(newSrcSeed: string) {
    setAvatarSrcState(newSrcSeed);
  }

  const appState: IAppState = {
    getSelectedList: () => getSelectedList(),
    setSelectedList: (newList) => setSelectedList(newList),
    getAvatarSrc: () => getAvatarSrc(),
    setAvatarSrc: (newSrcSeed) => setAvatarSrc(newSrcSeed),
  };

  return <AppStateContext.Provider value={appState}>{children}</AppStateContext.Provider>;
};

export default AppStateContextProvider;
