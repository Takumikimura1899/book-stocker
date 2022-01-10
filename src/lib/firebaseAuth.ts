import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { firebaseApp } from './firebase';

export const auth = getAuth(firebaseApp);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Googleアカウントでログインしました。');
    })
    .catch((error) => {
      console.error(error);
    });
};
