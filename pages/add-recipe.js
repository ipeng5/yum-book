import Head from 'next/head';
import { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
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
      <main className="min-h-[calc(100vh-275px)] mt-[150px] mb-[26px] mx-4 flex justify-center items-center">
        {user && (
          <div className="bg-white rounded space-y-10 shadow-md w-[1200px] p-14">
            <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4">
              Add recipe
            </h2>
            <AddRecipeForm uid={user.uid} />
          </div>
        )}
      </main>
    </>
  );
}

export default AddRecipe;
