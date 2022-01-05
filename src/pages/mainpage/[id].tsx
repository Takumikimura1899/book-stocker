import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  firebaseCollectionId,
  getFirebaseData,
  getStorageImage,
} from '~/src/lib/firebase';

interface Props {
  content: Content;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const mainPage: NextPage<Props> = ({ content }) => {
  const { image } = content;

  return (
    <>
      <div className='grid grid-cols-3 '>
        <div>
          <span>タイトル:</span>
          {content.title}
        </div>
        <div>
          <span>ジャンル:</span>
          {content.genre}
        </div>
        <div>
          <span>著者:</span>
          {content.author}
        </div>
        <div>
          <span>ページ数:</span>
          {content.page}
        </div>

        <div>
          <span>ステータス:</span>
          {content.status}
        </div>
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
