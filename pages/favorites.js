import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import MealCard from '../components/MealCard';
import Head from 'next/head';
import { UserRecipes } from '../context/RecipeContext';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

function favorites() {
  const { recipes, setRecipes } = UserRecipes();
  const { user, authIsReady } = UserAuth();
  const router = useRouter();

  const favorites = recipes.filter(
    recipe => recipe.category === 'favorites' && recipe.uid === user?.uid
  );

  useEffect(() => {
    const ref = collection(db, 'recipes');
    getDocs(ref).then(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setRecipes(results);
    });
  }, []);

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
        <main className="min-h-[calc(100vh-250px)] bg-white py-6 px-20 ">
          <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
            <span>Favorites</span>
          </div>
          <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
            {favorites.map(meal => (
              <MealCard meal={meal} key={meal.idMeal} />
            ))}
          </div>
        </main>
      )}
    </>
  );
}

export default favorites;
