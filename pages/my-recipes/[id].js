import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md';
import { BsCheck2 } from 'react-icons/bs';
import Link from 'next/link';

function Details() {
  const [meal, setMeal] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const docRef = doc(db, 'recipes', id);
    const getMeal = async () => {
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (!data) router.push('/404');
      setMeal(data);
    };
    getMeal();
  }, [id]);

  return (
    <>
      <Head>
        <title>My Recipes | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-250px)]">
        <section className="bg-white flex flex-col py-20 justify-center items-center gap-6">
          <div className="flex flex-col items-center justify-center gap-10 max-w-[1500px] ">
            <h1 className="text-5xl text-center leading-tight">
              {meal && meal.strMeal}
            </h1>
            <div className="flex space-x-8 text-2xl items-center">
              <p className="flex space-x-2">
                <span>Category:</span>
                <Link
                  href={`/my-recipes`}
                  className="text-primary-normal hover:underline">
                  My Recipes
                </Link>
              </p>
              <MdOutlineModeEditOutline className="text-3xl cursor-pointer" />
              <MdDeleteOutline className="text-3xl cursor-pointer" />
            </div>
          </div>
        </section>
        <section className="flex gap-20 justify-center p-20">
          <img
            src={meal && meal.strMealThumb}
            alt=""
            className="object-cover w-96 h-96"
          />
          <div>
            <h1 className="text-3xl  pb-10 text-primary-normal">INGREDIENTS</h1>
            <ul className="text-xl grid grid-cols-2 gap-4">
              {meal.ingredients?.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 w-[350px] relative">
                  <BsCheck2 className="text-primary-normal text-3xl absolute" />
                  <span className="pl-12">{ing.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="max-w-[1000px] mx-auto ">
            <h1 className="text-3xl  pb-10 text-primary-normal text-center">
              HOW TO COOK IT
            </h1>
            <ol>
              {meal.steps?.map((step, i) => (
                <li key={i} className="pb-4 flex text-xl relative">
                  <div className="w-4 h-4 bg-primary-normal rounded-full absolute top-1"></div>
                  <span className=" pl-8 rounded">{step.step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}

export default Details;
