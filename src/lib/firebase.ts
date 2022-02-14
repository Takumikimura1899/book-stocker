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

export const getFirebaseData: (
  uid: string,
  id: string,
) => Promise<Content> = async (uid, id) => {
  const docRef = doc(db, 'user', uid, 'bookInfo', id);
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

export const firebaseCollectionId: (
  collectionName: string,
) => Promise<string[]> = async (collectionName) => {
  const posts: string[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    posts.push(doc.id);
  });
  return posts;
};
// export const firebaseCollectionIdContent: (
//   collectionName: string,
// ) => Promise<{uid:string,id:string[]}[]> = async (collectionName) => {
//   const params: {uid:string,id:string[]} = {uid:"",id:[]};
//   const querySnapshot = await getDocs(collection(db, collectionName));
//   querySnapshot.forEach(async(doc) => {
//     params.uid.push(doc.id);
//     const querySnapshot = await getDocs(collection(db,"user",doc.id,"content"));
//     querySnapshot.forEach((doc) => {
//       params.id.push(doc.id)
//     })
//   });
//   return params;
// };

export const firebaseCollectionIdWhereUser: (
  user: string,
) => Promise<string[]> = async (user) => {
  const posts: string[] = [];

  const q = query(collection(db, 'bookInfo'), where('created_by', '==', user));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    posts.push(doc.id);
  });

  return posts;
};

export const addFirebaseData: (
  content: FormContents,
  uid?: string,
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
  title: string,
) => Promise<string> = async (uid, title) => {
  let storageRef: StorageReference;
  const encodedTitle = encodeURIComponent(title);

  title === 'none'
    ? (storageRef = ref(storage, `images/none/file.jpg`))
    : (storageRef = ref(storage, `images/${uid}/${encodedTitle}/file.jpg`));
  return await getDownloadURL(ref(storageRef)).catch(() => 'none');
};

export const deleteFirebaseData: (
  id: string,
  title: string,
  uid: string,
) => Promise<void> = async (id, title, uid) => {
  const encodedTitle = encodeURIComponent(title);
  const docRef = doc(db, 'user', uid, 'bookInfo', id);
  const docSnap = await getDoc(docRef);

  await deleteDoc(docRef);
  docSnap.data()!.image &&
    (await deleteObject(
      ref(storage, `images/${uid}/${encodedTitle}/file.jpg`),
    ));
};
