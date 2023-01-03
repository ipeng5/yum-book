import { useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebase/config';
import { dummyImg } from '../lib/dummyImg';
import { nanoid } from 'nanoid';


export const useStorage = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = (acceptedFiles, setState, uploadFolder) => {
    setIsUploading(true);
    const imageUpload = acceptedFiles[0];
    if (imageUpload === null) return;
    const imageRef = ref(
      storage,
      `${uploadFolder}/${imageUpload.name + nanoid()}`
    );
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);

    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setState(downloadURL);
        setIsUploading(false);
      });
    });
  };

  const deleteImage = imgURL => {
    if (imgURL === dummyImg) return;
    const desertRef = ref(storage, imgURL);
    deleteObject(desertRef).catch(err => {
      console.log(err.message);
    });
  };

  return { uploadImage, deleteImage, isUploading };
};
