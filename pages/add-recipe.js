import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { UserAuth } from '../context/AuthContext';
import AddRecipeForm from '../components/forms/AddRecipeForm';

function AddRecipe() {
  const { user, authIsReady } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (authIsReady && !user) {
      router.push('/login');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Add Recipe | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-[calc(100vh-205px)] lg:min-h-[calc(100vh-225px)] mt-[80px] lg:mt-[100px] mb-[26px] mx-4 flex justify-center items-center">
        {user && (
          <div className="bg-white rounded space-y-10 shadow-md w-[1000px] p-14">
            <h2 className="text-3xl text-primary-normal text-center font-semibold pb-4">
              Add recipe
            </h2>
            <AddRecipeForm uid={user.uid} />
          </div>
        )}
      </motion.main>
    </>
  );
}

export default AddRecipe;
