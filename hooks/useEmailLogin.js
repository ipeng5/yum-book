import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

export const useEmailLogin = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = UserAuth();

  const emailSignIn = async (email, password) => {
    setIsPending(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: 'LOGIN', payload: auth.currentUser });
      router.push('/');
      setIsPending(false);
    } catch (err) {
      setIsPending(false);
      console.log(err.message);
    }
  };

  return { emailSignIn, isPending };
};
