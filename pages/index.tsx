import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Form } from '../components/Form';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [image, setImage] = useState<{ preview: string }>();
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <div className='pl-96 py-10'>
        <div className='text3xl font-bold underline text-indigo-500'>
          Hello World!
        </div>
        <Form setImage={setImage} />
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
        {showImage && (
          <Image src={image!.preview} alt='iamge' width={100} height={100} />
        )}
      </div>
    </>
  );
};

export default Home;
