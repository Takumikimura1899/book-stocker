import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { firebaseApp } from './firebase';

export const auth = getAuth(firebaseApp);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Googleアカウントでログインしました。');
      console.log(result);
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
