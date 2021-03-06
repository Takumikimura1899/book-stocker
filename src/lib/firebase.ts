import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
  addDoc,
  initializeFirestore,
  DocumentData,
  query,
  where,
  deleteDoc,
  CollectionReference,
  updateDoc,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';
import { ParsedUrlQuery } from 'querystring';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreApp = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

function sleep(msec: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, msec);
  });
}

export const fetcher: (url: string) => Promise<Content[]> = async (url) => {
  const filteredContents = await getAllDocIds(url);
  const uId = url.split('/')[1];

  const contents = filteredContents.map(async (id) => {
    const params = `${url}/${id}`;
    const content = await getFirebaseContent(params);
    const image = content.image
      ? await getStorageImage(uId, content.image)
      : await getStorageImage(uId);
    return { ...content, image, id, url };
  });

  const results = await Promise.all(contents);
  return results;
};

export const contentFetcher: (params: string) => Promise<Content> = async (
  params
) => {
  const firebaseContent = await getContent(params);
  return firebaseContent;
};

export const getFirebaseContent: (params: string) => Promise<Content> = async (
  params
) => {
  const docRef = doc(db, params);
  const docSnap = await getDoc(docRef);

  // as???????????????????????????withConverter????????????????????????
  const data = docSnap.data() as Content;
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    console.log('No such document!');
  }
  return data;
};

export const addFirebaseData: (
  content: FormContents,
  uid?: string
) => Promise<void> = async (content, uid?) => {
  const userRef = collection(db, 'user', uid!, 'bookInfo');
  if (content.image) {
    const imageUrl = encodeURIComponent(content.title);
    const data = { ...content, image: imageUrl };
    const storageRef = ref(storage, `images/${uid}/${imageUrl}/file.jpg`);
    uploadBytes(storageRef, content.image!).then((snapshot) => {
      console.log('Upload a blob or file!');
    });

    await addDoc(userRef, data);
  } else {
    await addDoc(userRef, content);
  }
};

export const getStorageImage: (
  uid: string,
  image?: string
) => Promise<string> = async (uid, image = 'none') => {
  let storageRef: StorageReference;
  const encodedTitle = encodeURIComponent(image);

  image === 'none'
    ? (storageRef = ref(storage, `images/none/file.jpg`))
    : (storageRef = ref(storage, `images/${uid}/${image}/file.jpg`));
  return await getDownloadURL(ref(storageRef)).catch(() => 'none');
};

export const deleteFirebaseData: (
  id: string,
  title: string,
  uid: string
) => Promise<void> = async (id, title, uid) => {
  const encodedTitle = encodeURIComponent(title);
  const docRef = doc(db, 'user', uid, 'bookInfo', id);
  const docSnap = await getDoc(docRef);

  await deleteDoc(docRef);
  docSnap.data()!.image &&
    (await deleteObject(
      ref(storage, `images/${uid}/${encodedTitle}/file.jpg`)
    ));
};

export const staticGenerateContentIds: (
  docRefs: string[]
) => { uid: string; contentId: string }[] = (docRefs) => {
  const array: { uid: string; contentId: string }[] = [];
  docRefs.map(async (docRef) => {
    const allContentDocIds = await getAllDocIds(docRef);
    allContentDocIds.forEach((contentId) => {
      array.push({
        uid: docRef,
        contentId,
      });
    });
  });
  return array;
};

export const getContent: (url: string) => Promise<Content> = async (url) => {
  const docRef = doc(db, url);
  const docSnap = await getDoc(docRef);
  const uId = url.split('/')[1];
  const id = url.split('/')[3];

  // as???????????????????????????withConverter????????????????????????
  const data = docSnap.data() as Content;
  const imageUrl = await getStorageImage(uId, data.image);
  const newData = { ...data, image: imageUrl, id };
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    console.log('No such document!');
  }
  return newData;
};

export const getAllDocIds: (
  collectionName: string
) => Promise<string[]> = async (collectionName) => {
  const posts: string[] = [];
  const ref = collection(db, collectionName);

  const querySnapshot = await getDocs(ref);
  querySnapshot.forEach((doc) => {
    posts.push(doc.id);
  });
  return posts;
};

export const updateSummary: (
  params: ParsedUrlQuery,
  summaryData: ContentSummary
) => void = async (params, summaryData) => {
  const url = String(params);
  const ref = doc(db, `user/${params!.uid}/bookInfo/${params!.contentId}`);

  await updateDoc(ref, {
    summary: summaryData,
  });
};
