import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFavCollection = user => {
  if (!user) return [];
  const [favDocs, setFavDocs] = useState(null);

  useEffect(() => {
    const collRef = collection(db, 'favorites');
    const userColl = query(collRef, where('uid', '==', user.uid));
    const userDocs = query(userColl, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(userDocs, snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), idDoc: doc.id });
      });
      setFavDocs(results);
    });

    return () => unsubscribe();
  }, [db]);

  return { favDocs };
};
