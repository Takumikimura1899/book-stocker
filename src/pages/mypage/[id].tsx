import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MouseEventHandler } from 'react';
import { MyPageContentAtom } from '~/src/components/atoms/myPageAtom/MyPageContentAtom';
import { MyPageContentImageAtom } from '~/src/components/atoms/myPageAtom/MyPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';
import { Navbar } from '~/src/components/molecules/Navbar';

import {
  deleteFirebaseData,
  firebaseCollectionId,
  firebaseCollectionIdWhereUser,
  getFirebaseData,
  getStorageImage,
} from '~/src/lib/firebase';

interface Result extends Content {
  id: string;
  uid: string;
}

interface Props {
  results: Result[];
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const userPage: NextPage<Props> = ({ results }) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    deleteFirebaseData(
      e.currentTarget.id,
      e.currentTarget.title,
      e.currentTarget.dataset.uid!,
    );
  };
  return (
    <>
      <Layout>
        <Navbar />
        {results.map((result, index) => {
          const { image } = result;
          return (
            <div
              key={index}
              className='flex justify-center md:justify-around items-center  py-8'
            >
              <MyPageContentImageAtom
                title={result.title}
                image={image}
                id={result.id}
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
  const ids = await firebaseCollectionId('user');

  const paths = ids.map((id) => ({
    params: { id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const uid = params!.id;
  const filteredContents = await firebaseCollectionIdWhereUser(uid);

  const contents = filteredContents.map(async (id) => {
    const content = await getFirebaseData('bookInfo', id);
    const image = content.image
      ? await getStorageImage(uid, content.title)
      : await getStorageImage(uid, 'none');
    return { ...content, image, id, uid };
  });

  const results = await Promise.all(contents);
  return {
    props: {
      results,
    },
    revalidate: 3,
  };
};

export default userPage;
