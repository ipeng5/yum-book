function DetailsIngredients({ meal, getIngredientsMarkup }) {
  return (
    <section className="flex justify-center items-center px-10 lg:px-20 py-14 lg:py-20">
      <div className="content-width flex flex-col lg:flex-row items-center lg:items-start space-x-0 lg:space-x-10 2xl:space-x-20 justify-center ">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="object-cover w-full h-48 max-w-[400px] md:w-56 md:h-56 xl:w-72 xl:h-72 mb-10 lg:mb-0"
        />
        <div className="w-full">
          <h1 className="text-lg md:text-xl xl:text-2xl pb-4 md:pb-6 xl:pb-10 text-primary-normal">
            INGREDIENTS
          </h1>
          <ul className="text-base 2xl:text-lg grid md:grid-cols-2 gap-2 xl:gap-4">
            {getIngredientsMarkup()}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default DetailsIngredients;
