import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextareaFieldProps {
  id: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className="w-full mx-auto">
      <div
        className={`relative flex items-center bg-transparent text-zinc-950 border ${
          errors[id] ? "border-red-700" : "border-zinc-400"
        } rounded py-4 px-3 text-lg leading-tight hover:border-zinc-950 focus-within:border-zinc-950`}
      >
        <textarea
          className="appearance-none w-full bg-transparent focus:outline-none resize-none"
          id={id}
          placeholder={placeholder}
          rows={6}
          {...register(id)}
        />
      </div>
      {errors[id] && (
        <p className="text-red-700 text-[1rem] italic mt-1">
          {String(errors[id]?.message)}
        </p>
      )}
    </div>
  );
};

export default TextareaField;
