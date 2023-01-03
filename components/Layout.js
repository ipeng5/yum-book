import React from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { UserAuth } from '../context/AuthContext';

function Layout({ children }) {
  const { authIsReady } = UserAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between text-gray-normal bg-gray-light">
      <div>
        {authIsReady && <Header />}
        {authIsReady && children}
      </div>
      {authIsReady && <Footer />}
    </div>
  );
}

export default Layout;
