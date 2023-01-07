function IngredientInput({
  ing,
  index,
  handleChangeIngredient,
  handleRemoveIngredient,
}) {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-6 md:w-36 text-gray-400 text-sm md:text-base xl:text-lg">
        <span className="hidden md:inline">Ingredient</span>&nbsp;&nbsp;
        {index + 1}
      </div>
      <input
        type="text"
        value={ing.ingredient}
        maxLength="100"
        className="w-full form-input"
        onChange={e => handleChangeIngredient(e, ing.id)}
      />
      <div
        className="icon-remove"
        onClick={e => {
          handleRemoveIngredient(ing.id);
        }}>
        ×
      </div>
    </div>
  );
}

export default IngredientInput;
