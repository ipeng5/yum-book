import Head from 'next/head';
import { useState } from 'react';
import AreaCard from '../components/AreaCard';
import CategoryCard from '../components/CategoryCard';
import { categoryList, areaList, allCategories, categoryDetails } from '../typings';
import requests from '../utils/requests';

interface Props {
  categoryList: categoryList;
  areaList: areaList;
  allCategories: allCategories;
  category: categoryDetails;
}

const Home = ({ categoryList, areaList, allCategories }: Props) => {
  const [filter, setFilter] = useState('area');
  // console.log(categoryList);
  console.log(areaList.meals);
  // console.log(allCategories);

  return (
    <>
      <Head>
        <title>Yum Book | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-6 px-20 w-screen">
        <div className="py-4 max-w-screen-2xl mx-auto text-2xl flex space-x-4 items-center">
          <span>Filter by:</span>
          <button
            onClick={() => {
              setFilter('area');
            }}
            className={`${
              filter === 'area'
                ? 'px-6 py-2 bg-primary-light text-primary-normal rounded-xl transition'
                : 'px-6 py-2 rounded-xl bg-gray-light hover:text-primary-normal transition'
            }`}>
            Area
          </button>
          <button
            onClick={() => {
              setFilter('category');
            }}
            className={`${
              filter === 'category'
                ? 'px-6 py-2 bg-primary-light text-primary-normal rounded-xl transition'
                : 'px-6 py-2 rounded-xl bg-gray-light hover:text-primary-normal transition'
            }`}>
            Category
          </button>
        </div>
        <div className="py-4 grid grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
          {filter === 'category' &&
            allCategories.categories.map(category => (
              <CategoryCard category={category} key={category.idCategory} />
            ))}
          {filter === 'area' &&
            areaList.meals.map(area => <AreaCard area={area} key={area.strArea} />)}
        </div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [categoryList, areaList, allCategories] = await Promise.all([
    fetch(requests.fetchCategoryList).then(res => res.json()),
    fetch(requests.fetchAreaList).then(res => res.json()),
    fetch(requests.fetchAllCategories).then(res => res.json()),
  ]);
  return {
    props: {
      categoryList,
      areaList,
      allCategories,
    },
  };
};
