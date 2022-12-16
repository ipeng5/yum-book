import Header from './Header';
import Footer from './Footer';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between text-gray-normal bg-gray-light">
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
