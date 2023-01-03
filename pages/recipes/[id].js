import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useFavCollection } from '../../hooks/useFavCollection';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/modals/Modal';
import { LoginModal } from '../../components/modals/LoginModal';
import Error from '../../components/Error';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { BsInfoCircle, BsPlayFill, BsCheck2 } from 'react-icons/bs';

function Details() {
  const [meal, setMeal] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = UserAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const { addRecipeToFavorites, deleteFavRecipe } = useFirestore();
  const { open, openModal, closeModal } = useModal();
  const { favDocs } = useFavCollection(user);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        if (data.meals) {
          setMeal(data.meals[0]);
          setNotFound(false);
        } else setNotFound(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, []);

  if (user) {
    useEffect(() => {
      if (favDocs?.map(doc => doc.idMeal).some(idMeal => idMeal === id))
        setBookmarked(true);
      else setBookmarked(false);
    }, [JSON.stringify(favDocs), user]);
  }

  const handleFavorite = () => {
    if (!user) {
      openModal();
    } else {
      if (bookmarked) {
        deleteFavRecipe(favDocs.find(doc => doc.idMeal === id).idDoc);
        setBookmarked(false);
      } else {
        setBookmarked(true);
        addRecipeToFavorites(
          { ...meal, category: 'favorites', uid: user.uid },
          'favorite'
        );
      }
    }
  };

  const getIngredientsMarkup = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          <li key={i} className="flex items-center gap-4 w-[350px] relative">
            <BsCheck2 className="text-primary-normal text-3xl absolute" />
            <span className="pl-12">
              {meal[`strMeasure${i}`].toLowerCase()} {meal[`strIngredient${i}`]}
            </span>
          </li>
        );
      }
    }
    return ingredients;
  };

  const stepsArr = meal.strInstructions
    ?.replace(/[0-9]\./g, '')
    .replace(/STEP\s[0-9]/g, '')
    .split('.');

  return (
    <>
      <Head>
        <title>Recipe | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {notFound && <Error />}
      {!notFound && (
        <main className="min-h-[calc(100vh-250px)]">
          <Modal open={open} closeModal={closeModal}>
            <LoginModal closeModal={closeModal} />
          </Modal>
          <section className="mt-[150px] bg-white flex flex-col  py-20 justify-center items-center gap-6">
            <div className="flex flex-col items-center justify-center gap-10 max-w-[1500px] ">
              <h1 className="text-5xl text-center leading-tight ">
                {meal.strMeal}
              </h1>
              <div className="flex space-x-8 text-2xl items-center">
                <p className="flex space-x-2">
                  <span>Area:</span>
                  <Link
                    href={`/areas/${meal.strArea}`}
                    className="text-primary-normal hover:underline">
                    {meal.strArea}
                  </Link>
                </p>
                <p className="flex space-x-2">
                  <span>Category:</span>
                  <Link
                    href={`/categories/${meal.strCategory}`}
                    className="text-primary-normal hover:underline">
                    {meal.strCategory}
                  </Link>
                </p>
                {!bookmarked && (
                  <MdFavoriteBorder
                    className="text-3xl cursor-pointer"
                    onClick={handleFavorite}
                  />
                )}
                {bookmarked && (
                  <MdFavorite
                    className="text-3xl cursor-pointer"
                    onClick={handleFavorite}
                  />
                )}
              </div>
              <div className="flex gap-6">
                {meal.strSource ? (
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border-2 border-gray-400 hover:bg-gray-50 px-4 py-2 shadow-inner rounded transition">
                    <BsInfoCircle />
                    More Info
                  </a>
                ) : (
                  ''
                )}
                {meal.strYoutube ? (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-primary-normal border-2 border-primary-normal shadow-inner hover:opacity-90 text-white px-4 py-2 rounded transition">
                    <BsPlayFill className="text-2xl" />
                    Watch On YouTube
                  </a>
                ) : (
                  ''
                )}
              </div>
            </div>
          </section>
          <section className="flex gap-20 justify-center p-20">
            <img src={meal.strMealThumb} alt="" className="object-cover w-96" />
            <div>
              <h1 className="text-3xl  pb-10 text-primary-normal">
                INGREDIENTS
              </h1>
              <ul className="text-xl grid grid-cols-2 gap-4">
                {getIngredientsMarkup()}
              </ul>
            </div>
          </section>
          <section className="bg-white py-20">
            <div className="max-w-[1000px] mx-auto ">
              <h1 className="text-3xl  pb-10 text-primary-normal text-center">
                HOW TO COOK IT
              </h1>

              <ol>
                {stepsArr
                  ?.filter(sentence => sentence !== '')
                  .map((step, i) => {
                    if (step === '') return;
                    return (
                      <li key={i} className="pb-4 flex text-xl relative">
                        <div className="w-4 h-4 bg-primary-normal rounded-full absolute top-1"></div>
                        <span className=" pl-8 rounded">{step}</span>
                      </li>
                    );
                  })}
              </ol>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default Details;
