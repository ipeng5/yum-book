import { useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import { storage } from '../firebase/config';
import { dummyImg } from '../lib/dummyImg';

export const useStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const uploadImage = (acceptedFiles, setState) => {
    setStatusMsg(null);
    setIsUploading(true);
    if (acceptedFiles === null) {
      setStatusMsg('Please select an image first!');
      setIsUploading(false);
      return;
    }
    const imageUpload = acceptedFiles[0];

    if (
      imageUpload.type !== 'image/png' &&
      imageUpload.type !== 'image/jpg' &&
      imageUpload.type !== 'image/jpeg'
    ) {
      setStatusMsg('Accept only JPEG/PNG files');
      setIsUploading(false);
      return;
    } else if (imageUpload.size > 1024 * 1024) {
      setStatusMsg('Image must be < 1MB');
      setIsUploading(false);
      return;
    } else {
      setStatusMsg(null);
      const imageRef = ref(storage, `images/${imageUpload.name + nanoid()}`);

      uploadBytes(imageRef, imageUpload)
        .then(() => {
          getDownloadURL(imageRef).then(url => {
            setState(url);
            setIsUploading(false);
            setStatusMsg('Image uploaded!');
          });
        })
        .catch(err => {
          console.log(err.message);
          setIsUploading(false);
        });
    }
  };

  const deleteImage = imgURL => {
    if (imgURL === dummyImg) return;
    const desertRef = ref(storage, imgURL);
    deleteObject(desertRef).catch(err => {
      console.log(err.message);
      setIsUploading(false);
    });
  };

  return { uploadImage, deleteImage, isUploading, statusMsg };
};
