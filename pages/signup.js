import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
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
      <main className="min-h-[calc(100vh-250px)] flex justify-center items-center">
        {!user && (
          <div className="bg-white rounded space-y-10 shadow-md w-[500px] p-14">
            <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4">
              Sign up
            </h2>
            <form
              className="flex flex-col space-y-6 text-lg"
              onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1">
                <span className="text-base text-gray-400">Username</span>
                <input
                  type="text"
                  onChange={handleInput}
                  name="username"
                  value={values.username}
                  required
                  className="form-input"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-base text-gray-400">Email</span>
                <input
                  type="email"
                  onChange={handleInput}
                  name="email"
                  value={values.email}
                  required
                  className="form-input"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-base text-gray-400">Password</span>{' '}
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  required
                  className="form-input"
                />
                {!isValid && (
                  <span className="text-primary-normal text-base">
                    Password must be at least 6 characters
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-1 relative">
                <span className="text-base text-gray-400">
                  Confirm password
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleInput}
                  required
                  className="form-input"
                />
                {signupError && !isPending && isMatch && (
                  <p className="text-primary-normal absolute top-[88px]">
                    {signupError}
                  </p>
                )}
                {!isMatch && (
                  <span className="text-primary-normal text-base absolute top-[88px]">
                    Passwords do not match
                  </span>
                )}
              </label>

              {!isPending && (
                <button type="submit" className="form-button !mt-20">
                  Sign up
                </button>
              )}
              {isPending && (
                <button className="form-button !mt-20" disabled>
                  Loading
                </button>
              )}
            </form>
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
      </main>
    </>
  );
}

export default Signup;
