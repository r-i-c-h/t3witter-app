import { api } from "~/utils/api";
import InfiniteTweetsList from "./InfiniteTweetsList";

export default function FollowingTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowed: true },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetsList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={Boolean(tweets.hasNextPage)} // Bool() wrapper Makes @ts happy
      fetchNewTweets={tweets.fetchNextPage}
      onlyFollowedUsers={true}
    />
  )
}