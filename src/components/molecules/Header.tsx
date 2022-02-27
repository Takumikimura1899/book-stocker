import React, { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '~/src/context/AuthContextProvider';
import { auth, logOut } from '~/src/lib/firebaseAuth';
import { HeaderIconAtom } from '../atoms/headerAtom/HeaderIconAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';

type Props = {
  currentUser?: User | null;
};

export const Header: React.FC<Props> = ({ currentUser }) => {
  const router = useRouter();
  const onClick = () => {
    logOut();
  };

  const myPage = () => {
    router.push(`/users/${currentUser!.uid}/mypage`);
  };

  const addPage = () => {
    router.push(`/addpage/addpage`);
  };

  return (
    <>
      <header className='text-center my-10'>
        <button onClick={onClick}>ログアウト</button>
        <button onClick={myPage}>マイページ</button>
        <button onClick={addPage}>本を追加する</button>
        {currentUser && (
          <HeaderIconAtom photoURL={currentUser.photoURL!.toString()} />
        )}
      </header>
    </>
  );
};
