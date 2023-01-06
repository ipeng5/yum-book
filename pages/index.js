import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Filter from '../components/views/Filter';
import SearchResults from '../components/views/SearchResults';
import FilterCard from '../components/ui/FilterCard';
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
      <main className="header-space bg-white main-padding">
        {query.search && <SearchResults searchInput={query.search} />}
        {!query.search && <Filter filter={filter} setFilter={setFilter} />}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="content-width pt-4 pb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4 xl:gap-6 mx-auto">
          {filter === 'category' &&
            !query.search &&
            allCategories.categories.map(category => (
              <FilterCard
                filterData={category}
                filterType="category"
                key={category.idCategory}
              />
            ))}
          {filter === 'area' &&
            !query.search &&
            areaList.map(area => (
              <FilterCard filterData={area} filterType="area" key={area} />
            ))}
        </motion.div>
      </main>
    </>
  );
};

export default Home;
