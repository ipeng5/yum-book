import { clearPreviewData } from 'next/dist/server/api-utils';
import Head from 'next/head';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { nanoid } from 'nanoid';

function AddRecipe() {
  const [uploadedRecipes, setUploadedRecipes] = useState({
    title: '',
    url: '',
    ingredients: [],
    steps: [],
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
      <main className="flex justify-center items-center min-h-[calc(100vh-250px)]">
        <div className="bg-white rounded space-y-10 shadow-md w-[500px] p-14">
          <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4">
            ADD RECIPE
          </h2>
          <form className="flex flex-col space-y-6 text-lg">
            <label className="flex flex-col gap-1">
              <span className="text-xl">Title</span>
              <input
                type="text"
                required
                className="border-2 border-gray-200 rounded p-2 outline-primary-medium"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xl">Image URL</span>
              <input
                type="text"
                required
                className="border-2 border-gray-200 rounded p-2 outline-primary-medium"
              />
            </label>
            <fieldset className="space-y-2">
              <legend className="flex gap-4 items-center text-xl">
                <span>Ingredients</span>
                <IoMdAdd
                  className="text-white bg-primary-normal rounded hover:opacity-90 transition cursor-pointer"
                  onClick={handleAddIngredient}
                />
              </legend>
              {uploadedRecipes.ingredients.map(ing => (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 rounded p-2 outline-primary-medium"
                  />
                  <div
                    className="text-3xl bg-transparent font-thin hover:text-primary-normal transition cursor-pointer"
                    onClick={e => {
                      handleRemoveIngredient(ing.id);
                    }}>
                    ×
                  </div>
                </div>
              ))}
            </fieldset>
            <fieldset className="space-y-2">
              <legend className="flex gap-4 items-center text-xl">
                <span>Instructions</span>
                <IoMdAdd
                  className="text-white bg-primary-normal rounded hover:opacity-90 transition cursor-pointer"
                  onClick={handleAddStep}
                />
              </legend>
              {uploadedRecipes.steps.map(step => (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 rounded p-2 outline-primary-medium"
                  />
                  <div
                    className="text-3xl bg-transparent font-thin hover:text-primary-normal transition cursor-pointer"
                    onClick={e => {
                      handleRemoveStep(step.id);
                    }}>
                    ×
                  </div>
                </div>
              ))}
            </fieldset>
            <button type="submit" className="form-button">
              Upload
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddRecipe;
