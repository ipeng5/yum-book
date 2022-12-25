import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSignup } from '../hooks/useSignup';

function Signup() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  const [isMatch, setIsMatch] = useState(true);
  const { error, signup } = useSignup();

  const handleSubmit = e => {
    e.preventDefault();
    if (isMatch) signup(email, password);
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
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Head>
        <title>Sign up | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)] flex justify-center items-center">
        <div className="bg-white rounded space-y-10 shadow-md w-[500px] p-14">
          <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4">
            SIGN UP
          </h2>
          <form
            className="flex flex-col space-y-4 text-lg"
            onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={handleInput}
              name="email"
              value={values.email}
              placeholder="Email"
              required
              className="form-input"
            />
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="Password"
              onChange={handleInput}
              required
              className="form-input"
            />
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              placeholder="Confirm password"
              onChange={handleInput}
              required
              className={
                isMatch
                  ? 'form-input'
                  : 'form-input border-2 border-primary-normal'
              }
            />
            {!isMatch && (
              <span className="text-primary-normal">
                Passwords do not match
              </span>
            )}
            <input
              type="text"
              onChange={handleInput}
              name="displayName"
              value={values.displayName}
              placeholder="Display Name"
              // required
              className="form-input"
            />

            <button type="submit" className="form-button">
              Sign up
            </button>
            {error && <p>{error}</p>}
          </form>
          <div className="text-lg space-x-2">
            <span>Already a user?</span>
            <Link href="/login" className="text-primary-normal hover:underline">
              Login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;
