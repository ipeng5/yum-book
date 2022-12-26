import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { UserAuth } from '../context/AuthContext';

export const useGoogleLogin = () => {
  const router = useRouter();
  const { dispatch } = UserAuth();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        dispatch({ type: 'LOGIN', payload: auth.currentUser });
        router.push('/');
        console.log(auth.currentUser);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return { googleSignIn };
};
