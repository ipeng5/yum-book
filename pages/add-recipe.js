import { clearPreviewData } from 'next/dist/server/api-utils';
import Head from 'next/head';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { BsCheck2 } from 'react-icons/bs';

import { nanoid } from 'nanoid';

function AddRecipe() {
  const [uploadedRecipes, setUploadedRecipes] = useState({
    title: '',
    url: '',
    ingredients: [{ id: nanoid(), ingredient: '' }],
    steps: [{ id: nanoid(), step: '' }],
  });

  const handleAddIngredient = () => {
    setUploadedRecipes(prevData => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { id: nanoid(), ingredient: '' }],
    }));
  };

  const handleRemoveIngredient = id => {
    setUploadedRecipes(prevData => {
      const updatedIngredients = prevData.ingredients.filter(
        ing => ing.id !== id
      );
      return { ...prevData, ingredients: updatedIngredients };
    });
  };
  const handleAddStep = () => {
    setUploadedRecipes(prevData => ({
      ...prevData,
      steps: [...prevData.steps, { id: nanoid(), step: '' }],
    }));
  };

  const handleRemoveStep = id => {
    setUploadedRecipes(prevData => {
      const updatedSteps = prevData.steps.filter(ing => ing.id !== id);
      return { ...prevData, steps: updatedSteps };
    });
  };

  return (
    <>
      <Head>
        <title>Add Recipe | Yum Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[calc(100vh-300px)] my-[26px] mx-4 flex justify-center items-center">
        <div className="bg-white rounded space-y-10 shadow-md w-[1200px] p-14">
          <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4">
            ADD RECIPE
          </h2>
          <form className="flex flex-col space-y-6 text-lg">
            <label className="flex flex-col gap-1">
              <span className="text-xl font-semibold">Title</span>
              <input type="text" required className="form-input" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xl font-semibold">Image URL</span>
              <input type="text" required className="form-input" />
            </label>
            <fieldset className="space-y-2">
              <legend className="flex gap-2 items-center text-xl">
                <span className="w-[120px] font-semibold">Ingredients</span>
                <div className="icon-add" onClick={handleAddIngredient}>
                  <MdAdd />
                </div>
              </legend>
              {uploadedRecipes.ingredients.map((ing, index) => (
                <div className="flex gap-2 items-center">
                  <span className="w-36 text-gray-400">
                    Ingredient&nbsp;&nbsp;{index + 1}
                  </span>
                  <input type="text" className="w-full form-input" />
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
              {uploadedRecipes.steps.map((step, index) => (
                <div className="flex gap-2 items-center">
                  <span className="w-20 text-gray-400">
                    Step&nbsp;&nbsp;{index + 1}
                  </span>
                  <input type="text" className="w-full form-input" />
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
              UPLOAD
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddRecipe;
