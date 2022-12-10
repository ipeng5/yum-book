import type { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between text-gray-normal">
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
