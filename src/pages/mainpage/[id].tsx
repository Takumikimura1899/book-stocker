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
      <div className='grid grid-cols-3 '>
        <MainPageContentAtom title='タイトル:' value={title} />
        <MainPageContentAtom title='ジャンル:' value={genre} />
        <MainPageContentAtom title='著者:' value={author} />
        <MainPageContentAtom title='ページ数:' value={page} />
        <MainPageContentAtom title='ステータス:' value={status} />
        <div></div>

        <div className=' px-2 pt-2'>
          {image !== 'none' ? (
            <Image
              src={content.image!}
              //   layout={'fill'}
              //   objectFit={'contain'}
              alt='img'
              width={500}
              height={500}
            />
          ) : (
            <p>none</p>
          )}
        </div>
        <div className='col-span-2'>
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
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const ids = await firebaseCollectionId();

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
