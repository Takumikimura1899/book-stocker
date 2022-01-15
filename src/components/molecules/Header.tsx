import React, { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '~/src/context/AuthContextProvider';
import { auth, logOut } from '~/src/lib/firebaseAuth';
import { HeaderIconAtom } from '../atoms/headerAtom/HeaderIconAtom';

export const Header = () => {
  const { currentUser } = useContext(AuthContext);

  const onClick = () => {
    logOut();
  };

  return (
    <>
      <header className='text-center my-10'>
        <button onClick={onClick}>ログアウト</button>
        {currentUser && (
          <HeaderIconAtom photoURL={currentUser.photoURL!.toString()} />
        )}
      </header>
    </>
  );
};
