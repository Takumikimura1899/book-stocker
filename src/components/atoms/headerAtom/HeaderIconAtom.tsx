import React from 'react';
import Image from 'next/image';

type Props = {
  photoURL: string;
};

export const HeaderIconAtom: React.FC<Props> = ({ photoURL }) => {
  return (
    <>
      <Image
        src={photoURL}
        className='rounded-full'
        alt='image'
        width={20}
        height={20}
      />
    </>
  );
};
