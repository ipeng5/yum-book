import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MealCard from '../../components/MealCard';

export const getStaticPaths = async () => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await res.json();

  const paths = data.meals.map(c => {
    return {
      params: { category: c.strCategory },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const category = context.params.category;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await res.json();

  return {
    props: { category: data },
  };
};

function Category({ category }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Meals by Category | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-6 px-20">
        <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
          <span>
            {category.meals.length} recipes for "{router.query.category}"
          </span>
        </div>
        <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
          {category.meals.map(meal => (
            <MealCard meal={meal} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Category;
