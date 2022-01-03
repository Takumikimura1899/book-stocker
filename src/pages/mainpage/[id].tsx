import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firebaseCollectionId, getFirebaseData } from '~/src/lib/firebase';

const mainPage = ({ posts }: any) => {
  return (
    // <ul>
    //   {posts.map((post: any, index: number) => (
    //     <li key={index}>{post.title}</li>
    //   ))}
    // </ul>
    <div>{posts.title}</div>
  );
};

export async function getStaticPaths() {
  const posts = await firebaseCollectionId();

  const paths = posts.map((post) => ({
    params: { id: post },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const posts = await getFirebaseData('bookInfo', params.id);
  return {
    props: {
      posts,
    },
  };
}
export default mainPage;
