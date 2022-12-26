import { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { UserAuth } from '../context/AuthContext';

export const useSignup = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
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
        console.log(err.message);
      });
  };

  return { createUser, isPending };
};
