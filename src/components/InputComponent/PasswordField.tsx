import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PasswordFieldProps {
  id: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  placeholder,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-full mx-auto">
      <div
        className={`relative flex items-center bg-transparent text-zinc-950 border ${
          errors[id] ? "border-red-700" : "border-zinc-400"
        } rounded py-4 px-3 text-lg leading-tight hover:border-zinc-950 focus-within:border-zinc-950`}
      >
        <input
          className="appearance-none w-full bg-transparent focus:outline-none"
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(id)}
        />
        <div className="ml-2 cursor-pointer" onClick={togglePasswordVisibility}>
          {!showPassword ? (
            <IoEyeOff className="text-zinc-700 h-6 w-6" />
          ) : (
            <IoEye className="text-zinc-700 h-6 w-6" />
          )}
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

export default PasswordField;
