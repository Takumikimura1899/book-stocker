import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Params } from 'next/dist/server/router';

import {
  firebaseCollectionId,
  getFirebaseData,
  getStorageImage,
} from '~/src/lib/firebase';

interface Result extends Content {
  id: string;
}

interface Props {
  results: Result[];
}

import React from 'react';
import Link from 'next/link';
import { Navbar } from '~/src/components/molecules/Navbar';
import { MyPageContentAtom } from '~/src/components/atoms/MyPageContentAtom';

const MyPage: NextPage<Props> = ({ results }) => {
  console.log(results);

  return (
    <>
      <Navbar />
      {results.map((result, index) => {
        const { image } = result;
        return (
          <div key={index} className='flex items-center justify-around py-8'>
            <Link href={`http://localhost:3000/mainpage/${result.id}`} passHref>
              <MyPageContentAtom>
                <p>{result.title}</p>
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
              </MyPageContentAtom>
            </Link>
            <MyPageContentAtom>{result.genre}</MyPageContentAtom>
            <MyPageContentAtom>{result.author}</MyPageContentAtom>
            <MyPageContentAtom>{result.page}</MyPageContentAtom>
            <MyPageContentAtom>{result.status}</MyPageContentAtom>
          </div>
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const ids = await firebaseCollectionId();
  const contents = ids.map(async (id) => {
    const content = await getFirebaseData('bookInfo', id);
    if (content.image) {
      const image = await getStorageImage(content.title);
      return { ...content, image, id };
    }
    return { ...content, id };
  });

  const results = await Promise.all(contents);
  return {
    props: {
      results,
    },
  };
};

export default MyPage;
