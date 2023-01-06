import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Pagination from '../../components/ui/Pagination';
import MealCard from '../../components/ui/MealCard';
import { categoryList } from '../../lib/filterList';

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
      <main className="header-space bg-white main-padding">
        <div className="py-4 content-width mx-auto list-title flex space-x-4 items-center">
          <span>
            {category.meals.length} recipes for "{router.query.categories}"
          </span>
        </div>
        <div className="py-4 grid grid-cols-4 gap-6 content-width mx-auto">
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
