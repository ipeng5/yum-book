import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MealCard from '../../components/ui/MealCard';
import { UserAuth } from '../../context/AuthContext';
import { useUploadCollection } from '../../hooks/useUploadCollection';

function myRecipes() {
  const { user, authIsReady } = UserAuth();
  const router = useRouter();
  const { uploadedDocs } = useUploadCollection(user);

  useEffect(() => {
    if (authIsReady && !user) {
      router.push('/login');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>My Recipes | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="header-space bg-white main-padding">
          <div className="py-4 content-width mx-auto list-title flex space-x-4 items-center">
            <span>My Recipes ({uploadedDocs?.length})</span>
          </div>
          <div className="mealcard-grid">
            {uploadedDocs?.map(meal => (
              <MealCard meal={meal} key={meal.idDoc} />
            ))}
          </div>
        </motion.main>
      )}
    </>
  );
}

export default myRecipes;
