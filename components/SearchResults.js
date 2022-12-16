import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import MealCard from '../components/MealCard';

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
        console.log(err);
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
      <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
        <span>
          {recipeList ? recipeList.length : 'No'} search results for "
          {searchInput}"
        </span>
      </div>
      <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
        {recipeList?.map(meal => (
          <MealCard meal={meal} key={meal.idMeal} />
        ))}
      </div>
    </>
  );
}

export default SearchResults;
