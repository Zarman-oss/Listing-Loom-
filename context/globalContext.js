'use client';

import { useContext, createContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [unread, setUnread] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unread,
        setUnread,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
