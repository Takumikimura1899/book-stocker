import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useCollection } from 'react-firebase-hooks/firestore';

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
export const db = getFirestore();
export const storage = getStorage(firebaseApp);

// export const getFirebaseData = async (path: string) => {
//   const pathCol = collection(db, path);
//   const SnapShot = await getDocs(pathCol);
//   const List = SnapShot.docs.map((doc) => doc.data());

//   return List;
// };

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

export const getFirebaseCollection = async (path: string) => {
  const querySnapshot = await getDocs(collection(db, path));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
  console.log(querySnapshot.docs[0].id);

  return querySnapshot.docs[0].id;
};

export const firebaseCollectionId = async () => {
  const posts: string[] = [];
  const querySnapshot = await getDocs(collection(db, 'bookInfo'));

  querySnapshot.forEach((doc) => {
    posts.push(doc.id);
  });
  console.log(posts);

  return posts;
};
export const firebaseCollectionData = async () => {
  const posts: string[] = [];
  const querySnapshot = await getDocs(collection(db, 'bookInfo'));

  querySnapshot.forEach((doc) => {
    posts.push(doc.id);
  });
  console.log(posts);

  return posts;
};

export const addFirebaseData = async (path: string, content: FormContents) => {
  // const reader = new FileReader()

  // const imageBase64 = reader.readAsDataURL(content.image!)
  // console.log(imageBase64);

  const imageUrl = content.title;
  // console.log(content.image);

  const data = { ...content, image: imageUrl };
  // const data = content.image
  //   ? { ...content, image: { ...content.image, name: imageUrl } }
  //   : content;
  // console.log(data.image);
  const storageRef = ref(storage, `images/${imageUrl}/${content.image?.name}`);
  uploadBytes(storageRef, content.image!).then((snapshot) => {
    console.log('Upload a blob or file!');
  });

  // console.log(data);

  const docRef = await addDoc(collection(db, path), data);
  console.log('Document written with ID:', docRef.id);
};

// export const FireStoreCollection = (path:string) => {
//   const [value] = useCollection(collection(db, 'bookInfo'));
//   return value;
// };
