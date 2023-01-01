import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import { useFirestore } from '../../hooks/useFirestore';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/modals/Modal';
import { EditModal } from '../../components/modals/EditModal';
import Link from 'next/link';
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md';
import { BsCheck2 } from 'react-icons/bs';

function Details() {
  const [meal, setMeal] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { deleteRecipe } = useFirestore();
  const { open, openModal, closeModal } = useModal();

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

  const handleDelete = () => {
    deleteRecipe(id);
    router.push('/my-recipes');
  };

  return (
    <>
      <Head>
        <title>My Recipes | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-[150px]">
        <Modal open={open} closeModal={closeModal}>
          <EditModal closeModal={closeModal} meal={meal} />
        </Modal>
        <section className="bg-white flex flex-col py-20 justify-center items-center gap-6">
          <div className="flex flex-col items-center justify-center gap-10 max-w-[1500px] ">
            <h1 className="text-5xl text-center leading-tight">
              {meal && meal.strMeal}
            </h1>
            <div className="flex space-x-8 text-2xl items-center">
              <div className="flex space-x-2">
                <span>Category:</span>
                <Link
                  href={`/my-recipes`}
                  className="text-primary-normal hover:underline">
                  My Recipes
                </Link>
              </div>
              <div className="flex space-x-2">
                <MdOutlineModeEditOutline
                  className="text-5xl cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
                  onClick={openModal}
                />

                <MdDeleteOutline
                  className="text-5xl cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
                  onClick={handleDelete}
                />
              </div>
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
