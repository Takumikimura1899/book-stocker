import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Form } from '../components/Form';
import { Layout } from '../components/layout/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Link href={'/mypage/myPage'}>myPage</Link>
        <Link href={'/addpage/addpage'}>addPage</Link>
      </Layout>
    </>
  );
  // const [image, setImage] = useState<{ preview: string }>();
  // const [showImage, setShowImage] = useState(false);

  // return (
  //   <>
  //     {/* 確認用スタイリング */}
  //     <div className=''>
  //       <div className='text3xl font-bold underline text-indigo-500'>
  //         Hello World!
  //       </div>
  //       <Form setImage={setImage} />
  //       <button
  //         onClick={() => {
  //           const info = localStorage.getItem('info');
  //           console.log(info);
  //           console.log(image?.preview);
  //           setShowImage(!showImage);
  //         }}
  //       >
  //         ゲット
  //       </button>
  //       <Link href='/contents/contents'>firebaseContents</Link>
  //       {showImage && (
  //         <Image src={image!.preview} alt='iamge' width={100} height={100} />
  //       )}
  //     </div>
  //   </>
  // );
};

export default Home;
