import { useReducer, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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

  const addRecipeToFirebase = async doc => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const addedDocument = await addDoc(collection(db, 'recipes'), {
        ...doc,
        createdAt: Timestamp.now(),
      });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  const deleteDoc = async id => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addRecipeToFirebase, deleteDoc };
};
