import Link from 'next/link';
import { type Tweet } from './InfiniteTweetsList';
import ProfileImage from './ProfileImage';
import { HeartIcon } from './IconsLib';
import HoverEffectWidget from './HoverEffectWidget';
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
        <p className="whitespace-pre-wrap font-semibold mt-1">{content}</p>
        <div className="flex items-center gap-1 self-start text-gray-700">
          <HeartWidget likedByMe={likedByMe} likedCount={likeCount} />
        </div>
      </div>
    </li>
  );
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

//?? Split out to its own component ??
interface HeartWidgetProps { likedByMe: boolean; likedCount: number; }

function HeartWidget({ likedByMe, likedCount }: HeartWidgetProps) {
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
  return (<>
    <button className={`group flex items-center self-start transition-colors duration-200 stroke-amber-900 -ml-2`}>
      <HoverEffectWidget red>
        <HeartIcon
          className={`fill-transparent transition-colors duration-300
            ${likedByMe ?
              'fill-amber-500 group-hover:fill-transparent group-focus-visible:fill-transparent group-hover:stroke-gray-500 group-focus-visible:stroke-gray-500'
              : 'fill-transparent group-hover:fill-amber-500 group-focus-visible:fill-amber-500'
            }
          `}
        />
      </HoverEffectWidget>
      <span className={`transition-colors duration-300
          ${likedByMe ? 'text-red-500 group-hover:text-gray-500 group-focus-visible:text-gray-500'
          : 'text-gray-500 group-hover:text-black group-focus-visible:text-black'
        }
        `}>{likedCount}</span>
    </button>
  </>
  )
}
// 💀☠️💀 Fancy span w/text and plurals:    {/* <span>- {likedCount} Like{likedCount === 1 ? '' : 's'}</span> */}