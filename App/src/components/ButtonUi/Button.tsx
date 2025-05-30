import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "lg";
  text: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

const variantStyle = {
  primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
  secondary: "bg-blue-200 text-blue-700 hover:bg-blue-300 disabled:bg-blue-100",
};

const sizeStyle = {
  sm: "px-3 py-1 text-sm",
  lg: "px-5 py-2 text-lg",
};

const baseStyle =
  "flex items-center justify-center gap-2 rounded-xl font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400";

const ButtonUi: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "lg",
  text,
  startIcon,
  endIcon,
  onClick,
  type = "button",
  disabled = false,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]}`}
    >
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {text}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </button>
  );
};

export default ButtonUi;
