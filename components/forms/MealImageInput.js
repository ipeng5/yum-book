import { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStorage } from '../../hooks/useStorage';
import { MdUploadFile } from 'react-icons/md';

function MealImageInput({ setImgURL }) {
  const [files, setFiles] = useState([]);
  const { uploadImage } = useStorage();

  const acceptStyle = {
    backgroundColor: '#eff9f6',
  };

  const rejectStyle = {
    borderColor: '#e6153d',
    backgroundColor: '#ffe8ec',
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: { 'image/*': [] },
      onDrop: acceptedFiles => {
        setFiles(
          acceptedFiles.map(file =>
            Object.assign({
              preview: URL.createObjectURL(file),
            })
          )
        );
        uploadImage(acceptedFiles, setImgURL, 'Images');
      },
    });

  const style = useMemo(
    () => ({
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragReject]
  );

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div
      className="flex justify-center h-24 gap-4 items-center text-gray-500 bg-white border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-50"
      {...getRootProps({
        style,
      })}>
      {files[0] !== undefined && (
        <img
          src={files[0].preview}
          alt=""
          onLoad={() => {
            URL.revokeObjectURL(files[0].preview);
          }}
          className="rounded w-24 h-16 object-cover"
        />
      )}
      <div className="flex gap-2">
        <input {...getInputProps()} />
        <MdUploadFile className="text-3xl text-gray-400" />
        <p>Drag and drop, or click to select an image</p>
      </div>
    </div>
  );
}

export default MealImageInput;
