function DetailsIngredients({ meal, getIngredientsMarkup }) {
  return (
    <section className="flex gap-20 justify-center p-20">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="object-cover w-96"
      />
      <div>
        <h1 className="text-3xl  pb-10 text-primary-normal">INGREDIENTS</h1>
        <ul className="text-xl grid grid-cols-2 gap-4">
          {getIngredientsMarkup()}
        </ul>
      </div>
    </section>
  );
}

export default DetailsIngredients;
