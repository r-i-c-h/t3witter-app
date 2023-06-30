import { type ReactNode } from "react";

interface HoverEffectWidgetProps {
  children: ReactNode
  dark?: boolean
  navItem?: boolean
}

export default function HoverEffectWidget({ children, dark = false, navItem = false }: HoverEffectWidgetProps) {
  const navItemStyles = navItem ? `shadow-amber-950 shadow` : '';
  const colorClasses = dark ? "hover:bg-amber-500 group-hover:bg-amber-500 group-focus-visible:bg-amber-500 hover:text-black group-hover:text-black group-focus-visible:text-black"
    : "hover:text-amber-900 hover:bg-amber-200 group-hover:bg-amber-200 group-focus-visible:bg-amber-200";

  return (
    <div className={`rounded-full p-2 shadow-sm transition-colors duration-200  ${colorClasses} ${navItemStyles}`}>
      {children}
    </div>
  );
}
