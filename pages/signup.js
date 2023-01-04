import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import SignupForm from '../components/forms/SignupForm';
import { UserAuth } from '../context/AuthContext';
import { useSignup } from '../hooks/useSignup';

function Signup() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [isMatch, setIsMatch] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const { user, authIsReady } = UserAuth();
  const { createUser, isPending, signupError } = useSignup();
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    if (values.password.length < 6) {
      setIsValid(false);
      return;
    } else setIsValid(true);
    if (isMatch) createUser(values.email, values.password, values.username);
  };

  useEffect(() => {
    const validatePassword = () => {
      if (values.password && values.confirmPassword) {
        if (values.password !== values.confirmPassword) setIsMatch(false);
        if (values.password === values.confirmPassword) setIsMatch(true);
      }
    };
    validatePassword();
  }, [values.password, values.confirmPassword]);

  const handleInput = e => {
    setIsValid(true);
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (authIsReady && user) {
      router.push('/');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Sign up | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-[calc(100vh-250px)] mt-[150px] flex justify-center items-center">
        {!user && (
          <div className="bg-white rounded space-y-10 shadow-md w-[500px] p-14">
            <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4">
              Sign up
            </h2>
            <SignupForm
              values={values}
              handleSubmit={handleSubmit}
              handleInput={handleInput}
              isPending={isPending}
              signupError={signupError}
              isValid={isValid}
              isMatch={isMatch}
            />

            <div className="text-lg space-x-2">
              <span>Already a user?</span>
              <Link
                href="/login"
                className="text-primary-normal hover:underline">
                Login
              </Link>
            </div>
          </div>
        )}
      </motion.main>
    </>
  );
}

export default Signup;
