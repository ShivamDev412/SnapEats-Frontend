import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface SelectFieldProps {
  placeholder: string;
  defaultValue: string;
  customClasses?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: Array<{
    value: string;
    label: string;
  }>;
}

const SimpleSelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  defaultValue,
  onChange,
  data,
  customClasses,
}) => {
  const [value, setSelectField] = useState("");
  useEffect(() => {
    defaultValue && setSelectField(defaultValue);
  }, [defaultValue]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectField(e.target.value);
    onChange(e);
  };
  return (
    <div className="w-full mx-auto">
      <div
        className={twMerge(
          `relative flex items-center bg-transparent text-zinc-950 border border-zinc-400 rounded py-4 px-3 text-lg leading-tight hover:border-zinc-950 focus-within:border-zinc-950`,
          customClasses
        )}
      >
        <select
          className="appearance-none w-full bg-transparent focus:outline-none"
          value={value}
          onChange={handleChange}
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
    </div>
  );
};

export default SimpleSelectField;
