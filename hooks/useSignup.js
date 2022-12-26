import { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = (email, password, username) => {
    setError(null);
    setIsPending(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const user = res.user;
        updateProfile(auth.currentUser, { displayName: username });
        setError(null);
        setIsPending(false);
        console.log(user);
      })
      .catch(err => {
        setError(err.message);
        setIsPending(false);
      });
  };

  return { error, signup, isPending };
};
