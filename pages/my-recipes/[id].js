import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { doc, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BsCheck2 } from 'react-icons/bs';
import { db } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';
import { useStorage } from '../../hooks/useStorage';
import { useModal } from '../../hooks/useModal';
import Modal from '../../components/modal/Modal';
import EditModal from '../../components/modal/EditModal';
import Error from '../../components/view/Error';
import DetailsHeader from '../../components/view/DetailsHeader';
import DetailsIngredients from '../../components/view/DetailsIngredients';
import DetailsSteps from '../../components/view/DetailsSteps';

function Details() {
  const [meal, setMeal] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { deleteMyRecipe } = useFirestore();
  const { open, openModal, closeModal } = useModal();
  const { deleteImage } = useStorage();
  const [notFound, setNotFound] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'recipes', id);
    onSnapshot(docRef, doc => {
      if (!doc.data()) {
        setNotFound(true);
        setDeleted(false);
      } else {
        setMeal(doc.data());
        setNotFound(false);
        setDeleted(false);
      }
    });
  }, [id]);

  const handleDelete = () => {
    setDeleted(true);
    router.push('/my-recipes');
    deleteMyRecipe(id);
    deleteImage(meal.strMealThumb);
  };

  const getIngredientsMarkup = () => {
    const markup = meal?.ingredients?.map((ing, i) => (
      <li key={i} className="flex items-center gap-4 w-[350px] relative">
        <BsCheck2 className="text-primary-normal text-3xl absolute" />
        <span className="pl-12">{ing.ingredient}</span>
      </li>
    ));
    return markup;
  };

  return (
    <>
      <Head>
        <title>My Recipes | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!deleted && notFound && <Error />}
      {!deleted && !notFound && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-[calc(100vh-250px)] mt-[150px]">
          <Modal open={open} closeModal={closeModal}>
            <EditModal closeModal={closeModal} meal={meal} />
          </Modal>
          <DetailsHeader
            meal={meal}
            source="firestore"
            openModal={openModal}
            handleDelete={handleDelete}
          />
          <DetailsIngredients
            meal={meal}
            getIngredientsMarkup={getIngredientsMarkup}
            source="firestore"
          />
          <DetailsSteps stepsData={meal.steps} source="firestore" />
        </motion.main>
      )}
    </>
  );
}

export default Details;
