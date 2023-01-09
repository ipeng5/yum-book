import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { MdAdd } from 'react-icons/md';
import IngredientInput from './IngredientInput';
import MealImageInput from './MealImageInput';
import StepsInput from './StepsInput';
import { useFirestore } from '../../hooks/useFirestore';
import { useStorage } from '../../hooks/useStorage';
import { dummyImg } from '../../lib/dummyImg';

function AddRecipeForm({ uid }) {
  const router = useRouter();
  const [uploadedRecipe, setUploadedRecipe] = useState({
    category: 'uploads',
    strMeal: '',
    strMealThumb: '',
    ingredients: [],
    steps: [],
  });
  const [imgURL, setImgURL] = useState(dummyImg);
  const { addRecipeToUploads } = useFirestore();
  const { deleteImage } = useStorage();

  const handleTitleInput = e => {
    setUploadedRecipe(prevValues => ({
      ...prevValues,
      strMeal: e.target.value,
    }));
  };

  const handleAddIngredient = () => {
    if (uploadedRecipe.ingredients.length >= 20) return;
    setUploadedRecipe(preValues => ({
      ...preValues,
      ingredients: [...preValues.ingredients, { id: nanoid(), ingredient: '' }],
    }));
  };

  const handleChangeIngredient = (e, id) => {
    setUploadedRecipe(prevValues => {
      const updatedIngredients = prevValues.ingredients.map(ing => {
        if (ing.id === id) return { ...ing, ingredient: e.target.value.trim() };
        return ing;
      });
      return { ...prevValues, ingredients: updatedIngredients };
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
    if (uploadedRecipe.steps.length >= 20) return;
    setUploadedRecipe(preValues => ({
      ...preValues,
      steps: [...preValues.steps, { id: nanoid(), step: '' }],
    }));
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

  const handleRemoveStep = id => {
    setUploadedRecipe(preValues => {
      const updatedSteps = preValues.steps.filter(ing => ing.id !== id);
      return { ...preValues, steps: updatedSteps };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addRecipeToUploads({ ...uploadedRecipe, uid });
    router.push(`/my-recipes`);
  };

  const handleCancel = e => {
    e.preventDefault();
    router.push(`/my-recipes`);
    if (imgURL) deleteImage(imgURL);
  };

  useEffect(() => {
    setUploadedRecipe(prevValues => ({
      ...prevValues,
      strMealThumb: imgURL,
    }));
  }, [imgURL]);

  return (
    <form className="flex flex-col space-y-6 text-lg" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1">
        <p className="text-base lg:text-lg xl:text-xl font-semibold relative">
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
          maxLength="60"
          onChange={handleTitleInput}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-base lg:text-lg xl:text-xl font-semibold">
          Image
        </span>
        <MealImageInput setImgURL={setImgURL} />
      </label>
      <fieldset className="space-y-2">
        <legend className="flex w-full gap-2 items-center">
          <span className="w-24 lg:w-28 xl:w-[120px] text-base lg:text-lg xl:text-xl font-semibold">
            Ingredients
          </span>
          <div className="icon-add" onClick={handleAddIngredient}>
            <MdAdd />
          </div>
        </legend>
        {uploadedRecipe.ingredients.map((ing, index) => (
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
        <legend className="flex w-full gap-2 items-center">
          <span className="w-24 lg:w-28 xl:w-[120px] text-base lg:text-lg xl:text-x font-semibold">
            Instructions
          </span>
          <div className="icon-add" onClick={handleAddStep}>
            <MdAdd />
          </div>
        </legend>
        {uploadedRecipe.steps.map((step, index) => (
          <StepsInput
            key={step.id}
            step={step}
            index={index}
            handleChangeStep={handleChangeStep}
            handleRemoveStep={handleRemoveStep}
          />
        ))}
      </fieldset>
      <div className="flex m-auto space-x-4 lg:space-x-10">
        <button className="modal-button-light" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="modal-button-dark">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddRecipeForm;
