import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <>
      <Head>
        <title>Sign up | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-h-[calc(100vh-250px)] ">
        <div className="bg-white rounded space-y-10 shadow-md w-[500px] p-14">
          <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4">
            SIGN UP
          </h2>
          <form className="flex flex-col space-y-4 text-lg">
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              required
              className="border-2 border-gray-200 rounded p-2 outline-primary-medium"
            />
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              required
              className="border-2 border-gray-200 rounded p-2 outline-primary-medium"
            />
            <input
              type="text"
              onChange={e => setDisplayName(e.target.value)}
              value={displayName}
              placeholder="Display Name"
              required
              className="border-2 border-gray-200 rounded p-2 outline-primary-medium"
            />

            <button type="submit" className="form-button">
              Sign up
            </button>
          </form>
          <div className="text-lg space-x-2">
            <span>Already a user?</span>
            <Link
              href="/login"
              className="text-primary-normal border-b-2 border-primary-normal hover:text-primary-medium">
              Login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;
