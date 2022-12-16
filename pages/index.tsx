import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AreaCard from '../components/AreaCard';
import CategoryCard from '../components/CategoryCard';
import { AreaList, AllCategories } from '../typings';
import requests from '../utils/requests';
import SearchResults from '../components/SearchResults';

interface Props {
  areaList: AreaList;
  allCategories: AllCategories;
}

export const getStaticProps = async () => {
  const [areaList, allCategories] = await Promise.all([
    fetch(requests.fetchAreaList).then(res => res.json()),
    fetch(requests.fetchAllCategories).then(res => res.json()),
  ]);
  return {
    props: {
      areaList,
      allCategories,
    },
  };
};

const Home = ({ areaList, allCategories }: Props) => {
  const [filter, setFilter] = useState('area');
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Home | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)] bg-white py-6 px-20">
        {query.search && <SearchResults searchInput={query.search} />}
        {!query.search && (
          <div className="max-w-screen-2xl py-4  mx-auto text-2xl flex space-x-4 items-center">
            <span>Filter by:</span>
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
        <div className="max-w-screen-2xl pt-4 pb-10 grid grid-cols-4 gap-10 mx-auto">
          {filter === 'category' &&
            !query.search &&
            allCategories.categories.map(category => (
              <CategoryCard category={category} key={category.idCategory} />
            ))}
          {filter === 'area' &&
            !query.search &&
            areaList.meals.map(area => (
              <AreaCard area={area} key={area.strArea} />
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
