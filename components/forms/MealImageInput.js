import { useState } from 'react';
import { useStorage } from '../../hooks/useStorage';

function MealImageInput({ setImgURL }) {
  const [files, setFiles] = useState(null);
  const { uploadImage, isUploading, errorMsg } = useStorage();

  const handleSubmit = e => {
    e.preventDefault();
    uploadImage(files, setImgURL);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="block w-full text-xs xs:text-sm md:text-base text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
        type="file"
        onChange={e => {
          setFiles(e.target.files);
        }}
      />
      <div className="relative">
        {!isUploading && (
          <button
            className="py-1 w-full xs:w-32 bg-gray-600 text-white rounded text-xs xs:text-sm md:text-base  hover:bg-primary-dark text-center shadow-inner transition"
            onClick={handleSubmit}>
            Upload
          </button>
        )}
        {isUploading && (
          <button
            className="py-1 w-full xs:w-32 bg-primary-normal text-white rounded text-xs xs:text-sm md:text-base text-center shadow-inner"
            onClick={e => e.preventDefault()}>
            Uploading...
          </button>
        )}
        <span className="text-xs md:text-sm text-primary-normal absolute top-8 left-0 xs:top-2 xs:left-[140px]">
          {errorMsg}
        </span>
      </div>
    </div>
  );
}

export default MealImageInput;
