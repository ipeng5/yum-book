import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import { useEmailLogin } from '../hooks/useEmailLogin';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { user } = UserAuth();
  const { googleSignIn } = useGoogleLogin();
  const { emailSignIn, isPending } = useEmailLogin();

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

  return (
    <>
      <Head>
        <title>Login | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)] flex justify-center items-center">
        {user && (
          <h2 className="text-4xl text-primary-normal text-center font-semibold  absolute top-1/3 w-full">
            You have logged in already 😊
          </h2>
        )}
        {!user && (
          <div className="bg-white rounded shadow-md w-[500px] p-14">
            <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4 mb-10">
              LOGIN
            </h2>
            <form
              className="flex flex-col space-y-4 text-lg"
              onSubmit={handleSubmit}>
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
              </label>

              <div className="flex flex-col gap-4">
                {!isPending && (
                  <button
                    type="submit"
                    className="form-button border-2 border-primary-normal">
                    Login
                  </button>
                )}
                {isPending && (
                  <button
                    disabled
                    className="form-button border-2 border-primary-normal">
                    Loading
                  </button>
                )}
              </div>
            </form>
            <button
              type="submit"
              className="py-3 w-full rounded text-xl shadow-inner bg-white text-gray-500 border-2 border-gray-300 flex gap-4 justify-center items-center hover:bg-[#fdfdfd] transition mb-10 mt-4"
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
      </main>
    </>
  );
}

export default Login;
