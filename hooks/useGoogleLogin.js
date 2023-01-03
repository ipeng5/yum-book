import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
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
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return { googleSignIn };
};
