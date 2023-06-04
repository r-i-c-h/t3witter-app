import { type DetailedHTMLProps, type ButtonHTMLAttributes } from "react";

type ButtonProps = {
  small?: boolean,
  gray?: boolean,
  className?: string,
  type?: "button" | "submit" | "reset" | undefined;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ type = "submit", small = false, gray = false, className = "", ...props }: ButtonProps) {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold"
  const colorClasses = gray
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
    : "bg-amber-900 hover:bg-amber-700 focus-visible:bg-amber-700 focus-visible:outline-amber-900 active:bg-amber-200"
  return (
    <button
      type={type}
      className={`w-auto text-white active:text-black active:shadow-none rounded-md hover:text-opacity-50 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    ></button>
  );
}