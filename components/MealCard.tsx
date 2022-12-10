// import Link from 'next/link';
import { Meal } from '../typings';

interface Props {
  meal: Meal;
}

function MealCard({ meal }: Props) {
  return (
    <article className="shadow-xl cursor-pointer rounded-md overflow-hidden hover:text-primary-normal transition duration-300">
      <div className=" overflow-hidden h-[250px] relative">
        <img
          src={meal.strMealThumb}
          alt=""
          className="object-cover w-full h-full hover:scale-110 transition duration-500"
        />
        <div className="absolute h-full w-full top-0 bg-black opacity-30 pointer-events-none"></div>
      </div>
      <div className="px-4 py-4 text-xl h-[120px] relative ">
        <span className="absolute top-1/2 -translate-y-[50%]">{meal.strMeal}</span>
      </div>
    </article>
  );
}

export default MealCard;
