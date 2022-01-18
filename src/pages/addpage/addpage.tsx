import type { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { Layout } from '~/src/components/layout/Layout';
import { Form } from '../../components/Form';

const AddPage: NextPage = () => {
  const [image, setImage] = useState<{ preview: string }>();
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      {/* 確認用スタイリング */}
      <div className=''>
        <Layout>
          <Form />
          {showImage && (
            <Image src={image!.preview} alt='image' width={100} height={100} />
          )}
        </Layout>
      </div>
    </>
  );
};

export default AddPage;
