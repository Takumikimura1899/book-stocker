import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { MainPageContentAtom } from '~/src/components/atoms/mainPageAtom/MainPageContentAtom';
import { MainPageContentImageAtom } from '~/src/components/atoms/mainPageAtom/MainPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';
import {
  getAllDocIds,
  getContent,
  staticGenerateContentIds,
} from '~/src/lib/firebase';

interface Props {
  content: Content;
}

interface Params extends ParsedUrlQuery {
  uid: string;
  contentId: string;
}

const UserPage: NextPage<Props> = ({ content }) => {
  const [data, setData] = useState(content);
  const [summaryItem, setSummaryItem] = useState<string>('');
  const { image, title, genre, author, page, status, summary } = data;

  const onChangeText = (e: any) => {
    const testTitle = e.target.value;
    setSummaryItem(testTitle);
  };

  const handleClick = () => {
    console.log(summary, summaryItem);

    const newSummary: string[] = [...summary!, summaryItem];
    setData({ ...data, summary: newSummary });
  };

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
            <div>
              <p>add summary</p>
              <input
                className='text-white border-2 '
                type='text'
                onChange={onChangeText}
                value={summaryItem}
              />
              <button onClick={handleClick}>追加</button>
            </div>
            <div>
              <p>要約:</p>
              <div className='bg-indigo-500 p-10 w-full'>
                {summary?.map((item, index) => {
                  return <Test item={item} index={index} key={index} />;
                })}
              </div>
            </div>
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
    },
    // revalidate: 3,
  };
};

const Test = ({ index, item }: any) => {
  const [test, setTest] = useState<string>('');
  const handleChange = (e: any) => setTest(e.target.value);
  return (
    <div className='border-2 w-1/4 rounded-md my-4 bg-teal-300 pl-4'>
      <p key={index}>{item}</p>
      <textarea name='' id='' value={test} onChange={handleChange} />
    </div>
  );
};

export default UserPage;
