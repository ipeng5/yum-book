import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { UserAuth } from '../../context/AuthContext';

function Layout({ children }) {
  const { authIsReady } = UserAuth();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {authIsReady && <Header />}
        {authIsReady && children}
      </div>
      {authIsReady && <Footer />}
    </div>
  );
}

export default Layout;
