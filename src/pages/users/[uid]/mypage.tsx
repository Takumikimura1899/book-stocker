// import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// import { ParsedUrlQuery } from 'querystring';
// import { MouseEventHandler, useContext, useEffect } from 'react';
// import useSWR, { useSWRConfig } from 'swr';
// import { MyPageContentAtom } from '~/src/components/atoms/myPageAtom/MyPageContentAtom';
// import { MyPageContentImageAtom } from '~/src/components/atoms/myPageAtom/MyPageContentImageAtom';
// import { Layout } from '~/src/components/layout/Layout';
// import { Navbar } from '~/src/components/molecules/Navbar';
// import { AuthContext } from '~/src/context/AuthContextProvider';

// import {
//   deleteFirebaseData,
//   docRef,
//   fetchBookInfo,
//   fetchByUser,
//   firebaseCollectionId,
//   firebaseCollectionIdWhereUser,
//   getAllDocIds,
//   getFirebaseData,
//   getStorageImage,
// } from '~/src/lib/firebase';

// interface Result extends Content {
//   id: string;
//   uid: string;
// }

// interface Props {
//   results: Result[];
//   uid: string;
// }

// interface Params extends ParsedUrlQuery {
//   uid: string;
// }

// function sleep(msec: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, msec);
//   });
// }

// const fetcher = (url: string) =>
//   fetch(url).then(async (res) => {
//     await sleep(5000);
//     return res.json();
//   });

// const UserPage: NextPage<Props> = ({ results, uid }) => {
//   const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
//     deleteFirebaseData(
//       e.currentTarget.id,
//       e.currentTarget.title,
//       e.currentTarget.dataset.uid!,
//     );
//   };
//   const { currentUser } = useContext(AuthContext);
//   console.log(currentUser);
//   console.log(uid);

//   const initialData = results;

//   // const {
//   //   data: result,
//   //   error,
//   //   mutate,
//   // } = useSWR(uid, fetchByUser, {
//   //   fallbackData: results,
//   // });

//   // useEffect(() => {
//   //   mutate();
//   // }, [mutate]);

//   // if (error) return <div>An error has occurred.</div>;
//   // if (!result) return <div>Loading...</div>;
//   return (
//     <>
//       <Layout>
//         <Navbar />
//         {/* <button
//           onClick={async () => {
//             await mutate(docRef);
//             console.log('完了');
//           }}
//         >
//           更新
//         </button> */}
//         {/* <h1></h1> */}
//         {results.map((result, index) => {
//           const { image } = result;
//           return (
//             <div
//               key={index}
//               className='flex justify-center md:justify-around items-center  py-8'
//             >
//               <MyPageContentImageAtom
//                 title={result.title}
//                 image={image}
//                 // id={result.id!}
//               />
//               <div className='hidden md:flex w-4/5 justify-around'>
//                 <MyPageContentAtom>{result.genre}</MyPageContentAtom>
//                 <MyPageContentAtom>{result.author}</MyPageContentAtom>
//                 <MyPageContentAtom>{result.page}</MyPageContentAtom>
//                 <MyPageContentAtom>{result.status}</MyPageContentAtom>
//               </div>
//               <button
//                 onClick={handleDelete}
//                 // id={result.id}
//                 data-uid={result.created_by}
//                 title={result.title}
//               >
//                 event削除
//               </button>
//             </div>
//           );
//         })}
//       </Layout>
//     </>
//   );
// };

// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const ids = getAllDocIds('user');

//   const paths = ids.map((uid) => ({
//     params: { uid },
//   }));

//   return { paths, fallback: 'blocking' };
// };

// export const getStaticProps: GetStaticProps<Props, Params> = async ({
//   params,
// }) => {
//   const uid = params!.uid;
//   const filteredContents = getAllDocIds(uid);

//   const contents = filteredContents.map(async (id) => {
//     const content = await getFirebaseData('bookInfo', id);
//     const image = content.image
//       ? await getStorageImage(uid, content.title)
//       : await getStorageImage(uid, 'none');
//     return { ...content, image, id, uid };
//   });

//   const results = await Promise.all(contents);
//   return {
//     props: {
//       results,
//       uid,
//     },
//     revalidate: 3,
//   };
// };

// export default UserPage;

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
  fetchBookInfo,
  fetchByUser,
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

const UserPage: NextPage<Props> = ({ results, uid, filteredContents }) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    deleteFirebaseData(
      e.currentTarget.id,
      e.currentTarget.title,
      e.currentTarget.dataset.uid!,
    );
  };
  const router = useRouter();

  const onClick = useCallback(
    async (contentId: string) =>
      await router.push(`/users/${uid}/mypage/${contentId}`),
    [router, uid],
  );
  const { currentUser } = useContext(AuthContext);

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
        {/* <button
          onClick={async () => {
            await mutate(docRef);
            console.log('完了');
          }}
        >
          更新
        </button> */}
        {/* <h1></h1> */}
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
                // id={result.id!}
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
                // id={result.id}
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
  // const filteredContents = await getAllDocIdsUser(`user/${uid}/bookInfo`);

  const contents = filteredContents.map(
    async (id) => await getContent(uid, id),
  );
  const results = await Promise.all(contents);
  return {
    props: {
      results,
      uid,
      filteredContents,
    },
    // revalidate: 3,
  };
};

export default UserPage;
