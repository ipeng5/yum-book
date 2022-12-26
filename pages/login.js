import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();

  const handleInput = e => {
    setIsValid(true);
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      // router.push('/');
      console.log(111);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Login | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)] flex justify-center items-center">
        {!user && (
          <div className="bg-white rounded shadow-md w-[500px] p-14">
            <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4 mb-10">
              LOGIN
            </h2>
            <form className="flex flex-col space-y-4 text-lg">
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
                <button
                  type="submit"
                  className="form-button border-2 border-primary-normal">
                  Login
                </button>
              </div>
            </form>
            <button
              type="submit"
              className="py-3 w-full rounded text-xl shadow-inner bg-white text-gray-500 border-2 border-gray-300 flex gap-4 justify-center items-center hover:bg-[#fdfdfd] transition mb-10 mt-4"
              onClick={handleGoogleSignIn}>
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
