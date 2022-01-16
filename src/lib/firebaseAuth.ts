import { addDoc, collection } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { db, firebaseApp } from './firebase';

export const auth = getAuth(firebaseApp);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Googleアカウントでログインしました。');
      console.log(result);
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

      if (isNewUser) {
        addDoc(collection(db, 'user'), { id: result.user.uid });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logOut = () => {
  signOut(auth);
};

export const userCheck = () => {
  const user = auth.currentUser;

  if (user !== null) {
    console.log(user.uid);
  }
};
