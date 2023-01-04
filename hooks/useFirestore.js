import { useReducer, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

export const useFirestore = () => {
  const addRecipeToUploads = async doc => {
    try {
      console.log(doc);
      await addDoc(collection(db, 'recipes'), {
        ...doc,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const addRecipeToFavorites = async doc => {
    try {
      await addDoc(collection(db, 'favorites'), {
        ...doc,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  const deleteMyRecipe = async id => {
    try {
      await deleteDoc(doc(db, 'recipes', id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteFavRecipe = async id => {
    try {
      await deleteDoc(doc(db, 'favorites', id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      const docRef = doc(db, 'recipes', id);
      await setDoc(docRef, {
        ...updatedRecipe,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    addRecipeToUploads,
    addRecipeToFavorites,
    deleteMyRecipe,
    deleteFavRecipe,
    updateRecipe,
  };
};
