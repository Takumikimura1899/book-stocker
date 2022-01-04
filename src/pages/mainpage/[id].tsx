import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firebaseCollectionId, getFirebaseData } from '~/src/lib/firebase';

interface Props {
  content: Content;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const mainPage: NextPage<Props> = ({ content }) => {
  return (
    // <ul>
    //   {posts.map((post: any, index: number) => (
    //     <li key={index}>{post.title}</li>
    //   ))}
    // </ul>
    <div>{content.page}</div>
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
  const content = await getFirebaseData('bookInfo', params!.id);
  return {
    props: {
      content,
    },
  };
};
export default mainPage;
