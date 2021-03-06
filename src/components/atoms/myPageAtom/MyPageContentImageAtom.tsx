import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  image?: string;
  title: string;
  id?: string;
  onClick: () => Promise<boolean>;
}

export const MyPageContentImageAtom: React.FC<Props> = ({
  image,
  title,
  id,
  onClick,
}) => {
  return (
    <div onClick={onClick} className='w-1/5 text-center'>
      <p>{title}</p>
      {image ? (
        <Image
          src={image!}
          //   layout={'fill'}
          //   objectFit={'contain'}
          alt='img'
          width={100}
          height={100}
        />
      ) : (
        <p className='h-20  text-center '>none</p>
      )}
    </div>
  );
};

// MyPageContentImageAtom.displayName = 'MyPageContentAtom';
