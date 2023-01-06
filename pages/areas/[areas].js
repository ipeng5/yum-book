import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MealCard from '../../components/ui/MealCard';
import Pagination from '../../components/ui/Pagination';
import { areaList } from '../../lib/filterList';

export const getStaticPaths = async () => {
  const paths = areaList.map(area => {
    return {
      params: { areas: area },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const area = context.params.areas;
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const data = await res.json();

  return {
    props: { area: data },
  };
};

function Area({ area }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 20;
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = area.meals.slice(indexOfFirstMeal, indexOfLastMeal);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Head>
        <title>Meals by Area | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="header-space bg-white main-padding">
        <div className="py-4 content-width mx-auto list-title flex space-x-4 items-center">
          <span>
            {area.meals.length} recipes for "{router.query.areas}"
          </span>
        </div>
        <div className="mealcard-grid">
          {currentMeals.map(meal => (
            <MealCard meal={meal} key={meal.idMeal} />
          ))}
        </div>
        <Pagination
          mealsPerPage={mealsPerPage}
          totalMeals={area.meals.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </>
  );
}

export default Area;
