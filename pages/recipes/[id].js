import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { BsCheck2 } from 'react-icons/bs';
import { UserAuth } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useFavCollection } from '../../hooks/useFavCollection';
import { useModal } from '../../hooks/useModal';
import Modal from '../../components/modal/Modal';
import LoginModal from '../../components/modal/LoginModal';
import Error from '../../components/view/Error';
import DetailsHeader from '../../components/view/DetailsHeader';
import DetailsIngredients from '../../components/view/DetailsIngredients';
import DetailsSteps from '../../components/view/DetailsSteps';

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
        console.log(err.message);
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
        addRecipeToFavorites({ ...meal, category: 'favorites', uid: user.uid });
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
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-[calc(100vh-250px)] mt-[150px]">
          <Modal open={open} closeModal={closeModal}>
            <LoginModal closeModal={closeModal} />
          </Modal>
          <DetailsHeader
            meal={meal}
            bookmarked={bookmarked}
            handleFavorite={handleFavorite}
            source="api"
          />
          <DetailsIngredients
            meal={meal}
            getIngredientsMarkup={getIngredientsMarkup}
            source="api"
          />
          <DetailsSteps stepsData={stepsArr} source="api" />
        </motion.main>
      )}
    </>
  );
}

export default Details;
