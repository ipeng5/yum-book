import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import { useEmailLogin } from '../hooks/useEmailLogin';
import LoginForm from '../components/forms/LoginForm';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { user, authIsReady } = UserAuth();
  const { googleSignIn } = useGoogleLogin();
  const { emailSignIn, isPending, emailLoginError } = useEmailLogin();
  const router = useRouter();

  const handleInput = e => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    emailSignIn(values.email, values.password);
  };

  useEffect(() => {
    if (authIsReady && user) {
      router.push('/');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Login | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-[calc(100vh-250px)] mt-[150px] flex justify-center items-center">
        {!user && (
          <div className="bg-white rounded shadow-md w-[500px] p-14">
            <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4 mb-10">
              Login
            </h2>
            <LoginForm
              values={values}
              handleSubmit={handleSubmit}
              handleInput={handleInput}
              isPending={isPending}
              emailLoginError={emailLoginError}
            />
            <button
              type="submit"
              className="py-3 w-full rounded text-xl shadow-inner bg-[#fefefe] text-gray-500 border-2 border-gray-300 flex gap-4 justify-center items-center hover:bg-[#fcfcfc] transition mb-10 mt-4"
              onClick={googleSignIn}>
              <FcGoogle className="text-2xl" />
              <span>Sign in with Google</span>
            </button>
            <div className="text-lg space-x-2">
              <span>No account?</span>
              <Link
                href="/signup"
                className="text-primary-normal hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </motion.main>
    </>
  );
}

export default Login;
