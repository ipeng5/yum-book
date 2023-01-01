import { useEffect } from 'react';
import MealCard from '../components/MealCard';
import Head from 'next/head';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useCollection } from '../hooks/useCollection';

function favorites() {
  const { user, authIsReady } = UserAuth();
  const router = useRouter();
  const { documents } = useCollection('favorites', user);

  useEffect(() => {
    if (authIsReady && !user) {
      router.push('/login');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Favorites | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <main className="mt-[150px] min-h-[calc(100vh-250px)] bg-white py-6 px-20 ">
          <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
            <span>Favorites ({documents?.length})</span>
          </div>
          <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
            {documents?.map(meal => (
              <MealCard meal={meal} key={meal.idMeal} />
            ))}
          </div>
        </main>
      )}
    </>
  );
}

export default favorites;
