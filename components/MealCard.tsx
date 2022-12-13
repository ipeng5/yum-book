// import Link from 'next/link';
import { Meal } from '../typings';

interface Props {
  meal: Meal;
  id: string;
}

function MealCard({ meal, id }: Props) {
  return (
    <article className="shadow-lg cursor-pointer rounded-md overflow-hidden hover:text-primary-normal transition duration-300 hover:scale-[1.03] ">
      <div className=" overflow-hidden h-[250px] relative">
        <img
          src={meal.strMealThumb}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute h-full w-full top-0 bg-black opacity-30 pointer-events-none"></div>
      </div>
      <div className="p-4 text-lg h-[120px] relative ">
        <span className="absolute top-1/2 -translate-y-[50%]">
          {meal.strMeal}
        </span>
      </div>
    </article>
  );
}

export default MealCard;
