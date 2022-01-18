import React, { useContext } from 'react';
import { AuthContext } from '~/src/context/AuthContextProvider';
import { Header } from '../molecules/Header';

export const Layout: React.FC = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <Header currentUser={currentUser} />
      {children}
    </div>
  );
};
