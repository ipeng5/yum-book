import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

export const useRecipe = () => {
  const context = useContext(RecipeContext);

  return context;
};
