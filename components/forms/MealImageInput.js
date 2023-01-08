import { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdUploadFile } from 'react-icons/md';
import { useStorage } from '../../hooks/useStorage';

function MealImageInput({ setImgURL }) {
  const [files, setFiles] = useState(null);
  const { uploadImage, isUploading } = useStorage();

  const handleSubmit = e => {
    e.preventDefault();
    uploadImage(files, setImgURL);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        class="block w-full text-xs xs:text-sm md:text-base text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
        type="file"
        onChange={e => {
          setFiles(e.target.files);
        }}
      />
      <>
        {!isUploading && (
          <button
            className="py-1 w-full xs:w-32 bg-gray-600 text-white rounded text-xs xs:text-sm md:text-base  hover:bg-primary-dark text-center shadow-inner transition"
            onClick={handleSubmit}>
            Upload
          </button>
        )}
        {isUploading && (
          <button
            className="py-1 w-full xs:w-32  bg-primary-normal text-white rounded text-xs xs:text-sm md:text-base text-center shadow-inner"
            onClick={e => e.preventDefault()}>
            Uploading...
          </button>
        )}
      </>
    </div>
  );
}

export default MealImageInput;
