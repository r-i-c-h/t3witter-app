import { api } from "~/utils/api";
import InfiniteTweetsList from "./InfiniteTweetsList";

export default function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {}, // <~~ Start with "Nothing"
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetsList
      isLoading={tweets.isLoading}
      isError={tweets.isError}
      hasMore={Boolean(tweets.hasNextPage)} // Bool() wrapper Makes @ts happy
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      fetchNewTweets={tweets.fetchNextPage}
    />
  )
}