import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { MainPageContentAtom } from '~/src/components/atoms/mainPageAtom/MainPageContentAtom';
import { MainPageContentImageAtom } from '~/src/components/atoms/mainPageAtom/MainPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';
import { Summary } from '~/src/components/organisms/Summary';
import {
  contentFetcher,
  getAllDocIds,
  getContent,
  staticGenerateContentIds,
} from '~/src/lib/firebase';

interface Props {
  content: Content;
  params?: Params;
}

interface Params extends ParsedUrlQuery {
  uid: string;
  contentId: string;
}

const UserPage: NextPage<Props> = ({ params }) => {
  // const [data, setData] = useState(content);

  const {
    data: content,
    error,
    mutate,
  } = useSWR(
    `user/${params!.uid}/bookInfo/${params!.contentId}`,
    contentFetcher,
    {
      // fallbackData: posts,
      // refreshInterval: 1000,
    }
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (error) return <div>error</div>;
  if (!content) return <div>Loading...</div>;

  const { image, title, genre, author, page, status, summary } = content;

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
            className='w-32 md:w-48 mx-auto md:row-span-2 md:row-start-2'
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
            <Summary summary={summary!} params={params} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const uIds = await getAllDocIds('user');

  const posts = staticGenerateContentIds(uIds);
  const newPost = posts.map((post) => {
    return {
      params: post,
    };
  });
  return {
    paths: newPost,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const content = await getContent(
    `user/${params!.uid}/bookInfo/${params!.contentId}`
  );
  return {
    props: {
      content,
      params,
    },
    revalidate: 3,
  };
};

export default UserPage;
