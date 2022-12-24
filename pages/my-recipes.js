import { useEffect, useState } from 'react';
import { useRecipe } from '../hooks/useRecipe';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import MealCard from '../components/MealCard';
import Pagination from '../components/Pagination';
import Head from 'next/head';

function myRecipes() {
  const { recipes, setRecipes } = useRecipe();

  const myRecipes = recipes.filter(recipe => recipe.category === 'uploads');

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

  return (
    <>
      <Head>
        <title>My Recipes | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)] bg-white py-6 px-20 ">
        <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
          <span>My Recipes</span>
        </div>
        <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
          {myRecipes
            .filter(recipe => recipe.category === 'uploads')
            .map(meal => (
              <MealCard meal={meal} key={meal.idMeal} />
            ))}
        </div>
        {/* <Pagination
          mealsPerPage={mealsPerPage}
          totalMeals={list.meals?.length}
          paginate={paginate}
          currentPage={currentPage}
        /> */}
      </main>
    </>
  );
}

export default myRecipes;
