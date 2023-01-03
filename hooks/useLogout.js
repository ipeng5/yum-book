import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { UserAuth } from '../context/AuthContext';

export const useLogout = () => {
  const router = useRouter();
  const { dispatch } = UserAuth();

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      router.push('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return { logOut };
};
