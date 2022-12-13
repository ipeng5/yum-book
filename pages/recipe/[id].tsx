import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Details() {
  const [meal, setMeal] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setMeal(data.meals[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [id]);

  console.log(meal);

  return (
    <>
      <Head>
        <title>Recipe | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}

export default Details;
