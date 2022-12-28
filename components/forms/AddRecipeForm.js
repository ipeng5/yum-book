import { MdAdd } from 'react-icons/md';
import { useFirestore } from '../../hooks/useFirestore';
import { useState } from 'react';
import { nanoid } from 'nanoid';

function AddRecipeForm() {
  const [uploadedRecipe, setUploadedRecipe] = useState({
    category: 'uploads',
    title: '',
    url: '',
    ingredients: [],
    steps: [],
  });
  const { addRecipeToFirebase, response } = useFirestore();

  const handleInput = e => {
    setUploadedRecipe(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddIngredient = () => {
    setUploadedRecipe(preValues => ({
      ...preValues,
      ingredients: [...preValues.ingredients, { id: nanoid(), ingredient: '' }],
    }));
  };

  const handleChangeIngredient = (e, id) => {
    setUploadedRecipe(prevValues => {
      const updatedIngredients = prevValues.ingredients.map(ing => {
        if (ing.id === id) return { ...ing, ingredient: e.target.value };
        return ing;
      });
      return { ...prevValues, ingredients: updatedIngredients };
    });
  };

  const handleChangeStep = (e, id) => {
    setUploadedRecipe(prevValues => {
      const updatedSteps = prevValues.steps.map(step => {
        if (step.id === id) return { ...step, step: e.target.value };
        return step;
      });
      return { ...prevValues, steps: updatedSteps };
    });
  };

  const handleRemoveIngredient = id => {
    setUploadedRecipe(preValues => {
      const updatedIngredients = preValues.ingredients.filter(
        ing => ing.id !== id
      );
      return { ...preValues, ingredients: updatedIngredients };
    });
  };

  const handleAddStep = () => {
    setUploadedRecipe(preValues => ({
      ...preValues,
      steps: [...preValues.steps, { id: nanoid(), step: '' }],
    }));
  };

  const handleRemoveStep = id => {
    setUploadedRecipe(preValues => {
      const updatedSteps = preValues.steps.filter(ing => ing.id !== id);
      return { ...preValues, steps: updatedSteps };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(uploadedRecipe);
    // addRecipeToFirebase(uploadedRecipe);
  };

  return (
    <form className="flex flex-col space-y-6 text-lg" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1">
        <span className="text-xl font-semibold">Title</span>
        <input
          type="text"
          required
          className="form-input"
          name="title"
          onChange={handleInput}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xl font-semibold">Image URL</span>
        <input
          type="text"
          className="form-input"
          name="url"
          onChange={handleInput}
        />
      </label>
      <fieldset className="space-y-2">
        <legend className="flex gap-2 items-center text-xl">
          <span className="w-[120px] font-semibold">Ingredients</span>
          <div className="icon-add" onClick={handleAddIngredient}>
            <MdAdd />
          </div>
        </legend>
        {uploadedRecipe.ingredients.map((ing, index) => (
          <div className="flex gap-2 items-center" key={nanoid()}>
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
        ))}
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="flex gap-2 items-center text-xl">
          <span className="w-[120px] font-semibold">Directions</span>
          <div className="icon-add" onClick={handleAddStep}>
            <MdAdd />
          </div>
        </legend>
        {uploadedRecipe.steps.map((step, index) => (
          <div className="flex gap-2 items-center" key={nanoid()}>
            <span className="w-20 text-gray-400">
              Step&nbsp;&nbsp;{index + 1}
            </span>
            <input
              type="text"
              className="w-full form-input"
              onChange={e => handleChangeStep(e, step.id)}
            />
            <div
              className="icon-remove"
              onClick={e => {
                handleRemoveStep(step.id);
              }}>
              <span>×</span>
            </div>
          </div>
        ))}
      </fieldset>
      <button type="submit" className="form-button w-1/3 m-auto">
        Upload
      </button>
    </form>
  );
}

export default AddRecipeForm;
