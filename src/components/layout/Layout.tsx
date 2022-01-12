import { useRouter } from 'next/router';
import React from 'react';
import { logOut } from '~/src/lib/firebaseAuth';

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const onClick = () => {
    logOut();
  };
  return (
    <div>
      <header className='text-center my-10'>
        <button onClick={onClick}>ログアウト</button>
      </header>
      {children}
    </div>
  );
};
