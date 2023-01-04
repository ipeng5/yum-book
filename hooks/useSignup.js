import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';

export const useSignup = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [signupError, setSignupError] = useState(null);

  const { dispatch } = UserAuth();

  const createUser = (email, password, username) => {
    setIsPending(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: username });
        dispatch({ type: 'LOGIN', payload: auth.currentUser });
        router.push('/');
        setIsPending(false);
      })
      .catch(err => {
        setIsPending(false);
        if (err.code === 'auth/email-already-in-use') {
          setSignupError('This email is registered already');
        } else {
          console.log(err.message);
        }
      });
  };

  return { createUser, isPending, signupError };
};
