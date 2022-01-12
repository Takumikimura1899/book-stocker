import { onAuthStateChanged, User } from '@firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebaseAuth';

type AuthContextProps = {
  currentUser?: User | null;
};

const AuthContext = createContext<AuthContextProps>({});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();

  useEffect(() => {
    const unSub = () =>
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
    return () => {
      unSub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
