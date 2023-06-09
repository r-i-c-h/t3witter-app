import { api } from "~/utils/api";
import InfiniteTweetsList from "./InfiniteTweetsList";

export default function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {}, // <~~ Start with "Nothing"
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetsList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={Boolean(tweets.hasNextPage)}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}