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
    ? "bg-slate-500 hover:bg-slate-300 focus-visible:bg-slate-300"
    : "bg-amber-900 hover:bg-amber-600 focus-visible:bg-amber-600 focus-visible:outline-amber-700 focus-visible:outline-4 active:bg-amber-200"
  return (
    <button
      type={type}
      className={`w-auto text-white active:text-black shadow-black shadow-sm active:shadow-none active:outline active:outline-2 rounded-md  hover:text-black hover:bg-amber-500 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    ></button>
  );
}