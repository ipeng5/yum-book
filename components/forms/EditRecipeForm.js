import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { MdAdd } from 'react-icons/md';
import IngredientInput from './IngredientInput';
import StepsInput from './StepsInput';
import MealImageInput from './MealImageInput';
import { useStorage } from '../../hooks/useStorage';
import { useFirestore } from '../../hooks/useFirestore';

function AddRecipeForm({ meal, closeModal, uid }) {
  const [updatedRecipe, setUpdatedRecipe] = useState({
    category: 'uploads',
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    ingredients: meal.ingredients,
    steps: meal.steps,
  });
  const [imgURL, setImgURL] = useState(meal.strMealThumb);
  const { deleteImage } = useStorage();
  const { updateRecipe } = useFirestore();
  const router = useRouter();
  const { id } = router.query;

  const handleTitleInput = e => {
    setUpdatedRecipe(prevValues => ({
      ...prevValues,
      strMeal: e.target.value,
    }));
  };

  const handleAddIngredient = () => {
    if (updatedRecipe.ingredients.length >= 20) return;
    setUpdatedRecipe(preValues => ({
      ...preValues,
      ingredients: [...preValues.ingredients, { id: nanoid(), ingredient: '' }],
    }));
  };

  const handleChangeIngredient = (e, id) => {
    setUpdatedRecipe(prevValues => {
      const updatedIngredients = prevValues.ingredients.map(ing => {
        if (ing.id === id) return { ...ing, ingredient: e.target.value };
        return ing;
      });
      return { ...prevValues, ingredients: updatedIngredients };
    });
  };

  const handleChangeStep = (e, id) => {
    setUpdatedRecipe(prevValues => {
      const updatedSteps = prevValues.steps.map(step => {
        if (step.id === id) return { ...step, step: e.target.value };
        return step;
      });
      return { ...prevValues, steps: updatedSteps };
    });
  };

  const handleRemoveIngredient = id => {
    setUpdatedRecipe(preValues => {
      const updatedIngredients = preValues.ingredients.filter(
        ing => ing.id !== id
      );
      return { ...preValues, ingredients: updatedIngredients };
    });
  };

  const handleAddStep = () => {
    if (updatedRecipe.steps.length >= 20) return;
    setUpdatedRecipe(preValues => ({
      ...preValues,
      steps: [...preValues.steps, { id: nanoid(), step: '' }],
    }));
  };

  const handleRemoveStep = id => {
    setUpdatedRecipe(preValues => {
      const updatedSteps = preValues.steps.filter(ing => ing.id !== id);
      return { ...preValues, steps: updatedSteps };
    });
  };

  const handleCancel = e => {
    e.preventDefault();
    closeModal();
    if (imgURL && imgURL !== meal.strMealThumb) deleteImage(imgURL);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateRecipe(id, { ...updatedRecipe, uid });
    closeModal();
    deleteImage(meal.strMealThumb);
  };

  useEffect(() => {
    setUpdatedRecipe(prevValues => ({
      ...prevValues,
      strMealThumb: imgURL,
    }));
  }, [imgURL]);

  return (
    <form
      className="flex flex-col space-y-6 text-lg w-full"
      onSubmit={e => e.preventDefault()}>
      <label className="flex flex-col gap-1">
        <p className="w-24 lg:w-28 xl:w-[120px] text-base lg:text-lg xl:text-x font-semibold">
          Title
          <span className="text-primary-normal text-base xl:text-xl absolute -translate-y-[10px]">
            ∗
          </span>
        </p>

        <input
          type="text"
          required
          className="form-input"
          name="strMeal"
          value={updatedRecipe.strMeal}
          maxLength="60"
          onChange={handleTitleInput}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="w-24 lg:w-28 xl:w-[120px] text-base lg:text-lg xl:text-x font-semibold">
          Image
        </span>
        <MealImageInput setImgURL={setImgURL} />
      </label>
      <fieldset className="space-y-2">
        <legend className="flex gap-2 items-center text-xl">
          <span className="w-24 lg:w-28 xl:w-[120px] text-base lg:text-lg xl:text-x font-semibold">
            Ingredients
          </span>
          <div className="icon-add" onClick={handleAddIngredient}>
            <MdAdd />
          </div>
        </legend>
        {updatedRecipe.ingredients.map((ing, index) => (
          <IngredientInput
            key={ing.id}
            index={index}
            ing={ing}
            handleChangeIngredient={handleChangeIngredient}
            handleRemoveIngredient={handleRemoveIngredient}
          />
        ))}
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="flex gap-2 items-center text-xl">
          <span className="w-24 lg:w-28 xl:w-[120px] text-base lg:text-lg xl:text-x font-semibold">
            Instructions
          </span>
          <div className="icon-add" onClick={handleAddStep}>
            <MdAdd />
          </div>
        </legend>
        {updatedRecipe.steps.map((step, index) => (
          <StepsInput
            key={step.id}
            step={step}
            index={index}
            handleChangeStep={handleChangeStep}
            handleRemoveStep={handleRemoveStep}
          />
        ))}
      </fieldset>
      <div className="flex m-auto space-x-4 lg:space-x-10 !mt-10">
        <button className="modal-button-light" onClick={handleCancel}>
          Cancel
        </button>
        <button className="modal-button-dark" onClick={handleSubmit}>
          Edit
        </button>
      </div>
    </form>
  );
}

export default AddRecipeForm;
