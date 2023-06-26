import InfiniteScroll from "react-infinite-scroll-component";
import TweetCard from "./TweetCard";
import ErrorBox from "./ErrorBox";
import TweetFeedLoader from "./TweetFeedLoader";

export interface Tweet {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null; };
}

interface InfiniteTweetListProps {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
  onlyFollowedUsers?: boolean;

}

export default function InfiniteTweetList({ tweets, isLoading, isError, hasMore = false, fetchNewTweets }: InfiniteTweetListProps) {
  if (isLoading) { return <TweetFeedLoader /> }

  if (isError) {
    return (
      <ErrorBox
        errorTitle="Tweet List Error"
        errorText="Sorry, there is an Error in the InfiniteTweetList. Please try again or contact us if the issue continues."
      />
    );
  }
  if (tweets == null || tweets?.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-grey-500">No [more] Tweets</h2>
    )
  }

  return (<ul>
    <InfiniteScroll
      dataLength={tweets.length}
      next={fetchNewTweets}
      hasMore={hasMore}
      loader={<TweetFeedLoader />}
    >
      {
        tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet} />
        })
      }
    </InfiniteScroll>
  </ul>)
}