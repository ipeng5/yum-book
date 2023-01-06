function DetailsIngredients({ meal, getIngredientsMarkup }) {
  return (
    <section className="flex flex-col lg:flex-row items-center space-x-20 justify-center p-20">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="object-cover w-full h-48 lg:w-72 lg:h-72 xl:w-96 xl:h-96 mb-10"
      />
      <div className="w-full">
        <h1 className="text-base md:text-lg lg:text-xl xl:text-3xl pb-10 text-primary-normal">
          INGREDIENTS
        </h1>
        <ul className="text-sm lg:text-base xl:text-xl grid grid-cols-2 gap-4">
          {getIngredientsMarkup()}
        </ul>
      </div>
    </section>
  );
}

export default DetailsIngredients;
