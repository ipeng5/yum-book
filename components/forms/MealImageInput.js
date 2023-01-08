import { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdUploadFile } from 'react-icons/md';
import { useStorage } from '../../hooks/useStorage';
import { storage } from '../../firebase/config';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

function MealImageInput({ setImgURL }) {
  const [files, setFiles] = useState([]);
  const { uploadImage, isUploading } = useStorage();
  const [imgUpload, setImgUpload] = useState(null);
  // const acceptStyle = {
  //   backgroundColor: '#eff9f6',
  // };

  // const rejectStyle = {
  //   borderColor: '#e6153d',
  //   backgroundColor: '#ffe8ec',
  // };

  // const { getRootProps, getInputProps, isDragAccept, isDragReject } =
  //   useDropzone({
  //     accept: { 'image/*': [] },
  //     onDrop: acceptedFiles => {
  //       setFiles(
  //         acceptedFiles.map(file =>
  //           Object.assign({
  //             preview: URL.createObjectURL(file),
  //           })
  //         )
  //       );
  //       uploadImage(acceptedFiles, setImgURL);
  //     },
  //   });

  // const style = useMemo(
  //   () => ({
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {}),
  //   }),
  //   [isDragAccept, isDragReject]
  // );

  // useEffect(() => {
  //   return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, []);

  const handleSubmit = e => {
    e.preventDefault();
    uploadImage(imgUpload, setImgURL);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        onChange={e => {
          setImgUpload(e.target.files);
        }}
      />
      <>
        {!isUploading && (
          <button
            className="py-1 w-20 xs:w-24 lg:w-36 bg-gray-600 text-white rounded text-xs xs:text-sm md:text-base xl:text-lg hover:bg-primary-dark text-center shadow-inner"
            onClick={handleSubmit}>
            Upload
          </button>
        )}
        {isUploading && (
          <button
            className="modal-button-dark"
            onClick={e => e.preventDefault()}>
            Uploading...
          </button>
        )}
      </>
    </div>
    // <div
    //   className="flex justify-center h-24 gap-4 items-center text-gray-500 bg-white border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-50 px-4"
    //   {...getRootProps({
    //     style,
    //   })}>
    //   {files[0] !== undefined && !isUploading && (
    //     <img
    //       src={files[0].preview}
    //       alt="Recipe image"
    //       onLoad={() => {
    //         URL.revokeObjectURL(files[0].preview);
    //       }}
    //       className="rounded w-24 h-16 object-cover"
    //     />
    //   )}
    //   <>
    //     <input {...getInputProps()} />
    //     {!isUploading && (
    //       <div className="flex gap-2 items-center">
    //         <MdUploadFile className="text-2xl xl:text-3xl text-gray-400" />
    //         <p className="text-xs lg:text-base">
    //           Drag and drop, or click to select an image
    //         </p>
    //       </div>
    //     )}
    //     {isUploading && (
    //       <p className="text-xs lg:text-base">Uploading image...</p>
    //     )}
    //   </>
    // </div>
  );
}

export default MealImageInput;
