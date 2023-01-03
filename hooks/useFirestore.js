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

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = () => {
  const [dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNotCancelled = action => {
    if (!isCancelled) dispatch(action);
  };

  const addRecipeToFirebase = async (doc, uploadType) => {
    if (uploadType === 'upload') dispatchIfNotCancelled({ type: 'IS_PENDING' });
    try {
      const addedDocument = await addDoc(collection(db, 'recipes'), {
        ...doc,
        createdAt: serverTimestamp(),
      });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  const deleteRecipe = async id => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });
    try {
      const deletedDoc = await deleteDoc(doc(db, 'recipes', id));
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: deletedDoc });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });
    try {
      const docRef = doc(db, 'recipes', id);
      const updatedDoc = await setDoc(docRef, {
        ...updatedRecipe,
        createdAt: serverTimestamp(),
      });
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDoc });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addRecipeToFirebase, deleteRecipe, updateRecipe };
};
