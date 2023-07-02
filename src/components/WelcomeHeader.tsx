import { useSession } from "next-auth/react";
import { WelcomeHeaderSVG } from "./WelcomeHeaderSVG";

export default function WelcomeHeader() {
  const session = useSession();

  if (session.status === "authenticated") { // AUTH PATH
    const baseName = session.data?.user.name;
    const name = baseName?.split(' ')[0];
    return (
      <h1 className={`text-2xl lg:text-left mb-2 px-4 py-1 text-center text-amber-900 font-bold motion-safe:animate-apparate`}>
        Welcome <span className="text-3xl motion-safe:animate-tracking-in-expand">{name}</span>
      </h1>
    )

  } else { // PUBLIC PATH
    return (
      <div className="">
        <h1 className={`text-3xl md:w-full md:flex items-center justify-center gap-4 pb-1 text-center shadow-xl text-amber-900 font-bold`}>
          <div className="uppercase motion-safe:animate-apparate motion-safe:animate-tracking-in-expand">Welcome To</div>
          <div className="flex items-center justify-center pb-1 ">
            <WelcomeHeaderSVG />
          </div>
        </h1>
      </div>
    );
  }
}
