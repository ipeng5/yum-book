function IngredientInput({
  ing,
  index,
  handleChangeIngredient,
  handleRemoveIngredient,
}) {
  return (
    <div className="flex gap-2 items-center">
      <span className="w-36 text-gray-400">
        Ingredient&nbsp;&nbsp;{index + 1}
      </span>
      <input
        type="text"
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
