/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type InputProps = {
  id: string;
  register: any;
  errors: any;
};
const FileUpload: FC<
  InputProps & {
    className?: string;
    title?: string;
    control: Control<any>;
  }
> = ({ id, register, errors, className, title, control }) => {
  const [previewURL, setPreviewURL] = useState<string | null>("");
  const file = useWatch({
    control,
    name: id,
  });
  useEffect(() => {
    if (typeof file === "string") {
      setPreviewURL(file);
    } else if (file instanceof File) {
      setPreviewURL(URL.createObjectURL(file));
    } else if (file === null) {
      setPreviewURL(null);
    }
  }, [file]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e?.target?.files[0];
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setPreviewURL(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-2 w-full">
        <label
          htmlFor="file-upload"
          className={twMerge(
            "w-full h-[2in] border-dashed border-2 border-gray-300 flex justify-center items-center relative",
            className
          )}
        >
          {previewURL && previewURL.length ? (
            <img
              src={previewURL}
              alt="Preview"
              className={twMerge("absolute inset-0 w-full h-full", className)}
            />
          ) : (
            <div className="flex items-center justify-center flex-col">
              <FaCloudUploadAlt className="w-20 h-20 fill-gray-500" />
              <span className="text-center text-gray-500 text-[1rem]">
                {title ? title : "Click to upload"}
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            id={id}
            multiple={false}
            {...register(id, {
              onChange: handleFileChange,
            })}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
        </label>
      </div>
      {typeof errors[id] === "string" ? (
        <p className="text-red-700 text-[1rem] italic mt-1">{errors[id]}</p>
      ) : (
        errors[id] && <p className="text-red-700 text-[1rem] italic mt-1">{errors[id].message}</p>
      )}
    </div>
  );
};

export default FileUpload;
