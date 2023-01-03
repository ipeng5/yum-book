import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

export const useUploadCollection = user => {
  if (!user) return [];
  const [uploadedDocs, setUploadedDocs] = useState(null);

  useEffect(() => {
    const collRef = collection(db, 'recipes');
    const userColl = query(collRef, where('uid', '==', user.uid));
    const userDocs = query(userColl, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(userDocs, snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), idDoc: doc.id });
      });
      setUploadedDocs(results);
    });

    return () => unsubscribe();
  }, [db]);

  return { uploadedDocs };
};
