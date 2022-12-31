import Link from 'next/link';

function MealCard({ meal }) {
  return (
    <Link
      href={
        meal.category === 'uploads'
          ? `/my-recipes/${meal.idDoc}`
          : `/recipes/${meal.idMeal}`
      }
      className="shadow-md cursor-pointer rounded-md overflow-hidden transition duration-300 hover:scale-[1.03] hover:shadow-xl">
      <div className=" overflow-hidden h-[250px] relative">
        <img
          src={meal.strMealThumb}
          alt=""
          className="object-cover w-full h-full"
        />
        {meal.category !== 'uploads' && (
          <div className="absolute h-full w-full top-0 bg-black opacity-30 pointer-events-none"></div>
        )}
      </div>
      <div className="h-[120px] relative">
        <span className="absolute top-1/2 -translate-y-[50%] p-4 text-lg">
          {meal.strMeal}
        </span>
      </div>
    </Link>
  );
}

export default MealCard;
