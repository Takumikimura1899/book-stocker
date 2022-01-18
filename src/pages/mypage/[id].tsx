import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MyPageContentAtom } from '~/src/components/atoms/myPageAtom/MyPageContentAtom';
import { MyPageContentImageAtom } from '~/src/components/atoms/myPageAtom/MyPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';
import { Navbar } from '~/src/components/molecules/Navbar';

import {
  firebaseCollectionId,
  firebaseCollectionIdWhereUser,
  getFirebaseData,
  getStorageImage,
} from '~/src/lib/firebase';

interface Result extends Content {
  id: string;
}

interface Props {
  results: Result[];
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const userPage: NextPage<Props> = ({ results }) => {
  console.log(results);

  return (
    <>
      <Layout>
        <Navbar />
        {results.map((result, index) => {
          const { image } = result;
          return (
            <div key={index} className='flex items-center justify-around py-8'>
              <MyPageContentImageAtom
                title={result.title}
                image={image}
                id={result.id}
              />
              <MyPageContentAtom>{result.genre}</MyPageContentAtom>
              <MyPageContentAtom>{result.author}</MyPageContentAtom>
              <MyPageContentAtom>{result.page}</MyPageContentAtom>
              <MyPageContentAtom>{result.status}</MyPageContentAtom>
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
  const ids = await firebaseCollectionIdWhereUser(params!.id);

  const contents = ids.map(async (id) => {
    const content = await getFirebaseData('bookInfo', id);
    if (content.image) {
      const image = await getStorageImage(content.title);
      return { ...content, image, id };
    }
    return { ...content, id };
  });

  const results = await Promise.all(contents);
  return {
    props: {
      results,
    },
  };
};

export default userPage;
