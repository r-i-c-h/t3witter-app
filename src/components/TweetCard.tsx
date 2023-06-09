import Link from 'next/link';
import { type Tweet } from './InfiniteTweetsList';
import ProfileImage from './ProfileImage';
import HeartLikeButton from './HeartLikeButton';


//! ?? Replace this native time formatter with Luxon.js / Date-fns / Day.js for nicer relative-time??
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
          <HeartLikeButton
            likedByMe={likedByMe}
            likedCount={likeCount}
          />
        </div>
      </div>
    </li>
  );
}