import React from 'react';
import { Header } from '../molecules/Header';

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
