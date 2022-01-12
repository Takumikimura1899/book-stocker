import { onAuthStateChanged, User } from '@firebase/auth';
import Router, { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebaseAuth';

type AuthContextProps = {
  currentUser?: User | null;
};

export const AuthContext = createContext<AuthContextProps>({});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        Router.push('/login/login');
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
