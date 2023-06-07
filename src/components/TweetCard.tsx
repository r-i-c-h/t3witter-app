import Link from 'next/link';
import Image from "next/image";
import { type Tweet } from './InfiniteTweetsList';
import ProfileImage from './ProfileImage';
import { useSession } from 'next-auth/react';

//?? Replace this native time formatter with Luxon.js / Date-fns / Day.js for nicer relative-time??
const nativeTimeFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }); // <~~ Doesn't do relative time

export default function TweetCard({ id, user, content, createdAt, likeCount, likedByMe }: Tweet) {
  return (
    <li
      className="flex gap-4 border-b p-4"
      key={id}>
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage imageSrc={user.image} />
      </Link>
      <div className="felx flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className='font-bold text-amber-500 hover:underline focus-visible:underline outline-none '
          >{user.name}</Link>
          <span className="text-gray-500">-{nativeTimeFormatter.format(createdAt)}</span>
        </div>
        <p className="whitespace-pre-wrap font-semibold">{content}</p>
        <div className="mb-1 mt-1 flex items-center gap-2 self-start text-gray-700">
          <HeartWidget likedByMe={likedByMe} likedCount={likeCount} />
        </div>
      </div>
    </li>
  );
}

//?? Split out to its own component ??
interface HeartWidgetProps { likedByMe: boolean; likedCount: number; }

function HeartWidget({ likedByMe, likedCount }: HeartWidgetProps) {
  const session = useSession();

  if (session.status !== "authenticated") {
    // Public View
    return (<>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
        className="h-4 w-4 stroke-black stroke-2 fill-gray-500">
        <path d="M16 8.5C16 4.361 19.361 1 23.5 1 27.639 1 31 4.361 31 8.5c0 2.986-1.5 5.625-3 7.5L16 31 4 16c-1.5-1.875-3-4.514-3-7.5C1 4.361 4.361 1 8.5 1 12.639 1 16 4.361 16 8.5Z" />
      </svg>
      <span>{likedCount}</span>
    </>
    )
  }
  // Logged-In View
  return (<>
    <button className={`group flex items-center gap-1 self-start transition-colors duration-200 stroke-amber-900`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
        className={`h-4 w-4 stroke-2  transition-colors duration-300 inline
          ${likedByMe ?
            'fill-amber-500  group-hover:fill-transparent group-focus-visible:fill-transparent group-hover:stroke-gray-500 group-focus-visible:stroke-gray-500'
            : 'fill-transparent group-hover:fill-amber-500 group-focus-visible:fill-amber-500'
          }
        `}>
        <path d="M16 8.5C16 4.361 19.361 1 23.5 1 27.639 1 31 4.361 31 8.5c0 2.986-1.5 5.625-3 7.5L16 31 4 16c-1.5-1.875-3-4.514-3-7.5C1 4.361 4.361 1 8.5 1 12.639 1 16 4.361 16 8.5Z" />
      </svg>
      <span className={`
          ${likedByMe ? 'text-red-500 group-hover:text-gray-500 group-focus-visible:text-gray-500'
          : 'text-gray-500 group-hover:text-amber-500 group-focus-visible:text-amber-500'
        }
        `}>{likedCount}</span>
    </button>
  </>
  )
}
// 💀☠️💀 Fancy span w/text and plurals:    {/* <span>- {likedCount} Like{likedCount === 1 ? '' : 's'}</span> */}