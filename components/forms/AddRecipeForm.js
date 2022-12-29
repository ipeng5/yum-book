import { useFirestore } from '../../hooks/useFirestore';
import { useEffect, useState } from 'react';
import IngredientInput from './IngredientInput';
import StepsInput from './StepsInput';
import MealImageInput from './MealImageInput';
import { nanoid } from 'nanoid';
import { MdAdd } from 'react-icons/md';

function AddRecipeForm() {
  const [uploadedRecipe, setUploadedRecipe] = useState({
    category: 'uploads',
    title: '',
    url: '',
    ingredients: [],
    ingredients: [],
    steps: [],
  });
  const [imgURL, setImgURL] = useState(
    'https://firebasestorage.googleapis.com/v0/b/yum-book.appspot.com/o/Images%2Fdummy-img.ico?alt=media&token=f583921b-8dd7-4a8b-8dfe-8ad3addc43ce'
  );

  const { addRecipeToFirebase, response } = useFirestore();

  const handleTitleInput = e => {
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

  useEffect(() => {
    setUploadedRecipe(prevValues => ({
      ...prevValues,
      url: imgURL,
    }));
  }, [imgURL]);

  const handleSubmit = e => {
    e.preventDefault();
    addRecipeToFirebase(uploadedRecipe);
  };

  return (
    <form className="flex flex-col space-y-6 text-lg" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1">
        <p className="text-xl font-semibold relative">
          Title
          <span className="text-primary-normal text-2xl absolute -translate-y-[10px]">
            ∗
          </span>
        </p>

        <input
          type="text"
          required
          className="form-input"
          name="title"
          onChange={handleTitleInput}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xl font-semibold">Image</span>
        <MealImageInput
          setImgURL={setImgURL}
          setUploadedRecipe={setUploadedRecipe}
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
          <span className="w-[120px] font-semibold">Directions</span>
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
      <button type="submit" className="form-button w-1/3 m-auto">
        Add
      </button>
    </form>
  );
}

export default AddRecipeForm;
