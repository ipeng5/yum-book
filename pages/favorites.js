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
          className="mt-[80px] lg:mt-[100px] min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-200px)] bg-white main-padding">
          <div className="py-4 content-width mx-auto text-3xl flex space-x-4 items-center">
            <span>Favorites ({favDocs?.length})</span>
          </div>
          <div className="mealcard-grid">
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
