import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { categoryList } from '../../lib/filterList';
import Pagination from '../../components/Pagination';
import MealCard from '../../components/MealCard';

export const getStaticPaths = async () => {
  const paths = categoryList.map(cat => {
    return {
      params: { categories: cat },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const category = context.params.categories;
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await res.json();

  return {
    props: { category: data },
  };
};

function Categories({ category }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 20;
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = category.meals.slice(indexOfFirstMeal, indexOfLastMeal);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Head>
        <title>Meals by Category | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)] bg-white py-6 px-20 ">
        <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
          <span>
            {category.meals.length} recipes for "{router.query.categories}"
          </span>
        </div>
        <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
          {currentMeals.map(meal => (
            <MealCard meal={meal} key={meal.idMeal} />
          ))}
        </div>
        <Pagination
          mealsPerPage={mealsPerPage}
          totalMeals={category.meals.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </>
  );
}

export default Categories;
