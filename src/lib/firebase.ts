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
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';

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

export const docRef = collection(db, 'bookInfo');

export const fetchBookInfo: (id: string) => Promise<Content[]> = async (
  url: string,
) => {
  const docRef = collection(db, url);
  const docSnap = (await getDocs(docRef)) as unknown;
  console.log(docSnap);

  const data = docSnap as Content[];

  // if (docSnap.exists()) {
  //   console.log('Document data:', docSnap.data());
  // } else {
  //   console.log('No such document!');
  // }
  return data;
};

export const fetchByUser: (id: string) => Promise<Content[]> = async (id) => {
  const uid = id;
  const filteredContents = await firebaseCollectionIdWhereUser(uid);

  const contents = filteredContents.map(async (id) => {
    const content = await getFirebaseData('bookInfo', id);
    const image = content.image
      ? await getStorageImage(uid, content.title)
      : await getStorageImage(uid, 'none');
    return { ...content, image, id, uid };
  });

  const results = await Promise.all(contents);
  return results;
};

export const getFirebaseData = async (path: string, id: string) => {
  const docRef = doc(db, path, id);
  const docSnap = await getDoc(docRef);

  // asを使用しているのでwithConverterで型付けしたい。
  const data = docSnap.data() as Content;
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    console.log('No such document!');
  }
  return data;
};

export const firebaseCollectionId = async (collectionName: string) => {
  const posts: string[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    posts.push(doc.id);
  });
  return posts;
};

export const firebaseCollectionIdWhereUser = async (user: string) => {
  const posts: string[] = [];

  const q = query(collection(db, 'bookInfo'), where('created_by', '==', user));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    posts.push(doc.id);
  });

  return posts;
};

export const firebaseCollectionData = async (
  collectionName: string,
  user: string,
) => {
  const posts: DocumentData[] = [];
  const querySnapshot = await getDocs(
    collection(db, collectionName, user, 'contentId'),
  );

  querySnapshot.forEach((doc) => {
    posts.push(doc.data);
  });
  console.log(posts);

  return posts;
};

export const addFirebaseData = async (content: FormContents, uid?: string) => {
  if (content.image) {
    const imageUrl = encodeURIComponent(content.title);
    const data = { ...content, image: imageUrl };
    const storageRef = ref(storage, `images/${uid}/${imageUrl}/file.jpg`);
    uploadBytes(storageRef, content.image!).then((snapshot) => {
      console.log('Upload a blob or file!');
    });
    await addDoc(collection(db, 'bookInfo'), data);
  } else {
    await addDoc(collection(db, 'bookInfo'), content);
  }
};

export const getStorageImage = async (uid: string, title: string) => {
  let storageRef: StorageReference;
  const encodedTitle = encodeURIComponent(title);

  title === 'none'
    ? (storageRef = ref(storage, `images/none/file.jpg`))
    : (storageRef = ref(storage, `images/${uid}/${encodedTitle}/file.jpg`));
  return await getDownloadURL(ref(storageRef)).catch(() => 'none');
};

export const deleteFirebaseData = async (
  id: string,
  title: string,
  uid: string,
) => {
  const encodedTitle = encodeURIComponent(title);

  const docSnap = await getDoc(doc(db, 'bookInfo', id));

  await deleteDoc(doc(db, 'bookInfo', id));
  docSnap.data()!.image &&
    (await deleteObject(
      ref(storage, `images/${uid}/${encodedTitle}/file.jpg`),
    ));
};
