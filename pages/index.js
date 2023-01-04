import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AreaCard from '../components/view/AreaCard';
import CategoryCard from '../components/view/CategoryCard';
import SearchResults from '../components/view/SearchResults';
import { areaList } from '../lib/filterList';

export const getStaticProps = async () => {
  const res = await fetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  );
  const allCategories = await res.json();

  return {
    props: {
      areaList,
      allCategories,
    },
  };
};

const Home = ({ areaList, allCategories }) => {
  const [filter, setFilter] = useState('area');
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Home | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)] mt-[150px] bg-white py-6 px-20">
        {query.search && <SearchResults searchInput={query.search} />}
        {!query.search && (
          <div className="max-w-screen-2xl py-4  mx-auto text-2xl flex space-x-4 items-center">
            <span className="text-3xl">Filter by:</span>
            <button
              onClick={() => {
                setFilter('area');
              }}
              className={`${filter === 'area' ? 'filter-active' : 'filter'}`}>
              Area
            </button>
            <button
              onClick={() => {
                setFilter('category');
              }}
              className={`${
                filter === 'category' ? 'filter-active' : 'filter'
              }`}>
              Category
            </button>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-screen-2xl pt-4 pb-10 grid grid-cols-4 gap-10 mx-auto">
          {filter === 'category' &&
            !query.search &&
            allCategories.categories.map(category => (
              <CategoryCard category={category} key={category.idCategory} />
            ))}
          {filter === 'area' &&
            !query.search &&
            areaList.map(area => <AreaCard area={area} key={area} />)}
        </motion.div>
      </main>
    </>
  );
};

export default Home;
