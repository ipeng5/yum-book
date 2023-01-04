import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';

export const useEmailLogin = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [emailLoginError, setEmailLoginError] = useState(null);
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
      if (err.code === 'auth/user-not-found') {
        setEmailLoginError('Email address was not found');
      } else if (err.code === 'auth/wrong-password') {
        fetchSignInMethodsForEmail(auth, email).then(result => {
          result[0] === 'google.com'
            ? setEmailLoginError('Please sign in with your Google account')
            : setEmailLoginError('Password is incorrect');
        });
      } else {
        console.log(err.message);
      }
    }
  };

  return { emailSignIn, isPending, emailLoginError };
};
