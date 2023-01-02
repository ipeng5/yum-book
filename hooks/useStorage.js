import { storage } from '../firebase/config';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';
import { dummyImg } from '../lib/dummyImg';
import { nanoid } from 'nanoid';

export const useStorage = () => {
  const uploadImage = (acceptedFiles, setState, uploadFolder) => {
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

  return { uploadImage, deleteImage };
};
