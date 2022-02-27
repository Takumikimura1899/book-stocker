import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
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

function sleep(msec: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, msec);
  });
}

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    await sleep(5000);
    return res.json();
  });

const UserPage: NextPage<Props> = ({ content }) => {
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
  const content = await getContent(params!.uid, params!.contentId);
  return {
    props: {
      content,
    },
    // revalidate: 3,
  };
};

export default UserPage;
