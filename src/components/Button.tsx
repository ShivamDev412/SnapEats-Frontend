import { CircularProgress } from "@mui/material";
import React from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps {
  type?: "submit" | "button" | "reset";
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}
const Button = ({
  type = "button",
  disabled = false,
  children,
  className,
  onClick,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        `bg-primary text-white rounded-md capitalize text-lg font-semibold disabled:bg-opacity-90 px-2 py-[6px] hover:opacity-90 transition-all flex justify-center items-center disabled:bg-gray-500 disabled:cursor-not-allowed`,
        className
      )}
    >
      {" "}
      {isLoading ? (
        <CircularProgress size={28} color="secondary" thickness={5} />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
