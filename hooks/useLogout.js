import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';

export const useLogout = () => {
  const router = useRouter();
  const { dispatch } = UserAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      router.push('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return { logout };
};
