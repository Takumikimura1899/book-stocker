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
  return (
    <>
      <Image src={content.image!} alt='img' width={300} height={300} />
      <div>{content.page}</div>
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
