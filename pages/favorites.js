import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useFavCollection } from '../hooks/useFavCollection';
import MealCard from '../components/ui/MealCard';
import { UserAuth } from '../context/AuthContext';

function favorites() {
  const { user, authIsReady } = UserAuth();
  const router = useRouter();
  const { favDocs } = useFavCollection(user);

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
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-[150px] min-h-[calc(100vh-250px)] bg-white py-6 px-20 ">
          <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
            <span>Favorites ({favDocs?.length})</span>
          </div>
          <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
            {favDocs?.map(meal => (
              <MealCard meal={meal} key={meal.idMeal} />
            ))}
          </div>
        </motion.main>
      )}
    </>
  );
}

export default favorites;
