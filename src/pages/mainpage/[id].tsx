import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import {
  firebaseCollectionId,
  getFirebaseData,
  getStorageImage,
} from '~/src/lib/firebase';
import { MainPageContentAtom } from '~/src/components/atoms/mainPageAtom/MainPageContentAtom';
import { MainPageContentImageAtom } from '~/src/components/atoms/mainPageAtom/MainPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';

interface Props {
  content: Content;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const mainPage: NextPage<Props> = ({ content }) => {
  const { image, title, genre, author, page, status } = content;
  return (
    <>
      <Layout>
        <div className='flex flex-col justify-center md:grid md:grid-cols-3 md:grid-rows-5 h-screen font-bold text-xl '>
          <MainPageContentAtom
            title='タイトル:'
            value={title}
            className='md:col-span-3 md:text-5xl'
          />
          <MainPageContentImageAtom
            image={image}
            className='w-32 mx-auto md:row-span-2 md:row-start-2'
          />
          <MainPageContentAtom
            title='ジャンル:'
            value={genre}
            className='row-start-2 text-center my-auto'
          />
          <MainPageContentAtom
            title='著者:'
            value={author}
            className='row-start-2'
          />
          <MainPageContentAtom
            title='ページ数:'
            value={page}
            className='row-start-3'
          />
          <MainPageContentAtom
            title='ステータス:'
            value={status}
            className='row-start-3'
          />

          <div className='col-span-3'>
            <div>
              <p>要約:</p>
              <textarea
                className='bg-indigo-500 w-full'
                name='要約'
                id=''
                cols={30}
                rows={10}
              ></textarea>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const ids = await firebaseCollectionId('bookInfo');

  const paths = ids.map((id) => ({
    params: { id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const contents = await getFirebaseData('bookInfo', params!.id);
  const title = contents.title;
  const image = await getStorageImage(title);
  const content = { ...contents, image };
  return {
    props: {
      content,
    },
  };
};
export default mainPage;
