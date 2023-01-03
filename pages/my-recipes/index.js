import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MealCard from '../../components/MealCard';
import { UserAuth } from '../../context/AuthContext';
import { useUploadCollection } from '../../hooks/useUploadCollection';
import { motion } from 'framer-motion';

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
          className="min-h-[calc(100vh-250px)] mt-[150px] bg-white py-6 px-20 ">
          <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
            <span>My Recipes ({uploadedDocs?.length})</span>
          </div>
          <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
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
