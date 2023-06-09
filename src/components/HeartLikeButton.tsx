import { useSession } from "next-auth/react";
import { HeartIcon } from "./IconsLib";
import HoverEffectWidget from "./HoverEffectWidget";

interface HeartLikeButtonProps {
  handleClick: () => void;
  isLoading: boolean;
  likedByMe: boolean;
  likedCount: number;
}

export default function HeartLikeButton({ isLoading, handleClick, likedByMe, likedCount }: HeartLikeButtonProps) {
  const session = useSession();

  // Public View
  if (session.status !== "authenticated") {
    return (<>
      <HeartIcon className="h-4 w-4 stroke-black stroke-2 fill-gray-500" />
      <span>{likedCount}</span>
    </>
    );
  }

  // Logged-In View
  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className={`group flex items-center self-start transition-colors duration-200 stroke-amber-900 -ml-2`}
    >
      <HoverEffectWidget red>
        <HeartIcon className={`transition-colors duration-300
          ${likedByMe ? 'fill-amber-500 group-hover:fill-transparent group-focus-visible:fill-transparent group-hover:stroke-gray-500 group-focus-visible:stroke-gray-500'
            : 'fill-transparent group-hover:fill-amber-500 group-focus-visible:fill-amber-500'
          }
          `}
        />
      </HoverEffectWidget>

      <span className={`transition-colors duration-300
          ${likedByMe ? 'text-amber-800 group-hover:text-gray-500 group-focus-visible:text-gray-500 font-semibold'
          : 'text-gray-500 group-hover:text-black group-focus-visible:text-black'
        }
        `}>{likedCount}</span>
    </button>
  )
}
// 💀☠️💀 Fancy span w/text and plurals:    {/* <span>- {likedCount} Like{likedCount === 1 ? '' : 's'}</span> */}