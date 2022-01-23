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
import { Navbar } from '~/src/components/molecules/Navbar';
import { MyPageContentAtom } from '~/src/components/atoms/myPageAtom/MyPageContentAtom';
import { MyPageContentImageAtom } from '~/src/components/atoms/myPageAtom/MyPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';
import { getStorage } from 'firebase/storage';

const MyPage: NextPage<Props> = ({ results }) => {
  console.log(results);

  return (
    <>
      <Layout>
        <Navbar />
        {results.map((result, index) => {
          const { image } = result;
          return (
            <div key={index} className='flex items-center justify-around py-8'>
              <MyPageContentImageAtom
                title={result.title}
                image={image}
                id={result.id}
              />
              <MyPageContentAtom>{result.genre}</MyPageContentAtom>
              <MyPageContentAtom>{result.author}</MyPageContentAtom>
              <MyPageContentAtom>{result.page}</MyPageContentAtom>
              <MyPageContentAtom>{result.status}</MyPageContentAtom>
            </div>
          );
        })}
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const ids = await firebaseCollectionId('bookInfo');
  const contents = ids.map(async (id) => {
    const content = await getFirebaseData('bookInfo', id);

    const image = content.image
      ? await getStorageImage('WAzfBUCft58yWkwUoqNz', content.title)
      : await getStorageImage('WAzfBUCft58yWkwUoqNz', 'none');
    return { ...content, image, id };
  });

  const results = await Promise.all(contents);
  return {
    props: {
      results,
    },
  };
};

export default MyPage;
