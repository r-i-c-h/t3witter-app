import { useSession } from "next-auth/react";

export default function WelcomeHeader() {
  const session = useSession();

  if (session.status === "authenticated") { // AUTH PATH
    const baseName = session.data?.user.name;
    const name = baseName?.split(' ')[0];
    return (
      <h1 className={`text-2xl lg:text-left mb-2 px-4 py-1 text-center text-amber-900 font-bold`}>
        Welcome <span className="">{name}</span>
      </h1>
    )

  } else { // PUBLIC PATH
    return (
      <h1 className={`text-3xl text-center px-4 pb-8 pt-1 text-amber-900 font-bold`}>
        <span className="uppercase">Welcome To</span> <span className="uppercase font-mono">T3witter</span>
      </h1>
    );
  }
}
