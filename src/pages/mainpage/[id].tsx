import React from 'react';

const mainPage = ({ posts }: any) => {
  return (
    <ul>
      {posts.map((post: any, index: number) => (
        <li key={index}>{post.title}</li>
      ))}
    </ul>
  );
};

export async function getStaticPaths() {}

export default mainPage;
