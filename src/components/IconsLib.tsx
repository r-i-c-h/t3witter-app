import { type SVGAttributes } from "react";

export function HomeIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" {...props}

      className={`fill-transparent stroke-2 stroke-current h-6 w-6 ${props.className ?? ''}`}
    >
      <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
    </svg>
  );
}

export function ProfileIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round" {...props}
      className={`fill-transparent stroke-2 stroke-current h-6 w-6 ${props.className ?? ''}`}
    >
      <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  );
}

export function LogoutIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round" {...props}
      className={`fill-transparent stroke-2 stroke-current h-6 w-6 ${props.className ?? ''}`}
    >
      <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
    </svg>
  );
}

export function LoginIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round" {...props}
      className={`fill-transparent stroke-2 stroke-current h-6 w-6 ${props.className ?? ''}`}
    >
      <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"></path>
    </svg>
  );
}

export function HeartIcon(props: SVGAttributes<SVGElement>) {
  // This HAD a default h-6/w-6, which was being overridden in className props, but the h-6/w-6 specificity
  // overwrote that. Therefore, nuked the "default" h-6/w-6 over here.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" {...props}
      className={`stroke-2 stroke-current ${props.className ?? ''}`}
    >
      <path d="M16 8.5C16 4.361 19.361 1 23.5 1 27.639 1 31 4.361 31 8.5c0 2.986-1.5 5.625-3 7.5L16 31 4 16c-1.5-1.875-3-4.514-3-7.5C1 4.361 4.361 1 8.5 1 12.639 1 16 4.361 16 8.5Z" />
    </svg>
  );
}
