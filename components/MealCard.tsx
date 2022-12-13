// import Link from 'next/link';
import Link from 'next/link';
import { Meal } from '../typings';

interface Props {
  meal: Meal;
  id: string;
}

function MealCard({ meal }: Props) {
  return (
    <Link
      href={`/recipe/${meal.idMeal}`}
      className="shadow-lg cursor-pointer rounded-md overflow-hidden transition duration-300 hover:scale-[1.03] ">
      <div className=" overflow-hidden h-[250px] relative">
        <img
          src={meal.strMealThumb}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute h-full w-full top-0 bg-black opacity-30 pointer-events-none"></div>
      </div>
      <div className="h-[120px] relative ">
        <span className="absolute top-1/2 -translate-y-[50%] p-4 text-lg">
          {meal.strMeal}
        </span>
      </div>
    </Link>
  );
}

export default MealCard;
