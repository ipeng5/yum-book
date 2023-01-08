import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAsg7vjdsS8rgOp0sugOxY0LqiGNTQcVgs',
  authDomain: 'yum-book.firebaseapp.com',
  projectId: 'yum-book',
  storageBucket: 'yum-book.appspot.com',
  messagingSenderId: '459996699090',
  appId: '1:459996699090:web:0687cda538172bc053900b',
};

const app =initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage };
