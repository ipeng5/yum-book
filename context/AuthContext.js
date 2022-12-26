import {
  useContext,
  createContext,
  useEffect,
  useState,
  useReducer,
} from 'react';
import { auth } from '../firebase/config';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // const googleSignIn = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then(() => {
  //       router.push('/');
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // };

  // const createUser = (email, password, username) => {
  //   setIsPending(true);
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       updateProfile(auth.currentUser, { displayName: username });
  //       router.push('/');
  //       setIsPending(false);
  //     })
  //     .catch(err => {
  //       setIsPending(false);
  //       console.log(err.message);
  //     });
  // };

  // const emailSignIn = async (email, password) => {
  //   setIsPending(true);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     router.push('/');
  //     setIsPending(false);
  //   } catch (err) {
  //     setIsPending(false);
  //     console.log(err.message);
  //   }
  // };

  // const logOut = async () => {
  //   try {
  //     await signOut(auth);
  //     router.push('/');
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
      // value={{
      //   googleSignIn,
      //   emailSignIn,
      //   logOut,
      //   user,
      //   createUser,
      //   isPending,
      // }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
