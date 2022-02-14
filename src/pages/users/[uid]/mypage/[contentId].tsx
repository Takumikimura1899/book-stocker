import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MouseEventHandler, useContext, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { MyPageContentAtom } from '~/src/components/atoms/myPageAtom/MyPageContentAtom';
import { MyPageContentImageAtom } from '~/src/components/atoms/myPageAtom/MyPageContentImageAtom';
import { Layout } from '~/src/components/layout/Layout';
import { Navbar } from '~/src/components/molecules/Navbar';
import { AuthContext } from '~/src/context/AuthContextProvider';

import {
  deleteFirebaseData,
  docRef,
  fetchBookInfo,
  fetchByUser,
  firebaseCollectionId,
  // firebaseCollectionIdContent,
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
  uid: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
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

const UserPage: NextPage<any> = ({ test }) => {
  // const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
  //   deleteFirebaseData(
  //     e.currentTarget.id,
  //     e.currentTarget.title,
  //     e.currentTarget.dataset.uid!,
  //   );
  // };
  // const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  // console.log(uid);

  // const initialData = results;

  // const {
  //   data: result,
  //   error,
  //   mutate,
  // } = useSWR(uid, fetchByUser, {
  //   fallbackData: results,
  // });

  // useEffect(() => {
  //   mutate();
  // }, [mutate]);

  // if (error) return <div>An error has occurred.</div>;
  // if (!result) return <div>Loading...</div>;
  return (
    <>
      <Layout>
        <Navbar />
        <div>{test}</div>
        {/* <button
          onClick={async () => {
            await mutate(docRef);
            console.log('完了');
          }}
        >
          更新
        </button> */}
        {/* <h1></h1> */}
        {/* {result.map((result, index) => {
          const { image } = result;
          return (
            <div
              key={index}
              className='flex justify-center md:justify-around items-center  py-8'
            >
              <MyPageContentImageAtom
                title={result.title}
                image={image}
                // id={result.id!}
              />
              <div className='hidden md:flex w-4/5 justify-around'>
                <MyPageContentAtom>{result.genre}</MyPageContentAtom>
                <MyPageContentAtom>{result.author}</MyPageContentAtom>
                <MyPageContentAtom>{result.page}</MyPageContentAtom>
                <MyPageContentAtom>{result.status}</MyPageContentAtom>
              </div>
              <button
                onClick={handleDelete}
                // id={result.id}
                data-uid={result.created_by}
                title={result.title}
              >
                event削除
              </button>
            </div>
          );
        })} */}
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<any> = async () => {
  // const uids = await firebaseCollectionIdContent('user');

  //   const paths = uids.map((uid) => (

  //     {
  //     params: { uid },
  //   }));
  interface User {
    params: {
      uid: string;
      contentId: string[];
    };
  }
  [];

  const posts = [
    { uid: 'aaaa', contentIds: ['aaaaa', 'bbbb', 'cccc'] },
    { uid: 'bbbb', contentIds: ['aaaaa', 'bbbb', 'cccc'] },
    { uid: 'ccccc', contentIds: ['aaaaa', 'bbbb', 'cccc'] },
  ];

  const paths = posts.map((post) => {
    {
      uid: post.uid;
    }
  });

  return {
    paths: posts.map((post) => {
      return {
        params: {
          uid: post.uid,
          contentId: 'ccccc',
        },
      };
    }),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  // const uid = params!.id;
  // const filteredContents = await firebaseCollectionIdWhereUser(uid);

  // const contents = filteredContents.map(async (id) => {
  //   const content = await getFirebaseData('bookInfo', id);
  //   const image = content.image
  //     ? await getStorageImage(uid, content.title)
  //     : await getStorageImage(uid, 'none');
  //   return { ...content, image, id, uid };
  // });

  // const results = await Promise.all(contents);
  return {
    props: {
      // results,
      // uid,
      test: 'テスト',
    },
    // revalidate: 3,
  };
};

export default UserPage;
