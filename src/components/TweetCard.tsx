import Link from 'next/link';
import { api } from '~/utils/api';
import { type Tweet } from './InfiniteTweetsList';
import ProfileImage from './ProfileImage';
import HeartLikeButton from './HeartLikeButton';

//TODO:[Optional] Replace this native time formatter with Luxon.js / Date-fns / Day.js for nicer relative-time??
const nativeTimeFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }); // <~~ Doesn't do relative time

export default function TweetCard({ id, user, content, createdAt, likeCount, likedByMe }: Tweet) {
  const trpcUtils = api.useContext();
  const toggleLike = api.tweet.toggleLike.useMutation({
    onSuccess: ({ didAddLike }) => {
      // ❌ await trpcUtils.tweet.infiniteFeed.invalidate(); /* Refetches ALL Data ❌❌❌ [+ would need an async] */
      const updateData: Parameters<typeof trpcUtils.tweet.infiniteFeed.setInfiniteData>[1] = (cachedData) => {
        if (cachedData == null) { return; }

        const likeCountDelta = didAddLike ? 1 : -1;
        return {
          ...cachedData,
          pages: cachedData.pages.map(pg => {
            return {
              ...pg,
              tweets: pg.tweets.map(tweet => {  // go through each tweet on the page
                if (tweet.id === id) {   // If the IDs match...
                  return {
                    ...tweet,
                    likeCount: tweet.likeCount + likeCountDelta,
                    likedByMe: didAddLike
                  }
                }

                return tweet;  // Otherwise fogettaboutit
              })
            }
          })
        }
      }

      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, updateData);
      trpcUtils.tweet.infiniteFeed.setInfiniteData({ onlyFollowed: true }, updateData);
      trpcUtils.tweet.infiniteProfileFeed.setInfiniteData({ userId: user.id }, updateData);
    },
  });

  function handleToggleLike() { toggleLike.mutate({ id }) }

  return (
    <li
      className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-amber-50 from-80% flex gap-4 border-b border-b-amber-700 px-4 pt-4 pb-1 border-r border-r-amber-500 animate-apparate"
      key={id}>
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage imageSrc={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1 items-center">
          <Link
            href={`/profiles/${user.id}`}
            className='font-bold text-amber-900 hover:underline focus-visible:underline outline-none '
          >{user.name}</Link>
          <span className="text-amber-950 text-xs italic tracking-tighter">- {nativeTimeFormatter.format(createdAt)}</span>
        </div>
        <p className="text-black whitespace-pre-wrap font-semibold my-1">{content}</p>
        <div className="flex items-center gap-1 self-start text-amber-900">
          <HeartLikeButton
            handleClick={handleToggleLike}
            isLoading={toggleLike.isLoading}
            likedByMe={likedByMe}
            likedCount={likeCount}
          />
        </div>
      </div>
    </li>
  );
}