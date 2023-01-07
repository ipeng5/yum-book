import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { UserAuth } from '../context/AuthContext';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import { useEmailLogin } from '../hooks/useEmailLogin';
import LoginForm from '../components/forms/LoginForm';

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
        className="header-space flex justify-center items-center py-6 mx-4">
        {!user && (
          <div className="bg-white rounded shadow-md w-72 sm:w-80 md:w-96 lg:w-[400px] 2xl:w-[500px] p-8 2xl:p-14">
            <h2 className="form-title">Login</h2>
            <LoginForm
              values={values}
              handleSubmit={handleSubmit}
              handleInput={handleInput}
              isPending={isPending}
              emailLoginError={emailLoginError}
            />
            <button
              type="submit"
              className="py-1.5 lg:py-2 w-full rounded shadow-inner bg-[#fefefe] text-gray-500 border-[1px] lg:border-2 border-gray-300 flex gap-2 lg:gap-4 justify-center items-center hover:bg-[#fcfcfc] transition mb-10 mt-2"
              onClick={googleSignIn}>
              <FcGoogle className="text-base md:text-lg xl:text-xl" />
              <span className="text-sm md:text-base xl:text-lg">
                Sign in with Google
              </span>
            </button>
            <div className="text-sm md:text-base lg:text-lg xl:text-xl space-x-2">
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
