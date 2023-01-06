import Link from 'next/link';

function MealCard({ meal }) {
  return (
    <Link
      href={
        meal.category === 'uploads'
          ? `/my-recipes/${meal.idDoc}`
          : `/recipes/${meal.idMeal}`
      }
      className="shadow-lg cursor-pointer rounded-md overflow-hidden transition duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className=" overflow-hidden h-36 lg:h-40 xl:h-44 relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="object-cover w-full h-full"
        />
        {meal.category !== 'uploads' && (
          <div className="absolute h-full w-full top-0 bg-black opacity-30 pointer-events-none"></div>
        )}
      </div>
      <div className="h-20 relative">
        <span className="absolute top-1/2 -translate-y-[50%] p-4 text-base lg:text-lg">
          {meal.strMeal.length > 50
            ? `${meal.strMeal.substring(0, 45)}...`
            : meal.strMeal}
        </span>
      </div>
    </Link>
  );
}

export default MealCard;
