import { type ReactNode } from "react";

interface HoverEffectWidgetProps {
  children: ReactNode;
  dark?: boolean;
}

export default function HoverEffectWidget({ children, dark = false }: HoverEffectWidgetProps) {
  const colorClasses = dark ? "hover:bg-amber-500 group-hover:bg-amber-500 group-focus-visible:bg-amber-500 hover:text-black group-hover:text-black group-focus-visible:text-black"
    : "hover:text-amber-900 hover:bg-amber-200 group-hover:bg-amber-200 group-focus-visible:bg-amber-200";

  return (
    <div className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}>
      {children}
    </div>
  );
}
