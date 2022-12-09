import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>YUMBOOK | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-6 px-20 text-xl">
        <div className="py-4">
          <span>Filter by:</span>
          <span>Category</span>
          <span>Area</span>
          <span>Ingredient</span>
        </div>
        <div className="grid grid-cols-3 gap-10">
          <div className="h-40 w-full bg-blue-200 rounded-3xl">Italian</div>
          <div>Chinese</div>
          <div>English</div>
          <div>Italian</div>
          <div>Chinese</div>
          <div>English</div>
          <div>Italian</div>
          <div>Chinese</div>
          <div>English</div>
          <div>Italian</div>
          <div>Chinese</div>
          <div>English</div>
          <div>Italian</div>
          <div>Chinese</div>
          <div>English</div>
          <div>Italian</div>
          <div>Chinese</div>
          <div>English</div>
        </div>
      </main>
    </>
  );
};

export default Home;
