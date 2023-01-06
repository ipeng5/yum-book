import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MealCard from '../ui/MealCard';

function SearchResults({ searchInput }) {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
        );
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setRecipeList(data.meals);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchFilteredRecipes();
  }, [searchInput]);

  return (
    <>
      <Head>
        <title>Recipes: {searchInput} | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="content-width mx-auto py-4 list-title flex space-x-4 items-center">
        <span>
          {recipeList ? recipeList.length : 'No'} search results for "
          {searchInput}"
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mealcard-grid">
        {recipeList?.map(meal => (
          <MealCard meal={meal} key={meal.idMeal} />
        ))}
      </motion.div>
    </>
  );
}

export default SearchResults;
