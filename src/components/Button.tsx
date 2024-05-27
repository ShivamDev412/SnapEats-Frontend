import React from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps {
  type?: "submit" | "button" | "reset";
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}
const Button = ({
  type = "button",
  disabled = false,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge(
        `bg-primary text-white rounded-md capitalize text-lg font-semibold disabled:bg-opacity-90 py-[6px] hover:opacity-90 transition-all flex justify-center items-end disabled:cursor-wait`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
