import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Form } from '../../components/Form';

const AddPage: NextPage = () => {
  const [image, setImage] = useState<{ preview: string }>();
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      {/* 確認用スタイリング */}
      <div className=''>
        <div className='text3xl font-bold underline text-indigo-500'>
          Hello World!
        </div>
        <Form />
        <button
          onClick={() => {
            const info = localStorage.getItem('info');
            console.log(info);
            console.log(image?.preview);
            setShowImage(!showImage);
          }}
        >
          ゲット
        </button>
        <Link href='/contents/contents'>firebaseContents</Link>
        {showImage && (
          <Image src={image!.preview} alt='image' width={100} height={100} />
        )}
      </div>
    </>
  );
};

export default AddPage;
