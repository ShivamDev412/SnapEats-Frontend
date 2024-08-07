/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SelectFieldProps {
  id: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  getValues?: any;
  setValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: Array<{
    value: string;
    label: string;
  }>;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  placeholder,
  register,
  errors,
  onChange,
  data,
  getValues,
}) => {
  const [value, setSelectField] = useState("");

  useEffect(() => {
    if (getValues) {
      const initialValue = getValues(id);
      if (initialValue) {
        setSelectField(initialValue);
      }
    }
  }, [getValues, id]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e);
    setSelectField(e.target.value);
  };
  return (
    <div className="w-full mx-auto">
      <div
        className={`relative flex items-center bg-transparent text-zinc-950 border ${
          errors[id] ? "border-red-700" : "border-zinc-400"
        } rounded py-4 px-3 text-lg leading-tight hover:border-zinc-950 focus-within:border-zinc-950`}
      >
        <select
          className="appearance-none w-full bg-transparent focus:outline-none"
          id={id}
          {...(getValues && { value })}
          {...register(id, {
            onChange: handleChange,
            value,
          })}
        >
          <option value="" disabled className="bg-white text-zinc-950">
            {placeholder}
          </option>
          {data?.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="bg-white text-zinc-950"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-zinc-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {errors[id] && (
        <p className="text-red-700 text-[1rem] italic mt-1">
          {String(errors[id]?.message)}
        </p>
      )}
    </div>
  );
};

export default SelectField;
