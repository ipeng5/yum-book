import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const useCollection = (category, user) => {
  if (!user) return [];
  const [documents, setDocuments] = useState(null);
  useEffect(() => {
    const collRef = collection(db, 'recipes');
    const userColl = query(collRef, where('uid', '==', user.uid));
    const userDocs = query(userColl, where('category', '==', category));

    const unsubscribe = onSnapshot(userDocs, snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), idDoc: doc.id });
      });
      setDocuments(results);
    });

    return () => unsubscribe();
  }, []);
  return { documents };
};
