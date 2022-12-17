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
      <main className="min-h-[calc(100vh-250px)] flex justify-center items-center">
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
              className="form-input"
            />
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              required
              className="form-input"
            />
            <input
              type="text"
              onChange={e => setDisplayName(e.target.value)}
              value={displayName}
              placeholder="Display Name"
              required
              className="form-input"
            />

            <button type="submit" className="form-button">
              Sign up
            </button>
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
