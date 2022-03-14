import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { MyPageContentAtom } from '~/src/components/atoms/myPageAtom/MyPageContentAtom';
import { MyPageContentImageAtom } from '~/src/components/atoms/myPageAtom/MyPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';
import { Navbar } from '~/src/components/molecules/Navbar';

import { deleteFirebaseData, fetcher, getAllDocIds } from '~/src/lib/firebase';

interface Props {
  posts: Content[];
  uid: string;
}

interface Params extends ParsedUrlQuery {
  uid: string;
}

const UserPage: NextPage<Props> = ({ posts, uid }) => {
  const handleDelete: (id: string, uid: string, title: string) => void = (
    id,
    uid,
    title
  ) => {
    deleteFirebaseData(id, title, uid);
  };

  const router = useRouter();

  const onClick = useCallback(
    async (contentId: string) =>
      await router.push(`/users/${uid}/mypage/${contentId}`),
    [router, uid]
  );

  const {
    data: results,
    error,
    mutate,
  } = useSWR(`user/${uid}/bookInfo`, fetcher, {
    // fallbackData: posts,
    refreshInterval: 1000,
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (error) return <div>error</div>;
  if (!results) return <div>Loading...</div>;
  return (
    <>
      <Layout>
        <p>{`現在保存されているコンテンツは${results.length}個です`}</p>
        <Navbar />
        {results.map((result, index) => {
          const { image } = result;
          console.log(image);
          console.log(result.id);

          return (
            <div
              key={index}
              className='flex justify-center md:justify-around items-center  py-8'
            >
              <MyPageContentImageAtom
                title={result.title}
                image={image}
                id={result.id!}
                onClick={() => onClick(result.id!)}
              />
              <div className='hidden md:flex w-4/5 justify-around'>
                <MyPageContentAtom>{result.genre}</MyPageContentAtom>
                <MyPageContentAtom>{result.author}</MyPageContentAtom>
                <MyPageContentAtom>{result.page}</MyPageContentAtom>
                <MyPageContentAtom>{result.status}</MyPageContentAtom>
              </div>
              <button
                onClick={() =>
                  handleDelete(result.id!, result.created_by!, result.title!)
                }
                // id={result.id}
                // data-uid={result.created_by}
                // title={result.title}
              >
                <p className='w-14 px-2 mx-2 border-2 rounded-md bg-red-500'>
                  削除
                </p>
              </button>
            </div>
          );
        })}
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const ids = await getAllDocIds('user');

  const paths = ids.map((uid) => ({
    params: { uid },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const uid = params!.uid;
  const posts = await fetcher(`user/${uid}/bookInfo`);
  return {
    props: {
      posts,
      uid,
    },
    revalidate: 3,
  };
};

export default UserPage;
