import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import MealCard from '../components/MealCard';
import Pagination from '../components/Pagination';

function Filter() {
  const [list, setList] = useState([]);
  const router = useRouter();
  const { filter, filterTerm } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 20;
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = list.meals?.slice(indexOfFirstMeal, indexOfLastMeal);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const url =
    filter === 'area'
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterTerm}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterTerm}`;

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchList();
  }, [filterTerm]);

  return (
    <>
      <Head>
        <title>{filterTerm} Meals | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)] bg-white py-6 px-20 ">
        <div className="py-4 max-w-screen-2xl mx-auto text-3xl flex space-x-4 items-center">
          <span>
            {list.meals?.length} recipes for "{filterTerm}"
          </span>
        </div>
        <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
          {currentMeals?.map(meal => (
            <MealCard meal={meal} key={meal.idMeal} />
          ))}
        </div>
        <Pagination
          mealsPerPage={mealsPerPage}
          totalMeals={list.meals?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </>
  );
}

export default Filter;
