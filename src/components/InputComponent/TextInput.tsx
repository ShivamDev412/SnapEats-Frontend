import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  id: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type: "text" | "email" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  placeholder,
  register,
  errors,
  type,
  onChange,
}) => {
  return (
    <div className="w-full mx-auto">
      <div className="">
        <input
          className={`appearance-none block w-full bg-transparent text-zinc-950 border ${
            errors[id] ? "border-red-700" : "border-zinc-400"
          } rounded py-4 px-3 text-lg leading-tight hover:border-zinc-950 focus:outline-none focus:border-zinc-950`}
          id={id}
          type={type}
          min={0}
          step={"any"}
          placeholder={placeholder}
          {...register(id, {
            onChange,
          })}
        />
        {errors[id] && (
          <p className=" text-red-700 text-[1rem] italic mt-1">
            {String(errors[id]?.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
