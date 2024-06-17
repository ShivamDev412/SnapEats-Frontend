import React from "react";
import { FieldErrors, UseFormRegister, useWatch, Control } from "react-hook-form";

interface ToggleInputProps {
  id: string;
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  id,
  control,
  register,
  errors,
  onChange,
  label,
}) => {
  const isChecked = useWatch({ control, name: id });

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center">
        <label htmlFor={id} className="mr-2 text-lg">
          {label}
        </label>
        <input
          className="appearance-none hidden"
          id={id}
          type="checkbox"
          {...register(id, { onChange })}
        />
        <label
          htmlFor={id}
          className="relative inline-block w-12 h-6 cursor-pointer"
        >
          <span
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${
              isChecked ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span
            className={`absolute left-0 top-0 bottom-0 m-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
              isChecked ? "translate-x-6" : ""
            }`}
          ></span>
        </label>
        {errors[id] && (
          <p className="text-red-700 text-[1rem] italic mt-1">
            {String(errors[id]?.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ToggleInput;
