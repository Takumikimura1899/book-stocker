import React from 'react';
import { logOut } from '~/src/lib/firebaseAuth';

export const Header = () => {
  const onClick = () => {
    logOut();
  };
  return (
    <>
      <header className='text-center my-10'>
        <button onClick={onClick}>ログアウト</button>
      </header>
    </>
  );
};
