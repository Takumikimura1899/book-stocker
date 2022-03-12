import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { MouseEventHandler, useCallback, useContext, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { MyPageContentAtom } from '~/src/components/atoms/myPageAtom/MyPageContentAtom';
import { MyPageContentImageAtom } from '~/src/components/atoms/myPageAtom/MyPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';
import { Navbar } from '~/src/components/molecules/Navbar';
import { AuthContext } from '~/src/context/AuthContextProvider';

import {
  deleteFirebaseData,
  docRef,
  fetcher,
  firebaseCollectionId,
  firebaseCollectionIdWhereUser,
  getAllDocIds,
  getContent,
  getFirebaseData,
  getStorageImage,
} from '~/src/lib/firebase';

interface Result extends Content {
  id: string;
  uid: string;
}

interface Props {
  results: Content[];
  uid: string;
  filteredContents: string[];
}

interface Params extends ParsedUrlQuery {
  uid: string;
}

const UserPage: NextPage<Props> = ({ results, uid, filteredContents }) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    deleteFirebaseData(
      e.currentTarget.id,
      e.currentTarget.title,
      e.currentTarget.dataset.uid!
    );
  };
  const router = useRouter();

  const onClick = useCallback(
    async (contentId: string) =>
      await router.push(`/users/${uid}/mypage/${contentId}`),
    [router, uid]
  );

  const {
    data: result,
    error,
    mutate,
  } = useSWR(`user/${uid}/bookInfo`, fetcher, {
    // fallbackData: results,
    refreshInterval: 1000,
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (error) return <div>現在コンテンツの削除を実行しています・・・</div>;
  if (!result) return <div>Loading...</div>;
  return (
    <>
      <Layout>
        <Navbar />
        <p>{result.length}</p>
        {result.map((result, index) => {
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
                onClick={handleDelete}
                id={result.id}
                data-uid={result.created_by}
                title={result.title}
              >
                event削除
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
  const filteredContents = await getAllDocIds(`user/${uid}/bookInfo`);

  const contents = filteredContents.map(
    async (id) => await getContent(uid, id)
  );
  const results = await Promise.all(contents);
  return {
    props: {
      results,
      uid,
      filteredContents,
    },
    revalidate: 3,
  };
};

export default UserPage;
