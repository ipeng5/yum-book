import { useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import { storage } from '../firebase/config';
import { dummyImg } from '../lib/dummyImg';

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

    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then(url => {
        setState(url);
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
